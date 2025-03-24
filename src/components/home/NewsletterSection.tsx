
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!", {
        description: "You'll receive our next newsletter in your inbox.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-background/80 mb-8">
            Stay in the loop with our latest collections, exclusive offers, and style inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus-visible:ring-gold"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold-dark text-black"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-background/60 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
