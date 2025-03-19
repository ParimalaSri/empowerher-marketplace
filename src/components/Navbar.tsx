
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();



  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null && token.trim() !== ""; // ✅ Improved check
  useEffect(() => {
    console.log("Token on Home Page:", localStorage.getItem("token"));
  }, []);
  
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    console.log("Token on Profile Click:", token);
    
    if (token) {
      console.log("Redirecting to /customer/dashboard");
      navigate("/customer/dashboard");
    } else {
      console.log("Redirecting to /login");
      navigate("/login");
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'glass-morphism py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight transition-all duration-300 flex items-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              EmpowerHer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`link-hover-effect py-2 text-sm font-medium ${location.pathname === '/' ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`link-hover-effect py-2 text-sm font-medium ${location.pathname === '/products' ? 'text-primary' : ''}`}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`link-hover-effect py-2 text-sm font-medium ${location.pathname === '/about' ? 'text-primary' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`link-hover-effect py-2 text-sm font-medium ${location.pathname === '/contact' ? 'text-primary' : ''}`}
            >
              Contact
            </Link>
          
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search size={20} />
              <span className="sr-only">Search</span>
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart size={20} />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
               {/* Profile Button (Redirects based on login status) */}
             <Button variant="ghost" size="icon" className="rounded-full" onClick={handleProfileClick}>
  <User size={20} />
  <span className="sr-only">Account</span>
</Button>


            
            <Link to="/seller/register">
              <Button className="rounded-full btn-shine" size="sm">
                Start Selling
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col pt-24 px-6 md:hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-8 items-center">
          <Link 
            to="/" 
            className={`text-lg font-medium ${location.pathname === '/' ? 'text-primary' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-lg font-medium ${location.pathname === '/products' ? 'text-primary' : ''}`}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className={`text-lg font-medium ${location.pathname === '/about' ? 'text-primary' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-lg font-medium ${location.pathname === '/contact' ? 'text-primary' : ''}`}
          >
            Contact
          </Link>
          <div className="flex space-x-4 pt-6">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search size={20} />
            </Button>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="rounded-full">
                <ShoppingCart size={20} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="icon" className="rounded-full">
                <User size={20} />
              </Button>
            </Link>
          </div>
          <Link to="/seller/register" className="w-full">
            <Button className="w-full btn-shine mt-6" size="lg">
              Start Selling
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
