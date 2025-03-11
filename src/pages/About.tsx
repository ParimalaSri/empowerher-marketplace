
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Our Story
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              EmpowerHer Marketplace was founded with a simple yet powerful mission: to create economic
              opportunities for women entrepreneurs in rural communities across the country.
            </p>
            
            <div className="my-12 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Women entrepreneurs collaborating" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe that economic empowerment is the key to sustainable change. By providing a platform
              for rural women artisans and entrepreneurs to showcase their products to a global audience,
              we're helping bridge the digital divide and create pathways to prosperity.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-background/50 p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-muted-foreground">Women Entrepreneurs</div>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">₹20M+</div>
                <div className="text-muted-foreground">Revenue Generated</div>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Communities Impacted</div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p className="mb-6">
              Our team consists of passionate individuals from diverse backgrounds, united by a commitment
              to create sustainable economic opportunities for women. We work closely with NGOs, government
              agencies, and corporate partners to provide training, support, and market access to women entrepreneurs.
            </p>
            
            <div className="my-12">
              <blockquote className="italic border-l-4 border-primary pl-4 py-2">
                "When you empower a woman, you empower a community. Our marketplace is more than just a
                platform—it's a movement towards gender equality and economic justice."
              </blockquote>
              <div className="mt-4 font-medium">— Priya Sharma, Founder</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
