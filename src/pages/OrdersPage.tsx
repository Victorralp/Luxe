import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { type ButtonProps } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const OrdersPage = () => {
  const navigate = useNavigate();

  // Mock orders data - replace with actual data fetching
  const orders = [
    {
      id: "12345",
      date: "March 15, 2024",
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Classic White Sneakers",
          price: 89.99,
          quantity: 1,
          image: "/images/products/sneakers-1.jpg",
        },
        {
          id: 2,
          name: "Leather Crossbody Bag",
          price: 129.99,
          quantity: 1,
          image: "/images/products/bag-1.jpg",
        },
      ],
      total: 219.98,
      shipping: 5.99,
      subtotal: 213.99,
    },
    {
      id: "12344",
      date: "March 10, 2024",
      status: "processing",
      items: [
        {
          id: 3,
          name: "Denim Jacket",
          price: 79.99,
          quantity: 1,
          image: "/images/products/jacket-1.jpg",
        },
      ],
      total: 85.98,
      shipping: 5.99,
      subtotal: 79.99,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      default:
        return "Pending";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-semibold mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium">{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline">Reorder</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage; 