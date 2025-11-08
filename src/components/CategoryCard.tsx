import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

export const CategoryCard = ({ title, image, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
        </div>
      </div>
    </Card>
  );
};
