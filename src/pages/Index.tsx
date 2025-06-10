
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, Users, QrCode, ShoppingCart, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Car className="h-12 w-12 text-blue-600" />,
      title: "Vehicle Sales",
      description: "Browse our extensive collection of quality vehicles",
      link: "/vehicles"
    },
    {
      icon: <Wrench className="h-12 w-12 text-green-600" />,
      title: "Maintenance & Service",
      description: "Professional maintenance and upgrade services",
      link: "/maintenance"
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: "Employee Directory",
      description: "Meet our professional team with QR code access",
      link: "/employees"
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-orange-600" />,
      title: "Shopping Cart",
      description: "Manage your vehicle purchases and services",
      link: "/cart"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            VIN <span className="text-blue-600 animate-scale-in">Cars</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Your trusted partner for quality vehicles, professional maintenance, and exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button asChild size="lg" className="text-lg px-8 py-4 hover-scale">
              <Link to="/vehicles">Browse Vehicles</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover-scale">
              <Link to="/maintenance">Book Service</Link>
            </Button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center text-gray-900 mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover-scale cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 animate-scale-in" style={{ animationDelay: `${index * 0.2 + 0.5}s` }}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full hover-scale">
                    <Link to={feature.link}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1s' }}>
              <h3 className="text-4xl font-bold mb-2 animate-scale-in">500+</h3>
              <p className="text-xl">Vehicles Sold</p>
            </div>
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1.2s' }}>
              <h3 className="text-4xl font-bold mb-2 animate-scale-in">1000+</h3>
              <p className="text-xl">Services Completed</p>
            </div>
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1.4s' }}>
              <h3 className="text-4xl font-bold mb-2 animate-scale-in">98%</h3>
              <p className="text-xl">Customer Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Animated background waves */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 animate-pulse">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"></path>
          </svg>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
