
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Heart, Star } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Handwoven Basket',
    description: 'Traditional basket woven using sustainable materials by skilled artisans',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1576618900245-7b0af1ab0912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    rating: 4.8,
    seller: 'Maya Crafts Collective',
    category: 'Home Decor'
  },
  {
    id: 2,
    name: 'Embroidered Shawl',
    description: 'Hand-embroidered shawl with intricate traditional patterns',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1526127606605-e342627e855a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4.9,
    seller: 'Artisan Women Cooperative',
    category: 'Clothing'
  },
  {
    id: 3,
    name: 'Organic Honey',
    description: 'Pure, raw honey harvested from community-managed beehives',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1592020051126-c240ea811bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    rating: 5.0,
    seller: 'Rural Harvest Collective',
    category: 'Organic Food'
  },
  {
    id: 4,
    name: 'Hand-painted Ceramic Bowl',
    description: 'Unique ceramic bowl hand-painted with natural dyes',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1604348962760-e7585d5ee103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    rating: 4.7,
    seller: 'Women Potters Guild',
    category: 'Home Decor'
  }
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "h-3.5 w-3.5", 
          i < Math.floor(rating) ? "fill-primary text-primary" : 
          i === Math.floor(rating) && rating % 1 > 0 ? "fill-primary/50 text-primary" : 
          "fill-none text-muted-foreground/40"
        )} 
      />
    ));
  };

  return (
    <div 
      className={cn(
        "group bg-card rounded-xl overflow-hidden transition-all duration-500 shadow-sm",
        "hover:shadow-lg hover:translate-y-[-5px]",
        "animate-scale-in",
        { "opacity-0": !imageLoaded }
      )}
      style={{ animationDelay: `${150 * index}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Action buttons */}
        <div className={cn(
          "absolute bottom-4 right-4 flex space-x-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full shadow-md">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-9 w-9 rounded-full shadow-md">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          {/* Seller & Rating */}
          <div>
            <p className="text-xs text-muted-foreground">By {product.seller}</p>
            <div className="flex items-center mt-1">
              {renderStars(product.rating)}
              <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
            </div>
          </div>
          
          {/* View Details */}
          <Link to={`/products/${product.id}`}>
            <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/5">
              Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-xl">
              Discover unique, handcrafted items made with care by talented women entrepreneurs from rural communities
            </p>
          </div>
          <Link to="/products" className="mt-6 md:mt-0">
            <Button variant="outline" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
