
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Handicrafts',
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
    description: 'Traditional handmade crafts preserving cultural heritage'
  },
  {
    id: 2,
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1590052713123-2db242be879a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
    description: 'Artisanal garments blending tradition with contemporary style'
  },
  {
    id: 3,
    name: 'Organic Food',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    description: 'Naturally grown produce and authentic homemade delicacies'
  },
  {
    id: 4,
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80',
    description: 'Unique handcrafted pieces that bring warmth to any space'
  },
  {
    id: 5,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1565562195689-ade1297bd89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
    description: 'Handcrafted jewelry and accessories with cultural significance'
  }
];

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
      {/* Image Background with Gradient Overlay */}
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

      {/* Content */}
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
        <Link to={`/categories/${category.id}`}>
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

        {/* Changed grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 to always show 3 columns */}
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
