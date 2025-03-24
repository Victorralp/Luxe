
import { motion } from "framer-motion";

interface CategoryHeaderProps {
  title: string;
  description?: string;
  image: string;
}

const CategoryHeader = ({ title, description, image }: CategoryHeaderProps) => {
  return (
    <div className="relative h-[240px] md:h-[300px] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      <div className="relative container mx-auto px-4 h-full z-20 flex flex-col justify-center items-center text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-display font-medium text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            className="text-white/90 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CategoryHeader;
