
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Heart, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description?: string;
  image_url?: string;
  features?: string[];
  fuel_type?: string;
  transmission?: string;
  mileage?: number;
  color?: string;
}

const VehiclesPage = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicles").select("*");
      if (error) throw error;
      return data as Vehicle[];
    },
  });

  const handleAddToCart = (vehicle: Vehicle) => {
    addToCart(vehicle);
    toast({ title: "Vehicle added to cart", description: vehicle.name });
  };

  const filteredVehicles = data?.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.make.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold">Vehicles</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {isLoading ? (
          <p>Loading vehicles...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load vehicles: {error.message}</p>
        ) : filteredVehicles?.length === 0 ? (
          <p className="text-muted-foreground">No vehicles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <CardTitle>{vehicle.name}</CardTitle>
                  <CardDescription>
                    {vehicle.make} {vehicle.model} - {vehicle.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground text-sm">{vehicle.description}</p>
                  <p className="font-semibold text-lg">${vehicle.price.toLocaleString()}</p>
                  <div className="flex gap-2 flex-wrap">
                    {vehicle.features?.map((feature, idx) => (
                      <Badge key={idx}>{feature}</Badge>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => handleAddToCart(vehicle)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="ghost">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
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

export default VehiclesPage;
