"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Carousel Slides
const slides = [
  {
    image:
      "https://i.ibb.co/tMY2QBvg/Whats-App-Image-2025-07-15-at-16-07-30-27e45276.jpg",
    heading: "Wear the Moment",
    description:
      "Discover our premium collection of Islamic fashion, fragrances, and lifestyle products. Quality that speaks to your beliefs.",
    primaryButton: "Shop Collection",
    secondaryButton: "View Offers",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    heading: "Ramadan Special 2025",
    description:
      "Exclusive deals on Panjabi and traditional wears. Up to 40% OFF.",
    primaryButton: "Explore Ramadan",
    secondaryButton: "Grab Deals",
  },
  {
    image:
      "https://cdn.prod.website-files.com/5e73b00410e4b42fae046074/5ead999ab8d39c3c096e6843_Menswear-ecommerce-packshot-photography.jpg",
    heading: "Luxury Attar Collection",
    description:
      "Premium attars crafted with natural ingredients. Feel the essence of purity.",
    primaryButton: "Shop Attars",
    secondaryButton: "Learn More",
  },
];

// Categories
const categories = ["PANJABI", "T-SHIRT", "POLO", "ATTAR", "COMBO", "TROUSER"];

const Hero = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // No prev/next buttons
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <Slider {...sliderSettings} className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen w-full">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Slide Text */}
            <div className="container relative z-10 mx-auto px-4 py-16 lg:py-24 flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {slide.heading}
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button className="animate-scale-in">
                    {slide.primaryButton}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white  hover:bg-white hover:text-black animate-scale-in"
                  >
                    {slide.secondaryButton}
                  </Button>
                </div>

                {/* Category Tags */}
                <div
                  className="flex flex-wrap gap-3 justify-center
                    relative
                    lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2
                  "
                >
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
