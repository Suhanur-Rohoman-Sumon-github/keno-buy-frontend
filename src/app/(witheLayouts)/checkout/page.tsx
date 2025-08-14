/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useClearCartMutation, useGetCart } from "@/hooks/cart.hook";
import { useGetSingleProduct } from "@/hooks/product.hook";
import { usePlaceOrderMutation } from "@/hooks/order.hook";

const Checkout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [paymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  type CheckoutItem = {
    id: string;
    name: string;
    discountedPrice: number;
    quantity: number;
    images: string;
  };

  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [directQuantity, setDirectQuantity] = useState<number>(1);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const { mutate } = useClearCartMutation();

  const selectedDistrict = watch("district");

  // Auto shipping fee
  useEffect(() => {
    if (selectedDistrict === "ঢাকা") {
      setShippingFee(60);
    } else if (selectedDistrict && selectedDistrict !== "ঢাকা") {
      setShippingFee(180);
    } else {
      setShippingFee(0);
    }
  }, [selectedDistrict]);

  // Fetch email
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  // Get params for direct checkout
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pid = searchParams.get("productId");
    const q = searchParams.get("quantity");
    setProductId(pid);
    if (q) setDirectQuantity(Number(q));
  }, []);

  const { data: singleProduct, isLoading } = useGetSingleProduct(
    productId || ""
  );
  const { mutate: crateOrder } = usePlaceOrderMutation();
  const { data: cartData, isLoading: cartLoading } = useGetCart(
    userEmail || ""
  );

  useEffect(() => {
    if (productId && singleProduct) {
      setCheckoutItems([
        {
          id: singleProduct._id,
          name: singleProduct.name,
          discountedPrice: singleProduct.discountedPrice,
          quantity: directQuantity,
          images: singleProduct.images,
        },
      ]);
    } else if (!productId && cartData) {
      setCheckoutItems(
        cartData.items.map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          discountedPrice: item.product.discountedPrice,
          quantity: item.quantity,
          images: item.product.images,
        }))
      );
    }
  }, [productId, singleProduct, cartData, directQuantity]);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      const orderPayload = {
        products: checkoutItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        firstName: data.firstName,
        phone: data.phone,
        address: data.address,
        district: data.district,
        notes: data.notes,
        paymentMethod: paymentMethod,
        status: "pending",
        totalAmount: total,
        shippingFee,
      };

      crateOrder(orderPayload);
      console.log(orderPayload);
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsProcessing(false);
      if (!productId && userEmail) {
        mutate(userEmail, {
          onSuccess: () => {
            localStorage.setItem("cartItems", "[]");
            window.dispatchEvent(new Event("cartUpdated"));
          },
        });
      }
    }
  };

  if (cartLoading && !productId) {
    return <div className="text-center p-4">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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
                <form
                  id="checkoutForm"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">আপনার নাম *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", {
                        required: "নাম প্রদান করুন",
                        minLength: { value: 2, message: "কমপক্ষে ২ অক্ষর" },
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message as string}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">মোবাইল নাম্বার *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        placeholder="+880 1XXXXXXXXX"
                        {...register("phone", {
                          required: "মোবাইল নাম্বার প্রদান করুন",
                          pattern: {
                            value: /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
                            message: "সঠিক মোবাইল নাম্বার প্রদান করুন",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
                    <Textarea
                      id="address"
                      placeholder="বাড়ি/বিল্ডিং, রাস্তা, এলাকা"
                      {...register("address", {
                        required: "ঠিকানা প্রদান করুন",
                        minLength: { value: 5, message: "কমপক্ষে ৫ অক্ষর" },
                      })}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                        {errors.address.message as string}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <Label htmlFor="district">জেলা নির্বাচন করুন *</Label>
                    <select
                      id="district"
                      {...register("district", {
                        required: "জেলা নির্বাচন করুন",
                      })}
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
                    {errors.district && (
                      <p className="text-red-500 text-sm">
                        {errors.district.message as string}
                      </p>
                    )}
                  </div>
                </form>
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
                        src={item.images[0]}
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
                          ৳{item.discountedPrice * item.quantity}
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
                    <span>
                      {shippingFee > 0 ? `৳${shippingFee}` : "নির্বাচন করুন"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span>৳{total}</span>
                  </div>
                </div>

                <Button
                  form="checkoutForm"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing || shippingFee === 0}
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
