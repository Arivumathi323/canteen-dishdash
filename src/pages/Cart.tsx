import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { menuData } from "@/data/menuData";
import { ArrowLeft, Receipt } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = (location.state?.cart || []) as CartItem[];
  const [showBill, setShowBill] = useState(false);

  const cartItems = cart.map(item => ({
    ...menuData.find(m => m.id === item.id)!,
    quantity: item.quantity,
  }));

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGenerateBill = () => {
    setShowBill(true);
    toast.success("Bill generated successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some delicious items to get started!</p>
            <Button onClick={() => navigate("/menu")}>
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-lg print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/menu")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {!showBill ? (
          <>
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
                <Button onClick={handleGenerateBill} size="lg" className="w-full">
                  <Receipt className="mr-2 h-5 w-5" />
                  Generate Bill
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : (
          <>
            {/* Bill Receipt */}
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl">Canteen Order Receipt</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date().toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Order Details:</h3>
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price} × {item.quantity}</p>
                        </div>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t-2 border-dashed">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{totalPrice}</span>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  <p>Thank you for your order!</p>
                  <p className="mt-1">Enjoy your meal 🍽️</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 print:hidden">
                <Button onClick={handlePrint} variant="secondary" className="flex-1">
                  Print Receipt
                </Button>
                <Button onClick={() => navigate("/menu")} className="flex-1">
                  Order More
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
