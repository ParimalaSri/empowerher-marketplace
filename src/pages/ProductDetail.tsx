import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Minus, Plus, ShoppingCart, Heart, Share2, Star, Truck, 
  Shield, RotateCcw, MessageSquare 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PRODUCTS } from '@/data/productsDetail';
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<typeof PRODUCTS[0]>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);

    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    window.scrollTo(0, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && product?.stock > quantity) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    if (!token) {
      console.error("User not logged in.");
      toast({
        title: "Login Required",
        description: "Please log in to add items to your wishlist.",
        status: "error",
      });
      return;
    }
    console.log('Product added to cart:', product);

    const selectedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        seller: product.seller.name,
    
        discount: product.discount
        
    };

    // Log only the selected fields
    console.log('Product added to cart:', JSON.stringify(selectedProduct, null, 2));

    axios.post("http://127.0.0.1:5000/api/cart-add", selectedProduct, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Send JWT token in Authorization header
        }
    })
    .then(response => {
        console.log("Product added to cart successfully:", response.data);
    })
    .catch(error => {
        console.error("Error adding product to cart:", error.response ? error.response.data : error.message);
    });

    toast({
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart`,
    });



    
};


const addToWishlist = () => {
  if (!token) {
    console.error("User not logged in.");
    toast({
      title: "Login Required",
      description: "Please log in to add items to your wishlist.",
      status: "error",
    });
    return;
  }

  console.log("Product added to wishlist:", product);

  const selectedProduct = {
    name: product.name,
    price: product.price,
    seller: product.seller.name,
    image: product.images[0],
  };

  axios
    .post("http://127.0.0.1:5000/api/wishlist-add", selectedProduct, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Product added to wishlist successfully:", response.data);

      // ✅ Show toast only on success
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        status: "success",
      });
    })
    .catch((error) => {
      console.error(
        "Error adding product to wishlist:",
        error.response ? error.response.data : error.message
      );

      // ❌ Show error toast on failure
      toast({
        title: "Failed to add",
        description:
          error.response?.data?.message || "Something went wrong. Try again.",
        status: "error",
      });
    });
};

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-muted rounded mb-6"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? Math.round(product.price - (product.price * product.discount / 100)) 
    : null;

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, idx: number) => (
                <button 
                  key={idx}
                  className={`aspect-square rounded-md overflow-hidden border transition-colors ${selectedImage === idx ? 'border-primary' : 'hover:border-primary/50'}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <Link 
                  to="#" 
                  className="text-sm text-primary hover:underline"
                >
                  {product.seller.name}
                </Link>
                <div className="flex items-center text-amber-500 text-sm ml-4">
                  <Star className="fill-amber-500 h-4 w-4" />
                  <span className="ml-1">{product.seller.rating}</span>
                  
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
              
              <div className="mt-4 flex items-center">
                {product.discount ? (
                  <>
                    <span className="text-2xl font-bold text-primary">₹{discountedPrice}</span>
                    <span className="ml-2 text-lg text-muted-foreground line-through">₹{product.price}</span>
                    <span className="ml-3 bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm">
                      {product.discount}% off
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                )}
              </div>
              
              <div className="mt-2 text-sm">
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="bg-muted rounded-full px-3 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <Truck className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs text-center">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <Shield className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs text-center">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <RotateCcw className="h-5 w-5 text-muted-foreground mb-2" />
                  <span className="text-xs text-center">Easy Returns</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 rounded-none"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 rounded-none"
                    onClick={() => handleQuantityChange('increase')}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  className="ml-4 flex-1"
                  onClick={addToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={addToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: 'Link copied!',
                      description: 'Product link copied to clipboard',
                    });
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec: { name: string, value: string }, idx: number) => (
                  <div key={idx} className="flex">
                    <span className="font-medium w-1/3">{spec.name}:</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-medium mb-4">Seller Information</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-muted-foreground">Location: {product.seller.location}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${idx < Math.floor(product.seller.rating) ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.seller.rating} Seller Rating
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="sm:self-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review: { id: string, user: string, rating: number, comment: string, date: string }) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`h-4 w-4 ${idx < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl mb-4">⭐</div>
                  <h4 className="text-lg font-medium mb-2">No Reviews Yet</h4>
                  <p className="text-muted-foreground mb-6">Be the first to review this product</p>
                  <Button>Write a Review</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
