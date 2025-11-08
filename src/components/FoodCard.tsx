import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "south-indian" | "chinese";
}

interface FoodCardProps {
  item: FoodItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const FoodCard = ({ item, quantity, onAdd, onRemove }: FoodCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
        <p className="text-2xl font-bold text-primary mt-2">₹{item.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button onClick={onAdd} className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <Button onClick={onRemove} variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
            <Button onClick={onAdd} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
