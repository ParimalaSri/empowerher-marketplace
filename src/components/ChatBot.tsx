
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, ShoppingCart, X } from 'lucide-react';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: typeof products;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your shopping assistant. How can I help you today? You can ask about products, categories, or place an order directly.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: generateId(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Process the message and generate a response
    setTimeout(() => {
      processMessage(input);
    }, 500);
  };

  const processMessage = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Handle product queries
    if (lowercaseInput.includes('show') && (lowercaseInput.includes('product') || lowercaseInput.includes('items'))) {
      const filteredProducts = products.slice(0, 3); // Show first 3 products
      
      const botResponse: Message = {
        id: generateId(),
        content: 'Here are some of our popular products:',
        sender: 'bot',
        timestamp: new Date(),
        products: filteredProducts,
      };
      
      setMessages((prev) => [...prev, botResponse]);
      return;
    }
    
    // Handle category queries
    const categories = ['clothing', 'accessories', 'home decor', 'organic food', 'handicrafts'];
    for (const category of categories) {
      if (lowercaseInput.includes(category)) {
        const categoryProducts = products.filter(p => 
          p.category.toLowerCase() === category
        ).slice(0, 3);
        
        if (categoryProducts.length > 0) {
          const botResponse: Message = {
            id: generateId(),
            content: `Here are some products in the ${category} category:`,
            sender: 'bot',
            timestamp: new Date(),
            products: categoryProducts,
          };
          
          setMessages((prev) => [...prev, botResponse]);
          return;
        }
      }
    }
    
    // Handle order requests
    if (lowercaseInput.includes('order') || lowercaseInput.includes('buy')) {
      const productMentioned = products.find(p => 
        lowercaseInput.includes(p.name.toLowerCase())
      );
      
      if (productMentioned) {
        const botResponse: Message = {
          id: generateId(),
          content: `Great choice! I've added "${productMentioned.name}" to your cart. Would you like to checkout now or continue shopping?`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        // Simulate adding to cart
        toast({
          title: 'Product added to cart',
          description: `${productMentioned.name} has been added to your cart`,
        });
        
        setMessages((prev) => [...prev, botResponse]);
        return;
      }
    }
    
    // Default response
    const botResponse: Message = {
      id: generateId(),
      content: "I'm here to help you find products or place orders. You can ask me to show products, browse categories like 'clothing' or 'handicrafts', or order specific items.",
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botResponse]);
  };

  const addToCart = (product: typeof products[0]) => {
    toast({
      title: 'Product added to cart',
      description: `${product.name} has been added to your cart`,
    });

    const botResponse: Message = {
      id: generateId(),
      content: `Great! I've added "${product.name}" to your cart. Would you like to checkout now or continue shopping?`,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 rounded-full p-4 w-14 h-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 sm:rounded-xl max-w-md border-0 shadow-xl transition-all duration-200 data-[state=open]:animate-none focus:outline-none ${isMinimized ? 'h-16' : 'h-[600px] max-h-[80vh]'}`}>
          <Card className="border-0 h-full flex flex-col">
            <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">Shopping Assistant</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <MessageCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            
            {!isMinimized && (
              <>
                <CardContent className="p-4 overflow-y-auto flex-grow">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.content}</p>
                          
                          {message.products && message.products.length > 0 && (
                            <div className="mt-3 space-y-3">
                              {message.products.map((product) => (
                                <div 
                                  key={product.id} 
                                  className="flex items-start gap-3 bg-card rounded-md p-2 shadow-sm"
                                >
                                  <div 
                                    className="h-12 w-12 rounded bg-cover bg-center bg-no-repeat shrink-0" 
                                    style={{ backgroundImage: `url(${product.image})` }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">₹{product.price}</p>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="shrink-0"
                                    onClick={() => addToCart(product)}
                                  >
                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                <CardFooter className="p-3 pt-2 border-t bg-card">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </>
            )}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
