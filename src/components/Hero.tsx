
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center section-spacing overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1591888181001-ea11eb95e46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Rural women artisans"
          className={cn(
            "w-full h-full object-cover transition-all duration-2000 ease-out",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div 
            className={cn(
              "transition-all duration-700 delay-300", 
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wide bg-primary/10 text-primary rounded-full">
              Empowering Rural Women Entrepreneurs
            </div>
          </div>

          <h1 
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6",
              "transition-all duration-700 delay-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <span className="block">From Rural Hands</span>
            <span className="block">To Global Markets</span>
          </h1>

          <p 
            className={cn(
              "text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10",
              "transition-all duration-700 delay-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Supporting women artisans across rural communities by connecting their 
            exceptional handcrafted products directly to conscious consumers worldwide.
          </p>

          <div 
            className={cn(
              "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4",
              "transition-all duration-700 delay-900",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Button className="btn-shine text-base px-8 py-6" size="lg">
              Shop Now
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-base px-8 py-6" size="lg">
              Start Selling
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div 
        className={cn(
          "absolute bottom-10 right-10 md:right-20 w-24 h-24 md:w-40 md:h-40 rounded-full bg-primary/10 animate-float",
          "transition-all duration-1000 delay-1000",
          isLoaded ? "opacity-40" : "opacity-0"
        )}
      />
    </section>
  );
};

export default Hero;
