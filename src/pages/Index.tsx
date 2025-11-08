import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/CategoryCard";
import heroImage from "@/assets/hero-food.jpg";
import southIndianImage from "@/assets/south-indian.jpg";
import chineseImage from "@/assets/chinese.jpg";
import { UtensilsCrossed } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Delicious food" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UtensilsCrossed className="h-12 w-12 text-accent" />
            <h1 className="text-5xl md:text-7xl font-bold">
              Campus <span className="text-accent">Canteen</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Order your favorite South Indian & Chinese delicacies
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/menu")}
            className="text-lg px-8 py-6 h-auto"
          >
            Explore Menu
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Cuisine</h2>
          <p className="text-xl text-muted-foreground">
            Select from our delicious menu categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <CategoryCard
            title="South Indian"
            image={southIndianImage}
            onClick={() => navigate("/menu")}
          />
          <CategoryCard
            title="Chinese"
            image={chineseImage}
            onClick={() => navigate("/menu")}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fresh & Hot</h3>
              <p className="text-muted-foreground">Prepared fresh daily with quality ingredients</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Service</h3>
              <p className="text-muted-foreground">Fast ordering and delivery to save your time</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Student Friendly</h3>
              <p className="text-muted-foreground">Affordable prices for college students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Campus Canteen</p>
          <p className="text-sm opacity-90">Serving delicious meals to fuel your studies</p>
        </div>
      </footer>
    </div>
  );
}
