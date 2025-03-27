import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const products = [
  {
    name: "Classic White Sneakers",
    price: 89.99,
    original_price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ],
    colors: ["#FFFFFF", "#000000"],
    category: "men",
    is_new: true,
    is_bestseller: true,
    description: "Classic white sneakers perfect for everyday wear.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 100
  },
  {
    name: "Leather Crossbody Bag",
    price: 129.99,
    original_price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    ],
    colors: ["#8B4513", "#000000"],
    category: "accessories",
    is_new: true,
    is_bestseller: false,
    description: "Stylish leather crossbody bag with adjustable strap.",
    stock: 50
  },
  {
    name: "Summer Floral Dress",
    price: 79.99,
    original_price: 99.99,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    ],
    colors: ["#FF69B4", "#87CEEB"],
    category: "women",
    is_new: true,
    is_bestseller: true,
    description: "Light and breezy floral dress perfect for summer.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 75
  }
];

const seedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) throw error;
    console.log('Products seeded successfully:', data);
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Run the seed function
seedProducts(); 