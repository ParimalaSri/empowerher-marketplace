
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

// Translations for hero section
const heroTranslations = {
  en: {
    tagline: "Empowering Rural Women Entrepreneurs",
    heading1: "From Rural Hands",
    heading2: "To Global Markets",
    description: "Supporting women artisans across rural communities by connecting their exceptional handcrafted products directly to conscious consumers worldwide.",
    shopNow: "Shop Now",
    startSelling: "Start Selling",
    scrollDown: "Scroll Down"
  },
  hi: {
    tagline: "ग्रामीण महिला उद्यमियों को सशक्त बनाना",
    heading1: "ग्रामीण हाथों से",
    heading2: "वैश्विक बाजारों तक",
    description: "ग्रामीण समुदायों की महिला कारीगरों को उनके असाधारण हस्तशिल्प उत्पादों को सीधे जागरूक उपभोक्ताओं से जोड़कर समर्थन करना।",
    shopNow: "अभी खरीदें",
    startSelling: "विक्रय शुरू करें",
    scrollDown: "नीचे स्क्रॉल करें"
  },
  es: {
    tagline: "Empoderando a Mujeres Emprendedoras Rurales",
    heading1: "De Manos Rurales",
    heading2: "A Mercados Globales",
    description: "Apoyando a mujeres artesanas de comunidades rurales conectando sus excepcionales productos artesanales directamente con consumidores conscientes en todo el mundo.",
    shopNow: "Comprar Ahora",
    startSelling: "Empezar a Vender",
    scrollDown: "Desplázate hacia abajo"
  },
  fr: {
    tagline: "Autonomiser les Femmes Entrepreneures Rurales",
    heading1: "Des Mains Rurales",
    heading2: "Aux Marchés Mondiaux",
    description: "Soutenir les femmes artisanes des communautés rurales en connectant leurs produits artisanaux exceptionnels directement aux consommateurs conscients du monde entier.",
    shopNow: "Acheter Maintenant",
    startSelling: "Commencer à Vendre",
    scrollDown: "Défiler vers le bas"
  },
  de: {
    tagline: "Stärkung von Unternehmerinnen im ländlichen Raum",
    heading1: "Von ländlichen Händen",
    heading2: "Zu globalen Märkten",
    description: "Unterstützung von Kunsthandwerkerinnen in ländlichen Gemeinschaften durch die direkte Verbindung ihrer außergewöhnlichen handgefertigten Produkte mit bewussten Verbrauchern weltweit.",
    shopNow: "Jetzt Einkaufen",
    startSelling: "Mit dem Verkauf beginnen",
    scrollDown: "Nach unten scrollen"
  }
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const { language } = useLanguage();
  
  // Get translations based on current language
  const t = heroTranslations[language as keyof typeof heroTranslations] || heroTranslations.en;

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1591888181001-ea11eb95e46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    img.onload = () => {
      setBackgroundLoaded(true);
      
      // Set component as loaded after image loads
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('categories-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

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
            backgroundLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          )}
          onLoad={() => setBackgroundLoaded(true)}
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
              {t.tagline}
            </div>
          </div>

          <h1 
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6",
              "transition-all duration-700 delay-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <span className="block">{t.heading1}</span>
            <span className="block">{t.heading2}</span>
          </h1>

          <p 
            className={cn(
              "text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10",
              "transition-all duration-700 delay-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {t.description}
          </p>

          <div 
            className={cn(
              "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4",
              "transition-all duration-700 delay-900",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Link to="/products">
              <Button className="btn-shine text-base px-8 py-6 w-full sm:w-auto" size="lg">
                {t.shopNow}
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/seller/register">
              <Button variant="outline" className="text-base px-8 py-6 w-full sm:w-auto" size="lg">
                {t.startSelling}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div 
        className={cn(
          "absolute bottom-10 right-10 md:right-20 w-24 h-24 md:w-40 md:h-40 rounded-full bg-primary/10 animate-float",
          "transition-all duration-1000 delay-1000",
          isLoaded ? "opacity-40" : "opacity-0"
        )}
      />
      
      <div 
        className={cn(
          "absolute top-20 right-20 w-16 h-16 rounded-full bg-secondary/20 animate-float",
          "transition-all duration-1000 delay-1200",
          isLoaded ? "opacity-30" : "opacity-0"
        )}
        style={{ animationDelay: '1s' }}
      />
      
      {/* Scroll down indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer",
          "transition-all duration-700 delay-1500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onClick={scrollToContent}
      >
        <span className="text-sm font-medium mb-2">{t.scrollDown}</span>
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
