import { Card, CardContent } from "@/components/ui/card";
import attarImage from "@/assets/category-attar.jpg";
import panjabiImage from "@/assets/category-panjabi.jpg";
import tshirtImage from "@/assets/category-tshirt.jpg";
import poloImage from "@/assets/category-polo.jpg";
import sneakersImage from "@/assets/category-sneakers.jpg";
import pantsImage from "@/assets/category-pants.jpg";
import tupiImage from "@/assets/category-tupi.jpg";
import naturalFoodsImage from "@/assets/category-natural-foods.jpg";
import Image from "next/image";

const Categories = () => {
  const categories = [
    {
      name: "Attar",
      image: "https://i.ibb.co/xKn5j8P7/image.png",
      count: "24 products",
    },
    {
      name: "Natural Foods",
      image: "https://i.ibb.co/bMThdDS2/image.png",
      count: "18 products",
    },
    {
      name: "Panjabi",
      image: "https://i.ibb.co/bMThdDS2/image.png",
      count: "45 products",
    },
    {
      name: "Pants & Trouser",
      image: "https://i.ibb.co/XkdWZXQg/image.png",
      count: "32 products",
    },
    {
      name: "Polo Shirt",
      image: "https://i.ibb.co/6cZ9qnSJ/image.png",
      count: "28 products",
    },
    {
      name: "Sneakers",
      image: "https://i.ibb.co/ZRWy6h3v/image.png",
      count: "16 products",
    },
    {
      name: "T-Shirt",
      image: "https://i.ibb.co/1GrGqKfp/image.png",
      count: "52 products",
    },
    {
      name: "Tupi",
      image: "https://i.ibb.co/DHr3C2mB/image.png",
      count: "12 products",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Top Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our premium collection across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    height={200}
                    width={200}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
