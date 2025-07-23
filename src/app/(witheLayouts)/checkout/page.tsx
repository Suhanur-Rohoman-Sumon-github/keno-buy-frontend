/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, Truck, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetCart } from "@/hooks/cart.hook"; // 🔥 Cart API hook
import axios from "axios";
import { useGetSingleProduct } from "@/hooks/product.hook";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const router = useRouter();
 

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Delivery form
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    address: "",
    district: "",
    notes: "",
  });

  // Get productId from query params
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  // Fetch userEmail from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  // Fetch single product if productId exists
  const { data: singleProduct } = useGetSingleProduct(productId || "");

  // Fetch cart items if no productId
  const { data: cartData, isLoading: cartLoading } = useGetCart(
    userEmail || ""
  );
  useEffect(() => {
    if (productId && singleProduct) {
      // 🔥 Show only the single product details (skip cart)
      setCheckoutItems([
        {
          id: singleProduct._id,
          name: singleProduct.name,
          price: singleProduct.price,
          quantity: 1, // Default to 1 for direct checkout
          image: singleProduct.image,
        },
      ]);
    } else if (!productId && cartData) {
      // 🛒 Show cart items
      setCheckoutItems(
        cartData.items.map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        }))
      );
    }
  }, [productId, singleProduct, cartData]);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 60;
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 🛒 Prepare order payload
      const orderPayload = {
        userEmail,
        items: checkoutItems,
        totalAmount: total,
        deliveryDetails: formData,
        paymentMethod,
      };

      // 🚀 Send order request
      await axios.post("/api/orders", orderPayload);

      router.push("/order-success");
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading && !productId) {
    return <div className="text-center p-4">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-primary">
            কার্ট
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">চেকআউট</span>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            কার্টে ফিরে যান
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  ডেলিভারি তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Form fields */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">আপনার নাম *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">মোবাইল নাম্বার *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="pl-10"
                        placeholder="+৮৮০ ১২৩৪ ৫৬৭৮৯০"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="বাড়ি/বিল্ডিং, রাস্তা, এলাকা"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* District dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="district">জেলা নির্বাচন করুন *</Label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                      required
                      className="w-full border rounded-md px-4 py-2 text-sm"
                    >
                      <option value="">-- জেলা নির্বাচন করুন --</option>
                      {[
                        "ঢাকা",
                        "চট্টগ্রাম",
                        "রাজশাহী",
                        "খুলনা",
                        "বরিশাল",
                        "সিলেট",
                        "রংপুর",
                        "ময়মনসিংহ",
                      ].map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">অতিরিক্ত নির্দেশনা (ঐচ্ছিক)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="ডেলিভারির জন্য কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  পেমেন্ট মাধ্যম
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">ক্যাশ অন ডেলিভারি</div>
                          <div className="text-sm text-muted-foreground">
                            পণ্য গ্রহণের সময় টাকা দিন
                          </div>
                        </div>
                        <Truck className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>অর্ডার সারাংশ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        height={64}
                        width={64}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          পরিমাণ: {item.quantity}
                        </span>
                        <span className="font-medium">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>সাবটোটাল</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>শিপিং</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "ফ্রি" : `৳${shipping}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span>৳{total}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "প্রসেসিং..."
                    : `অর্ডার নিশ্চিত করুন - ৳${total}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
