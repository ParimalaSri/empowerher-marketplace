
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingBag, ChevronDown, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

// Translations for hero section
const heroTranslations = {
  en: {
    tagline: "Empowering Rural Women, Transforming Lives! 🌍✨",
    heading1: "Authentic crafts",
    heading2: "Powerful impact",
    description: "Discover authentic, handcrafted products made by talented rural women artisans. Every purchase supports their journey towards financial independence and a brighter future. Shop with purpose, uplift communities!",
    shopNow: "Shop With Purpose",
    startSelling: "Join as Artisan",
    scrollDown: "Explore More"
  },
  hi: {
    tagline: "ग्रामीण महिलाओं को सशक्त बनाना, जीवन बदलना! 🌍✨",
    heading1: "प्रामाणिक शिल्प",
    heading2: "शक्तिशाली प्रभाव",
    description: "प्रतिभाशाली ग्रामीण महिला कारीगरों द्वारा बनाए गए प्रामाणिक, हस्तनिर्मित उत्पादों की खोज करें। हर खरीदारी वित्तीय स्वतंत्रता और उज्जवल भविष्य की ओर उनकी यात्रा का समर्थन करती है। उद्देश्य के साथ खरीदारी करें, समुदायों को ऊपर उठाएं!",
    shopNow: "उद्देश्य के साथ खरीदें",
    startSelling: "कारीगर के रूप में शामिल हों",
    scrollDown: "और देखें"
  },
  es: {
    tagline: "¡Empoderando a Mujeres Rurales, Transformando Vidas! 🌍✨",
    heading1: "Artesanías auténticas",
    heading2: "Impacto poderoso",
    description: "Descubre productos auténticos hechos a mano por talentosas artesanas rurales. Cada compra apoya su camino hacia la independencia financiera y un futuro más brillante. ¡Compra con propósito, eleva comunidades!",
    shopNow: "Compra con Propósito",
    startSelling: "Únete como Artesana",
    scrollDown: "Explorar Más"
  },
  fr: {
    tagline: "Autonomiser les Femmes Rurales, Transformer des Vies! 🌍✨",
    heading1: "Artisanat authentique",
    heading2: "Impact puissant",
    description: "Découvrez des produits authentiques faits à la main par des artisanes rurales talentueuses. Chaque achat soutient leur voyage vers l'indépendance financière et un avenir meilleur. Achetez avec un but, élevez les communautés!",
    shopNow: "Acheter avec un But",
    startSelling: "Rejoindre en tant qu'Artisane",
    scrollDown: "Explorer Plus"
  },
  de: {
    tagline: "Stärkung von Frauen in ländlichen Gebieten, Verwandlung von Leben! 🌍✨",
    heading1: "Authentisches Handwerk",
    heading2: "Kraftvolle Wirkung",
    description: "Entdecken Sie authentische, handgefertigte Produkte von talentierten Kunsthandwerkerinnen aus ländlichen Gebieten. Jeder Kauf unterstützt ihren Weg zur finanziellen Unabhängigkeit und einer besseren Zukunft. Kaufen Sie mit Sinn, heben Sie Gemeinschaften!",
    shopNow: "Sinnvoll Einkaufen",
    startSelling: "Als Kunsthandwerkerin Beitreten",
    scrollDown: "Mehr Entdecken"
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70 z-10" />
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
            <div className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wide bg-primary/10 text-primary rounded-full">
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
            <span className="block text-primary">{t.heading2}</span>
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
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/seller/register">
              <Button variant="outline" className="text-base px-8 py-6 w-full sm:w-auto" size="lg">
                {t.startSelling}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Impact stats */}
          <div 
            className={cn(
              "grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16 bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-border/40",
              "transition-all duration-700 delay-1100",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">5,000+</p>
              <p className="text-sm text-muted-foreground">Artisans Supported</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">250+</p>
              <p className="text-sm text-muted-foreground">Rural Communities</p>
            </div>
            <div className="text-center hidden sm:block">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Fair Compensation</p>
            </div>
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
