import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';

const sellerFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  businessType: z.string().min(1, { message: 'Please select a business type.' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions.',
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SellerFormValues = z.infer<typeof sellerFormSchema>;

const SellerRegistration = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      location: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  const onSubmit = async (data: SellerFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/sellers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to register');
      }
  
      toast({
        title: 'Registration successful!',
        description: `Welcome to EmpowerHer Marketplace, ${data.fullName}!`,
      });
  
      navigate('/login', { state: { from: 'seller' } });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-muted/30 transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                EmpowerHer
              </span>
            </h1>
          </Link>
          <h2 className="mt-4 text-2xl font-bold">Become a Seller</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your seller account to showcase your products to customers worldwide
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm p-8 border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="handicrafts">Handicrafts</SelectItem>
                          <SelectItem value="clothing">Clothing & Textiles</SelectItem>
                          <SelectItem value="food">Food Products</SelectItem>
                          <SelectItem value="homeDecor">Home Decor</SelectItem>
                          <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Your city and state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute right-2 top-2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute right-2 top-2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating your account...' : 'Create Seller Account'}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:underline"
                state={{ from: 'seller' }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
