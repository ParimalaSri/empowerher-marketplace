
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl h-[300px] shadow-sm transition-all duration-500",
        "transform hover:scale-[1.02] hover:shadow-lg",
        "animate-fade-up",
        { "opacity-0": !imageLoaded }
      )}
      style={{ animationDelay: `${100 * index}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10",
          "transition-all duration-500",
          isHovered ? "opacity-90" : "opacity-70"
        )} />
        <img
          src={category.image}
          alt={category.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <h3 className="text-white text-xl font-semibold mb-2 transition-all duration-300">
          {category.name}
        </h3>
        <p className={cn(
          "text-white/80 text-sm mb-4 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {category.description}
        </p>
        <Link to={`/view-products?category=${category.name.toLowerCase()}`}>
          <Button 
            variant="outline" 
            className={cn(
              "text-white border-white/50 hover:bg-white/10 transition-all duration-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            size="sm"
          >
            Explore
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore handcrafted treasures from talented women entrepreneurs across diverse categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/view-products?category=all">
            <Button size="lg" className="btn-shine">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
