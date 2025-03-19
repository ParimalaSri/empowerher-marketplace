
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  discount: number;
}

const Cart = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  // const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS[0].wishlist);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const { toast } = useToast();
  const username = localStorage.getItem("username"); // Fetch stored username
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    console.log("username:", username);


  useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found!");
        setLoading(false);
        return;
      }
  
      axios
        .get("http://127.0.0.1:5000/api/carts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Raw Response:", res);
          setCartItems(res.data.cart || []); // Ensure it's always an array
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart',
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'empowerher10') {
      setPromoApplied(true);
      setPromoDiscount(10);
      toast({
        title: 'Promo code applied',
        description: 'You got 10% off your order!',
      });
    } else {
      toast({
        title: 'Invalid promo code',
        description: 'Please check your code and try again',
        variant: 'destructive'
      });
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount > 0 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const shippingCost = subtotal > 1000 ? 0 : 100;
  const promoAmount = promoApplied ? (subtotal * promoDiscount / 100) : 0;
  const total = subtotal + shippingCost - promoAmount;

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
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 p-4 text-sm font-medium border-b">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>
                
                <div className="divide-y">
                  {cartItems.map(item => {
                    const discountedPrice = item.discount > 0 
                      ? item.price - (item.price * item.discount / 100) 
                      : item.price;
                    
                    const itemTotal = discountedPrice * item.quantity;
                    
                    return (
                      <div key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                        {/* Mobile: Product + Remove */}
                        <div className="flex items-center justify-between mb-3 sm:hidden">
                          <div className="font-medium">{item.name}</div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Product */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium hidden sm:block">
                              <Link to={`/products/${item.id}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-xs text-muted-foreground">{item.seller}</p>
                            
                            {/* Desktop: Remove button */}
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-primary hover:underline mt-1 hidden sm:inline-block"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="col-span-2 text-center space-y-1 my-2 sm:my-0">
                          <div className="text-sm sm:hidden">Price:</div>
                          {item.discount > 0 ? (
                            <>
                              <div className="font-medium">₹{discountedPrice}</div>
                              <div className="text-xs text-muted-foreground line-through">₹{item.price}</div>
                            </>
                          ) : (
                            <div className="font-medium">₹{item.price}</div>
                          )}
                        </div>
                        
                        {/* Quantity */}
                        <div className="col-span-2 text-center my-2 sm:my-0">
                          <div className="text-sm sm:hidden mb-1">Quantity:</div>
                          <div className="flex items-center justify-center sm:justify-center">
                            <button
                              className="h-8 w-8 rounded-l-md border flex items-center justify-center hover:bg-muted"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus size={14} />
                            </button>
                            <div className="h-8 px-3 flex items-center justify-center border-t border-b">
                              {item.quantity}
                            </div>
                            <button
                              className="h-8 w-8 rounded-r-md border flex items-center justify-center hover:bg-muted"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Subtotal */}
                        <div className="col-span-2 text-center font-medium my-2 sm:my-0">
                          <div className="text-sm sm:hidden">Subtotal:</div>
                          ₹{itemTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCartItems([]);
                    toast({
                      title: 'Cart cleared',
                      description: 'All items have been removed from your cart',
                    });
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-primary">
                      <span>Promo ({promoDiscount}% off)</span>
                      <span>-₹{promoAmount}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Including taxes
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Promo code" 
                      className="flex-1 rounded-md border px-3 py-2 text-sm"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <div className="text-xs text-primary mt-1">
                      Code applied successfully!
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <div className="mt-6 space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">We accept:</p>
                    <div className="flex space-x-2">
                      <div className="h-6 w-10 bg-muted rounded"></div>
                      <div className="h-6 w-10 bg-muted rounded"></div>
                      <div className="h-6 w-10 bg-muted rounded"></div>
                      <div className="h-6 w-10 bg-muted rounded"></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Free shipping on orders above ₹1000.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Looks like you haven't added any products to your cart yet. Browse our collection to find something you'll love.
            </p>
            <Button asChild>
              <Link to="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
