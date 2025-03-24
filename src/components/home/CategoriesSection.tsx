
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "women",
    title: "Women",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
    link: "/category/women",
  },
  {
    id: "men",
    title: "Men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    link: "/category/men",
  },
  {
    id: "accessories",
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
    link: "/category/accessories",
  },
];

const CategoriesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-medium text-center mb-12">Shop by Category</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link 
                to={category.link}
                className="group block relative overflow-hidden rounded-lg aspect-[3/4] md:aspect-square"
              >
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10" />
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-background/80 backdrop-blur-sm py-3 px-8 rounded-md">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-foreground">{category.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
