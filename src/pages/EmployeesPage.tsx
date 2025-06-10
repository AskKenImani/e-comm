
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Search, QrCode, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address?: string;
}

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) throw error;
      return data as Employee[];
    },
  });

  const filtered = data?.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Employees</h1>
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80"
          />
        </div>

        {isLoading ? (
          <p>Loading employees...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load employees: {error.message}</p>
        ) : filtered?.length === 0 ? (
          <p className="text-muted-foreground">No employees found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription>{employee.position} - {employee.department}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {employee.email}
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {employee.phone}
                  </div>
                  {employee.address && (
                    <div className="text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {employee.address}
                    </div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedEmployee(employee)}
                        variant="outline"
                        className="mt-2"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Show QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>QR Code for {employee.name}</DialogTitle>
                      </DialogHeader>
                      <QRCodeGenerator employee={employee} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EmployeesPage;
