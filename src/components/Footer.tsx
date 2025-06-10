
import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">VIN Cars</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for quality vehicles and professional automotive services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/vehicles" className="block text-gray-400 hover:text-white transition-colors">
                Browse Vehicles
              </Link>
              <Link to="/maintenance" className="block text-gray-400 hover:text-white transition-colors">
                Book Service
              </Link>
              <Link to="/employees" className="block text-gray-400 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Vehicle Sales</p>
              <p className="text-gray-400">Maintenance & Repairs</p>
              <p className="text-gray-400">Vehicle Upgrades</p>
              <p className="text-gray-400">Test Drives</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@vincars.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Auto Street, Car City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 VIN Cars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
