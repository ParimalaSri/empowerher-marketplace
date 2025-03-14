
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-24">
        <div className="container max-w-md text-center px-4">
          <div className="bg-primary/10 inline-flex rounded-full p-4 mb-6">
            <div className="text-primary text-4xl">404</div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to={-1 as any} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
