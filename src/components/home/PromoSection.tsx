
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="aspect-[4/5] overflow-hidden rounded-lg relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Luxury Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <div className="p-6 md:p-8 text-white">
                <span className="text-sm uppercase tracking-widest mb-2 inline-block">Limited Edition</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium mb-4">Artisan Collection</h3>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" asChild>
                  <Link to="/category/limited-edition" className="flex items-center gap-2">
                    Discover <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="aspect-[4/5] overflow-hidden rounded-lg relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1531938716357-224c16b5ace3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
              alt="Seasonal Sale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <div className="p-6 md:p-8 text-white">
                <span className="text-sm uppercase tracking-widest mb-2 inline-block">Special Offer</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium mb-4">Summer Sale</h3>
                <Button className="bg-white text-black hover:bg-white/90 hover:text-black" asChild>
                  <Link to="/category/sale" className="flex items-center gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
