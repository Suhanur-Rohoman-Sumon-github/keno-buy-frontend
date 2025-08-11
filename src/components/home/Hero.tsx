"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Hero = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="w-full overflow-hidden">
      {/* Slider */}
      <Slider {...sliderSettings} className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div key={index} className="relative md:h-[500px] h-[200px] w-full">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0"
            />
          </div>
        ))}
      </Slider>

      {/* Fixed Category Bar */}
    </section>
  );
};

export default Hero;
