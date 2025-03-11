
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 text-foreground">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 sm:px-6 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                EmpowerHer
              </h3>
            </Link>
            <p className="text-muted-foreground">
              Connecting rural women entrepreneurs to global markets, empowering communities through sustainable commerce.
            </p>
            <div className="flex space-x-4 pt-2">
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/seller-signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  123 Empowerment Way, Rural District, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-muted-foreground">+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span className="text-muted-foreground">hello@empowerher.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on new artisans, products, and impact stories.
            </p>
            <form 
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle subscription
              }}
            >
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none"
                  required
                />
                <Button className="rounded-l-none btn-shine">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground/70">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} EmpowerHer Marketplace. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
