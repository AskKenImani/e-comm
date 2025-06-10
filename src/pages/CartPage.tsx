
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PaystackButton } from 'react-paystack';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Honda Civic 2023',
      price: 25000,
      quantity: 1,
      type: 'vehicle',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Oil Change Service',
      price: 50,
      quantity: 1,
      type: 'service',
      image: '/placeholder.svg'
    }
  ]);

  const publicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxxxx"; 
  const email = "imamikenny27@gmail.com";

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const reference = new Date().getTime().toString();

  const handleSuccess = (reference) => {
    alert("Payment successful! Ref: " + reference.reference);
    // Here you would send to Supabase: payment record + optionally booking data
  };

  const handleClose = () => {
    console.log("Payment closed");
  };

  const componentProps = {
    email,
    amount: total * 100,
    metadata: {
      cartItems
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: handleClose,
    reference
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add vehicles and services to your cart.</p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/vehicles">Browse Vehicles</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/maintenance">Book Service</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600">Review your items before checkout</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)} className="w-16 text-center" min="0" />
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-lg font-semibold">
                      Item Total: ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Tax (8%):</span><span>${tax.toFixed(2)}</span></div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold"><span>Total:</span><span>${total.toLocaleString()}</span></div>
                </div>
                <PaystackButton {...componentProps} className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg text-lg" />
                <div className="text-center">
                  <Button asChild variant="ghost" className="text-sm"><Link to="/vehicles">Continue Shopping</Link></Button>
                </div>
                <div className="text-center pt-4 border-t">
                  <p className="text-xs text-gray-600">🔒 Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
