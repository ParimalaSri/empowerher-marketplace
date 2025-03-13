
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Filter, SlidersHorizontal, ShoppingCart, Heart } from 'lucide-react';

// Sample product data
const PRODUCTS = [
  {
    id: '1',
    name: 'Handwoven Cotton Shawl',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1529631134462-d23a23a7070c',
    category: 'Clothing',
    seller: 'Lakshmi Crafts',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Hand-painted Clay Pottery',
    price: 850,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    category: 'Home Decor',
    seller: 'Village Artisans',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Organic Honey - 500g',
    price: 350,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    category: 'Organic Food',
    seller: 'Nature\'s Bounty',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Embroidered Cushion Cover Set',
    price: 950,
    image: 'https://images.unsplash.com/photo-1556909211-369841544ff6',
    category: 'Home Decor',
    seller: 'Rural Stitchers',
    rating: 4.3
  },
  {
    id: '5',
    name: 'Handmade Jute Bag',
    price: 550,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    category: 'Accessories',
    seller: 'EcoFriendly Crafts',
    rating: 4.6
  },
  {
    id: '6',
    name: 'Traditional Wood Carved Box',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    category: 'Handicrafts',
    seller: 'Heritage Artisans',
    rating: 4.9
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'handicrafts', name: 'Handicrafts' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'organic-food', name: 'Organic Food' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'accessories', name: 'Accessories' }
];

const Products = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
      return;
    }
    
    const newSelected = selectedCategories.includes('all')
      ? [category]
      : selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category];
        
    if (newSelected.length === 0) {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(newSelected);
    }
  };

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = PRODUCTS;
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by category
    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter(product =>
        selectedCategories.some(cat => product.category.toLowerCase() === cat.replace(/-/g, ' '))
      );
    }
    
    setFilteredProducts(filtered);
  }, [priceRange, selectedCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Shop Our Products</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover unique handcrafted items made by talented women entrepreneurs from rural communities across India.
            Each purchase directly supports their livelihoods and helps sustain traditional crafts.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </Button>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground hidden md:inline">
              {filteredProducts.length} products
            </span>
            <Button variant="ghost" className="flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span className="hidden md:inline">Sort</span>
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <div className="bg-card rounded-lg shadow-sm p-6 border sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="text-xs">Reset</Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <label 
                        htmlFor={category.id} 
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 lg:hidden" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="group bg-card rounded-lg shadow-sm overflow-hidden border hover:border-primary/50 transition-all duration-300">
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                      >
                        <Heart size={18} />
                      </Button>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{product.seller}</span>
                      <div className="flex items-center text-amber-500 text-xs">
                        <span>★</span>
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className="font-medium text-base mb-1 hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold">₹{product.price}</span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ShoppingCart size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button variant="outline" onClick={() => {
                  setPriceRange([0, 5000]);
                  setSelectedCategories(['all']);
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
