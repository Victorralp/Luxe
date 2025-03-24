
import ProductGrid from "../product/ProductGrid";

// Sample product data
const featuredProducts = [
  {
    id: "p1",
    name: "Tailored Silk Blouse",
    price: 125,
    images: [
      "https://images.unsplash.com/photo-1551489628-5e2337c36434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1551489628-a8a92883fed3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#F8EFE6", "#D4B59E", "#212121"],
    category: "Women's Tops",
    isNew: true,
  },
  {
    id: "p2",
    name: "Wool Blend Blazer",
    price: 275,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
      "https://images.unsplash.com/photo-1591047139756-37a32d8fb586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80"
    ],
    colors: ["#3D3D3D", "#6B5D4D"],
    category: "Men's Outerwear",
    isBestSeller: true,
  },
  {
    id: "p3",
    name: "Handcrafted Leather Bag",
    price: 350,
    originalPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    colors: ["#9C6D3E", "#594A3A"],
    category: "Accessories",
  },
  {
    id: "p4",
    name: "Cotton Knit Sweater",
    price: 175,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1179&q=80"
    ],
    colors: ["#EAEAEA", "#B1A79F", "#545454"],
    category: "Women's Knitwear",
    isBestSeller: true,
  },
  {
    id: "p5",
    name: "Slim Fit Jeans",
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=926&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#151D2B", "#8C939B"],
    category: "Men's Bottoms",
  },
  {
    id: "p6",
    name: "Cashmere Scarf",
    price: 95,
    originalPrice: 120,
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1583334648584-6c2ba1fb621c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=989&q=80"
    ],
    colors: ["#D6CAC1", "#383838", "#7D5151"],
    category: "Accessories",
    isNew: true,
  },
  {
    id: "p7",
    name: "Fine Wool Coat",
    price: 425,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1551489603-9f3208fccf73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#AEABA8", "#3A2D2F"],
    category: "Women's Outerwear",
  },
  {
    id: "p8",
    name: "Leather Ankle Boots",
    price: 295,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    ],
    colors: ["#2B2B2B", "#664F3C"],
    category: "Footwear",
    isBestSeller: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <ProductGrid
          title="Featured Products"
          subtitle="Curated selection of our finest pieces"
          products={featuredProducts}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
