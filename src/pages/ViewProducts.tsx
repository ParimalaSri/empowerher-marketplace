
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample product data - in a real app, this would come from an API
const ALL_PRODUCTS = [
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
    seller: "Nature's Bounty",
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
  },
  {
    id: '7',
    name: 'Silk Embroidered Kurti',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1529631134462-d23a23a7070c',
    category: 'Clothing',
    seller: 'Royal Threads',
    rating: 4.6
  },
  {
    id: '8',
    name: 'Block Printed Cotton Saree',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1556909211-369841544ff6',
    category: 'Clothing',
    seller: 'Handloom Creations',
    rating: 4.7
  }
];

const ViewProducts = () => {
  const [searchParams] = useSearchParams();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const category = searchParams.get('category') || 'all';
  
  useEffect(() => {
    // Filter products based on category
    const filteredProducts = category === 'all'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
    
    setProducts(filteredProducts);
    
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {category === 'all' ? 'All Products' : `${category} Collection`}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {category === 'all' 
              ? 'Discover unique handcrafted items made by talented women entrepreneurs.' 
              : `Explore our selection of handcrafted ${category.toLowerCase()} items made by talented rural artisans.`}
          </p>
        </div>
        
        <Separator className="my-6" />
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any products in this category.</p>
            <Link to="/products">
              <Button variant="outline">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ViewProducts;
