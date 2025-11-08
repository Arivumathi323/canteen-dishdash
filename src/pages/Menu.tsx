import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodCard } from "@/components/FoodCard";
import { Button } from "@/components/ui/button";
import { menuData } from "@/data/menuData";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Menu() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "south-indian" | "chinese">("all");

  const addToCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find(item => item.id === itemId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const menuItem = menuData.find(m => m.id === item.id);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);

  const filteredMenu = selectedCategory === "all" 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory);

  const handleViewCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-hero text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/")}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Our Menu</h1>
            </div>
            {totalItems > 0 && (
              <Button 
                onClick={handleViewCart}
                variant="secondary"
                size="lg"
                className="relative"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Cart
                <Badge className="ml-2 bg-accent text-accent-foreground">{totalItems}</Badge>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-3 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All Items
          </Button>
          <Button
            variant={selectedCategory === "south-indian" ? "default" : "outline"}
            onClick={() => setSelectedCategory("south-indian")}
          >
            South Indian
          </Button>
          <Button
            variant={selectedCategory === "chinese" ? "default" : "outline"}
            onClick={() => setSelectedCategory("chinese")}
          >
            Chinese
          </Button>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              quantity={getItemQuantity(item.id)}
              onAdd={() => addToCart(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </main>

      {/* Floating Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl md:hidden">
          <div className="container mx-auto px-4 py-4">
            <Button onClick={handleViewCart} className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {totalItems} items • ₹{totalPrice}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
