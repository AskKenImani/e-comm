
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const services = [
  "Oil Change",
  "Brake Inspection",
  "Tire Rotation",
  "Engine Diagnostics",
  "Battery Check",
];

const MaintenancePage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !date || selectedServices.length === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields and select at least one service.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked!",
      description: `We’ve scheduled your maintenance for ${format(date, "PPP")}`,
    });

    // Optional: Save to Supabase here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Schedule Maintenance</h1>
        <Card>
          <CardHeader>
            <CardTitle>Book a Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Describe the issue or request..."
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
              />
            </div>

            <div>
              <Label>Select Services</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {services.map((service) => (
                  <Badge
                    key={service}
                    variant={selectedServices.includes(service) ? "default" : "outline"}
                    onClick={() => toggleService(service)}
                    className="cursor-pointer"
                  >
                    {selectedServices.includes(service) && <Check className="w-4 h-4 mr-1" />}
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="mt-4" onClick={handleSubmit}>
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MaintenancePage;
