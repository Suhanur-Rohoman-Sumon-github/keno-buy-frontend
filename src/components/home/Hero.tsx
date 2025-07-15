import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://i.ibb.co/tMY2QBvg/Whats-App-Image-2025-07-15-at-16-07-30-27e45276.jpg"
        alt="Fashion Collection"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0 z-0"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="container relative z-20 mx-auto px-4 py-16 lg:py-24 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Wear the
            <span className="block text-accent">Moment</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our premium collection of Islamic fashion, fragrances, and
            lifestyle products. Quality that speaks to your beliefs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="animate-scale-in">Shop Collection</Button>
            <Button
              variant="outline"
              className=" border-white hover:bg-white hover:text-black animate-scale-in"
            >
              View Offers
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {["PANJABI", "T-SHIRT", "POLO", "ATTAR", "COMBO", "TROUSER"].map(
              (item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
