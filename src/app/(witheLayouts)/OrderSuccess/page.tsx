import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Phone, Mail } from "lucide-react";
import Link from "next/link";

const OrderSuccess = () => {
  const orderNumber = "BS" + Math.floor(Math.random() * 1000000);
  const estimatedDelivery = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. Weve received your order and will process
            it soon.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Number:</span>
                  <span className="font-bold text-primary">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span className="font-bold">{estimatedDelivery}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Method:</span>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <Package className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Order Processing</div>
                    <div className="text-sm text-muted-foreground">
                      Well prepare your order for shipment
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <Truck className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Order Shipped</div>
                    <div className="text-sm text-muted-foreground">
                      Youll receive tracking information via SMS/Email
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Order Delivered</div>
                    <div className="text-sm text-muted-foreground">
                      Your order will be delivered to your address
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call us: +880 1234-567890</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email: support@kenobuy.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/track-order/${orderNumber}`}>
                <Button variant="outline" className="w-full sm:w-auto">
                  Track Your Order
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full sm:w-auto">Continue Shopping</Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Well send order updates to your email and phone number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
