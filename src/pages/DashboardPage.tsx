
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Car, Wrench, Calendar, DollarSign, Users, BarChart3, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleManagement from "@/components/VehicleManagement";
import UserManagement from "@/components/UserManagement";

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { icon: Car, label: "Vehicles", value: 120 },
    { icon: Users, label: "Employees", value: 32 },
    { icon: Wrench, label: "Repairs", value: 58 },
    { icon: DollarSign, label: "Revenue", value: "$94K" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.user_metadata?.firstName || user?.email}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardHeader className="flex items-center space-x-4">
                <Icon className="text-primary" />
                <div>
                  <CardTitle>{value}</CardTitle>
                  <CardDescription>{label}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList>
            <TabsTrigger value="vehicles">Vehicle Management</TabsTrigger>
            {user?.user_metadata?.role === "admin" && (
              <TabsTrigger value="users">User Management</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="vehicles">
            <VehicleManagement />
          </TabsContent>
          {user?.user_metadata?.role === "admin" && (
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
          )}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
