import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Believers Sign</h3>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted destination for premium Islamic fashion, fragrances,
              and lifestyle products. Quality that speaks to your beliefs.
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:text-accent"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:text-accent"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:text-accent"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Contact",
                "Shipping Info",
                "Returns",
                "Size Guide",
                "FAQ",
              ].map((link) => (
                <li key={link}>
                  <Button
                    variant="link"
                    className="text-primary-foreground/80 hover:text-accent p-0 h-auto font-normal"
                  >
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {[
                "Attar",
                "Panjabi",
                "T-Shirts",
                "Polo Shirts",
                "Pants",
                "Sneakers",
                "Prayer Caps",
                "Natural Foods",
              ].map((category) => (
                <li key={category}>
                  <Button
                    variant="link"
                    className="text-primary-foreground/80 hover:text-accent p-0 h-auto font-normal"
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+880-1234-567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@believerssign.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">Newsletter</h5>
              <p className="text-sm text-primary-foreground/80 mb-3">
                Get updates on new products and offers
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button  size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            &copy; 2024 Believers Sign. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
