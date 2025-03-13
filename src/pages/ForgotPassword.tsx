
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, AlertCircle, Check } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Forgot password form submitted:', data);
      
      setIsSuccess(true);
      
      toast({
        title: 'Reset link sent!',
        description: `We've sent a password reset link to ${data.email}`,
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-muted/30">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                EmpowerHer
              </span>
            </h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Reset your password
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm p-8 border space-y-6">
          {!isSuccess ? (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Forgot your password?</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email">Email Address</Label>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="Enter your email" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending link...' : 'Send reset link'}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <Alert>
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We've sent a password reset link to your email address. The link will expire in 15 minutes.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center pt-4">
            <p className="text-sm">
              Remembered your password?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:underline"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
