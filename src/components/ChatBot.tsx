
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, SendHorizontal, X, ShoppingBag, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { toast } from '@/hooks/use-toast';

// Supported languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

// Sample products that can be ordered through the bot
const products = [
  { id: 1, name: 'Handwoven Cotton Shawl', price: 1200 },
  { id: 2, name: 'Hand-painted Clay Pottery', price: 850 },
  { id: 3, name: 'Organic Herbal Tea Set', price: 550 },
  { id: 4, name: 'Embroidered Table Runner', price: 750 },
  { id: 5, name: 'Handcrafted Wooden Jewelry Box', price: 1800 },
];

// Translations for bot messages
const translations = {
  en: {
    welcome: "Hello! I'm your shopping assistant. How can I help you today?",
    helpText: "You can ask about products, add items to cart, or get help with your order.",
    productList: "Here are some products you might be interested in:",
    addedToCart: "Added to your cart!",
    askMore: "Is there anything else you'd like to know?",
    thankYou: "Thank you for your order! It has been placed successfully.",
    chatPlaceholder: "Type your message...",
    send: "Send",
    close: "Close",
    chatWithUs: "Chat with us",
  },
  hi: {
    welcome: "नमस्ते! मैं आपका शॉपिंग सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    helpText: "आप उत्पादों के बारे में पूछ सकते हैं, कार्ट में आइटम जोड़ सकते हैं, या अपने ऑर्डर के साथ मदद ले सकते हैं।",
    productList: "यहां कुछ उत्पाद हैं जिनमें आप रुचि रख सकते हैं:",
    addedToCart: "आपके कार्ट में जोड़ा गया!",
    askMore: "क्या आप कुछ और जानना चाहेंगे?",
    thankYou: "आपके ऑर्डर के लिए धन्यवाद! इसे सफलतापूर्वक प्लेस कर दिया गया है।",
    chatPlaceholder: "अपना संदेश लिखें...",
    send: "भेजें",
    close: "बंद करें",
    chatWithUs: "हमसे चैट करें",
  },
  es: {
    welcome: "¡Hola! Soy tu asistente de compras. ¿Cómo puedo ayudarte hoy?",
    helpText: "Puedes preguntar sobre productos, añadir artículos al carrito o recibir ayuda con tu pedido.",
    productList: "Aquí hay algunos productos que podrían interesarte:",
    addedToCart: "¡Añadido a tu carrito!",
    askMore: "¿Hay algo más que te gustaría saber?",
    thankYou: "¡Gracias por tu pedido! Se ha realizado con éxito.",
    chatPlaceholder: "Escribe tu mensaje...",
    send: "Enviar",
    close: "Cerrar",
    chatWithUs: "Chatea con nosotros",
  },
  fr: {
    welcome: "Bonjour! Je suis votre assistant d'achat. Comment puis-je vous aider aujourd'hui?",
    helpText: "Vous pouvez poser des questions sur les produits, ajouter des articles au panier ou obtenir de l'aide pour votre commande.",
    productList: "Voici quelques produits qui pourraient vous intéresser:",
    addedToCart: "Ajouté à votre panier!",
    askMore: "Y a-t-il autre chose que vous aimeriez savoir?",
    thankYou: "Merci pour votre commande! Elle a été passée avec succès.",
    chatPlaceholder: "Tapez votre message...",
    send: "Envoyer",
    close: "Fermer",
    chatWithUs: "Discutez avec nous",
  },
  de: {
    welcome: "Hallo! Ich bin Ihr Einkaufsassistent. Wie kann ich Ihnen heute helfen?",
    helpText: "Sie können nach Produkten fragen, Artikel in den Warenkorb legen oder Hilfe bei Ihrer Bestellung erhalten.",
    productList: "Hier sind einige Produkte, die Sie interessieren könnten:",
    addedToCart: "Zu Ihrem Warenkorb hinzugefügt!",
    askMore: "Gibt es noch etwas, das Sie wissen möchten?",
    thankYou: "Vielen Dank für Ihre Bestellung! Sie wurde erfolgreich aufgegeben.",
    chatPlaceholder: "Geben Sie Ihre Nachricht ein...",
    send: "Senden",
    close: "Schließen",
    chatWithUs: "Chatten Sie mit uns",
  }
};

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isProduct?: boolean;
  productId?: number;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          text: translations[language as keyof typeof translations]?.welcome || translations.en.welcome, 
          sender: 'bot' 
        },
        { 
          text: translations[language as keyof typeof translations]?.helpText || translations.en.helpText, 
          sender: 'bot' 
        }
      ]);
    }
  }, [language, messages.length]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Detect language from user input (simplified version)
  const detectLanguage = (text: string): string => {
    // This is a very simplified language detection that looks for common words
    if (/hola|como|gracias|por favor|buenos dias|buenas tardes/i.test(text)) return 'es';
    if (/bonjour|merci|s'il vous plaît|comment|bien/i.test(text)) return 'fr';
    if (/hallo|danke|bitte|guten tag|wie geht/i.test(text)) return 'de';
    if (/नमस्ते|धन्यवाद|कृपया|कैसे हो|अच्छा/i.test(text)) return 'hi';
    return 'en'; // Default to English
  };

  // Process user message and generate bot response
  const processMessage = async (userMessage: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    
    // Clear input field
    setMessage('');
    
    // Detect language
    const detectedLang = detectLanguage(userMessage);
    if (detectedLang !== language) {
      // Type cast the detectedLang as Language type since we know it's a valid language code
      setLanguage(detectedLang as 'en' | 'hi' | 'es' | 'fr' | 'de');
    }
    
    const t = translations[detectedLang as keyof typeof translations] || translations.en;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Handle product search queries
    if (/products|show|items|what do you sell|what do you have/i.test(userMessage) || 
        /productos|mostrar|artículos|qué vendes/i.test(userMessage) || 
        /produits|afficher|articles|que vendez-vous/i.test(userMessage) || 
        /produkte|zeigen|artikel|was verkaufen Sie/i.test(userMessage) ||
        /उत्पाद|दिखाएं|वस्तुएं|आप क्या बेचते हैं/i.test(userMessage)) {
      
      setMessages(prev => [...prev, { text: t.productList, sender: 'bot' }]);
      
      // Add product list to chat
      products.forEach(product => {
        setMessages(prev => [...prev, { 
          text: `${product.name} - ₹${product.price}`, 
          sender: 'bot',
          isProduct: true,
          productId: product.id
        }]);
      });
      
      setMessages(prev => [...prev, { text: t.askMore, sender: 'bot' }]);
      return;
    }
    
    // Handle add to cart queries
    if (/add|buy|purchase|cart/i.test(userMessage) || 
        /añadir|comprar|carrito/i.test(userMessage) || 
        /ajouter|acheter|panier/i.test(userMessage) || 
        /hinzufügen|kaufen|warenkorb/i.test(userMessage) ||
        /जोड़ें|खरीदें|कार्ट/i.test(userMessage)) {
      
      // Try to identify which product to add
      let productToAdd = null;
      for (const product of products) {
        if (userMessage.toLowerCase().includes(product.name.toLowerCase())) {
          productToAdd = product;
          break;
        }
      }
      
      if (productToAdd) {
        // Add to cart
        const existingItem = cart.find(item => item.id === productToAdd?.id);
        if (existingItem) {
          setCart(cart.map(item => 
            item.id === productToAdd?.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ));
        } else {
          setCart([...cart, { ...productToAdd, quantity: 1 }]);
        }
        
        setMessages(prev => [...prev, { 
          text: `${productToAdd.name} - ${t.addedToCart}`, 
          sender: 'bot' 
        }]);
        
        toast({
          title: t.addedToCart,
          description: productToAdd.name,
        });
      } else {
        // Suggest products if none specified
        setMessages(prev => [...prev, { text: t.productList, sender: 'bot' }]);
        products.forEach(product => {
          setMessages(prev => [...prev, { 
            text: `${product.name} - ₹${product.price}`, 
            sender: 'bot',
            isProduct: true,
            productId: product.id
          }]);
        });
      }
      
      return;
    }
    
    // Handle order placement
    if (/order|checkout|place order|confirm/i.test(userMessage) || 
        /pedido|confirmar|finalizar compra/i.test(userMessage) || 
        /commander|passer la commande|confirmer/i.test(userMessage) || 
        /bestellen|bestellung aufgeben|bestätigen/i.test(userMessage) ||
        /आदेश|चेकआउट|आदेश देना|पुष्टि/i.test(userMessage)) {
      
      setMessages(prev => [...prev, { text: t.thankYou, sender: 'bot' }]);
      
      // Clear cart after order placement
      setCart([]);
      return;
    }
    
    // Default response
    setMessages(prev => [...prev, { text: t.askMore, sender: 'bot' }]);
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      
      const t = translations[language as keyof typeof translations] || translations.en;
      toast({
        title: t.addedToCart,
        description: product.name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      processMessage(message.trim());
    }
  };

  const handleLanguageChange = (value: string) => {
    // Type cast value to Language type since we know it's coming from a controlled component with valid values
    setLanguage(value as 'en' | 'hi' | 'es' | 'fr' | 'de');
  };

  return (
    <>
      {/* Chat Bot Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {/* Chat Bot Dialog */}
      <div className={cn(
        "fixed bottom-6 right-6 w-80 sm:w-96 bg-card border rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out flex flex-col",
        "overflow-hidden max-h-[70vh]",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">
              {translations[language as keyof typeof translations]?.chatWithUs || "Chat with us"}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Language Selector */}
        <Tabs defaultValue={language} onValueChange={handleLanguageChange} className="w-full">
          <div className="bg-muted/50 px-2 py-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span>Language:</span>
            </div>
            <TabsList className="w-full h-8 bg-transparent">
              {languages.map((lang) => (
                <TabsTrigger
                  key={lang.code}
                  value={lang.code}
                  className="text-xs px-1 py-0.5"
                >
                  {lang.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                msg.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2",
                  msg.sender === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{msg.text}</p>
                {msg.isProduct && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-2 w-full text-xs h-7"
                    onClick={() => handleAddToCart(msg.productId || 0)}
                  >
                    <ShoppingBag className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={translations[language as keyof typeof translations]?.chatPlaceholder || "Type your message..."}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
