
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-display font-bold mb-4">404</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Oops! The page you're looking for has either moved or doesn't exist.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
