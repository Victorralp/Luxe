
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  textColor: string;
}

const slides: HeroSlide[] = [
  {
    id: "slide1",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Spring Collection 2023",
    subtitle: "Discover timeless elegance with our new arrivals",
    buttonText: "Shop Now",
    buttonLink: "/category/new-arrivals",
    textColor: "text-white",
  },
  {
    id: "slide2",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Summer Essentials",
    subtitle: "Light fabrics and elegant cuts for the warmer days",
    buttonText: "Explore",
    buttonLink: "/category/summer",
    textColor: "text-white",
  },
  {
    id: "slide3",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Limited Edition",
    subtitle: "Exclusive pieces crafted with exceptional attention to detail",
    buttonText: "Discover",
    buttonLink: "/category/limited-edition",
    textColor: "text-white",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 500);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div 
                className="absolute inset-0 bg-black opacity-30 z-10"
                aria-hidden="true"
              />
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex items-center px-6">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={`content-${currentSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4 ${currentSlide.textColor}`}>
                {currentSlide.title}
              </h1>
              <p className={`text-lg md:text-xl mb-8 ${currentSlide.textColor} opacity-90`}>
                {currentSlide.subtitle}
              </p>
              <Button
                size="lg"
                className="text-sm px-8 bg-white text-black hover:bg-white/90 hover:text-black"
                asChild
              >
                <a href={currentSlide.buttonLink}>{currentSlide.buttonText}</a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm text-white hover:bg-background/50"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/30 backdrop-blur-sm text-white hover:bg-background/50"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
