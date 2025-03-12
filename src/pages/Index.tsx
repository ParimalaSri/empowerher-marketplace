
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set page as loaded after a short delay for animations
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    // Scroll to top on page load
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
