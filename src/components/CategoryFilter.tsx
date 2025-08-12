import React from "react";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selected: string[];
  onToggle: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onToggle }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {categories.map((cat) => {
        const isActive = selected.includes(cat);
        return (
          <Button
            key={cat}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={`rounded-full px-4 ${isActive ? 'bg-coral text-white shadow' : ''}`}
            onClick={() => onToggle(cat)}
            aria-pressed={isActive}
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
