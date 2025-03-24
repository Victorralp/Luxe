
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  location: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    content: "The quality of their clothing is exceptional. I've never felt fabrics so luxurious, and the attention to detail is impressive. Worth every penny.",
    author: "Emma Thompson",
    location: "New York",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
  },
  {
    id: "t2",
    content: "I was hesitant about ordering online, but the sizing guide was spot on, and the clothes fit perfectly. The customer service team was also incredibly helpful.",
    author: "Michael Chen",
    location: "Los Angeles",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
  {
    id: "t3",
    content: "Their commitment to sustainable fashion is what keeps me coming back. It's rare to find a brand that combines luxury with environmental consciousness so well.",
    author: "Sofia Rodriguez",
    location: "Miami",
    rating: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsVisible(true);
    }, 400);
  };

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsVisible(true);
    }, 400);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-medium text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    {currentTestimonial.image ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                        <img 
                          src={currentTestimonial.image} 
                          alt={currentTestimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-2 border-gold">
                        <span className="text-xl font-medium">{currentTestimonial.author.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < currentTestimonial.rating ? 'text-gold fill-gold' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl italic mb-6 px-4">
                    "{currentTestimonial.content}"
                  </blockquote>

                  <div className="text-sm">
                    <span className="font-medium">{currentTestimonial.author}</span>
                    {currentTestimonial.location && (
                      <span className="text-muted-foreground"> • {currentTestimonial.location}</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-gold' : 'w-2 bg-muted-foreground/30'
              }`}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsVisible(true);
                }, 400);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
