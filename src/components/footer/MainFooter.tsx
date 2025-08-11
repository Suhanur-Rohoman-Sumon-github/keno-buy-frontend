const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Keno buy</h3>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted destination for premium Islamic fashion, fragrances,
              and lifestyle products. Quality that speaks to your beliefs.
            </p>
          </div>

          {/* Quick Links */}

          {/* Categories */}

          {/* Contact & Newsletter */}
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            &copy; 2024 keno buy . All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
