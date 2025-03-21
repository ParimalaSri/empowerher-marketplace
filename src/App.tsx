
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ViewProducts from "./pages/ViewProducts";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SellerRegistration from "./pages/SellerRegistration";
import CustomerRegistration from "./pages/CustomerRegistration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ChatBot from "./components/ChatBot";
import Hello from "./pages/hello";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-products" element={<ViewProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller/register" element={<SellerRegistration />} />
          <Route path="/customer/register" element={<CustomerRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
          <Route path="/customer/dashboard/*" element={<CustomerDashboard />} />
          <Route path="/hello" element={<Hello />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
