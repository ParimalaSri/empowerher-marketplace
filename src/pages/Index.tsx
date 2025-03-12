
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Set page as loaded immediately
    setPageLoaded(true);

    // Set content as loaded with a short delay for smoother transitions
    const contentTimer = setTimeout(() => {
      setContentLoaded(true);
    }, 300);

    // Scroll to top on page load
    window.scrollTo(0, 0);

    return () => {
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main>
        <Hero />
        {contentLoaded ? (
          <>
            <Categories />
            <FeaturedProducts />
            <Testimonials />
          </>
        ) : (
          <div className="py-16">
            <div className="container mx-auto max-w-7xl">
              <Skeleton className="w-full h-[500px] rounded-xl mb-10" />
              <Skeleton className="w-full h-[600px] rounded-xl mb-10" />
              <Skeleton className="w-full h-[400px] rounded-xl" />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
