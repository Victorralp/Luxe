
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="w-full max-w-3xl mx-auto mb-12 text-center">
          <h3 className="text-2xl font-display font-medium mb-3">Join Our Newsletter</h3>
          <p className="text-muted-foreground mb-6">Stay updated with our newest collections and exclusive offers.</p>
          <div className="flex w-full max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="rounded-r-none focus-visible:ring-0 h-11"
            />
            <Button className="rounded-l-none h-11 bg-foreground text-background hover:bg-foreground/90">
              <span className="hidden sm:inline mr-2">Subscribe</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Shop */}
          <div>
            <h4 className="font-medium text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/new-arrivals" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link to="/category/women" className="text-muted-foreground hover:text-foreground">Women</Link></li>
              <li><Link to="/category/men" className="text-muted-foreground hover:text-foreground">Men</Link></li>
              <li><Link to="/category/accessories" className="text-muted-foreground hover:text-foreground">Accessories</Link></li>
              <li><Link to="/category/sale" className="text-muted-foreground hover:text-foreground">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/customer-service" className="text-muted-foreground hover:text-foreground">Customer Service</Link></li>
              <li><Link to="/track-order" className="text-muted-foreground hover:text-foreground">Track Your Order</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-medium text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/our-story" className="text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-foreground">Sustainability</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">1234 Fashion Ave, Suite 100</li>
              <li className="text-muted-foreground">New York, NY 10001</li>
              <li className="text-muted-foreground">United States</li>
              <li className="pt-2">
                <a href="mailto:hello@luxe.com" className="text-foreground flex items-center gap-2 hover:text-gold-dark">
                  <Mail className="h-4 w-4" />
                  hello@luxe.com
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-xl font-display font-semibold tracking-tight">
                LUXE
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link>
              <span>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
