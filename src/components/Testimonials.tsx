
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Lakshmi Devi",
    location: "Karnataka, India",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80",
    text: "Before joining EmpowerHer, I was struggling to sell my handwoven baskets beyond my village. Now, I have customers from across the globe appreciating my craft. This platform has not only increased my income but also given me a sense of pride in preserving my traditional skills.",
    business: "Traditional Basket Weaving",
    year: "Member since 2020"
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    location: "Oaxaca, Mexico",
    image: "https://images.unsplash.com/photo-1642760663368-3a9b27fbaa71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    text: "My embroidery is now reaching homes I never thought possible. The platform has helped me connect with designers who value authentic handwork, and I've been able to employ five other women from my community. EmpowerHer has transformed my small craft into a sustainable business.",
    business: "Embroidery Artisan",
    year: "Member since 2021"
  },
  {
    id: 3,
    name: "Fatima Nkosi",
    location: "Eastern Cape, South Africa",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    text: "As a single mother, starting an organic honey business seemed impossible. The mentorship and marketing support from EmpowerHer helped me build a brand that customers trust. Now my children can attend school, and I'm teaching other women in my village how to start their own ventures.",
    business: "Organic Honey Producer",
    year: "Member since 2019"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(testimonials.map(() => false));

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleImageLoad = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const allImagesLoaded = imagesLoaded.every(Boolean);

  return (
    <section className="section-spacing bg-primary/5 overflow-hidden">
      <div 
        className={cn(
          "container mx-auto max-w-7xl transition-opacity duration-1000",
          allImagesLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from the women entrepreneurs whose lives have been transformed through our marketplace
          </p>
        </div>

        <div className="relative">
          {/* Large Quote Icon */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/10">
            <Quote size={120} />
          </div>

          {/* Testimonials Carousel */}
          <div 
            ref={testimonialsRef}
            className="flex items-center justify-center py-4"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 p-6 transition-all duration-600 absolute w-full",
                  index === activeIndex ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0",
                  index === activeIndex && isAnimating && direction === 'next' ? "-translate-x-full" : "",
                  index === activeIndex && isAnimating && direction === 'prev' ? "translate-x-full" : "",
                  index === (activeIndex + 1) % testimonials.length ? "translate-x-full" : "",
                  index === (activeIndex - 1 + testimonials.length) % testimonials.length ? "-translate-x-full" : "",
                )}
              >
                {/* Testimonial Image */}
                <div className="w-full md:w-1/3 flex-shrink-0 mb-8 md:mb-0">
                  <div className="relative h-72 w-72 mx-auto overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(index)}
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="w-full md:w-2/3 flex flex-col text-center md:text-left">
                  <blockquote className="text-lg md:text-xl font-medium mb-8">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="mt-auto">
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-primary font-medium text-sm">{testimonial.business}</p>
                    <div className="flex flex-col md:flex-row md:items-center mt-2 md:space-x-4 text-sm text-muted-foreground">
                      <span>{testimonial.location}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{testimonial.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center md:justify-end mt-12 space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
                )}
                onClick={() => {
                  if (isAnimating) return;
                  setDirection(index > activeIndex ? 'next' : 'prev');
                  setActiveIndex(index);
                  setIsAnimating(true);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
