"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { createOrder } from "@/services/apis/orders";

const getCategory = (category: number) => {
  switch (category) {
    case 1:
      return "Food";
    case 2:
      return "Clothes";
    case 3:
      return "Books";
    case 4:
      return "Utensils";
    case 5:
      return "Electronics";
    default:
      return "Stationary";
  }
}

interface Product {
  id: number;
  image: string;
  name: string;
  title: string;
  category: number;
}

const BestSellerCard = ({ product }: { product: Product }) => {
  const { user } = useUser();

  const handleAlertClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (user && user.primaryEmailAddress) {
      const userEmail = user.primaryEmailAddress.emailAddress;
      const productId = product.id;

      const orderData = {
        user_email: userEmail,
        listing_id: productId,
        status: 0,
        requested_at: new Date().toISOString(),
        approved_at: null,
      };

      try {
        console.log("Creating order:", orderData);
        const response = await createOrder(orderData);
        console.log("Order created successfully:", response);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      console.warn("User not found or missing email address");
    }

    console.log("Product:", product);
  };

  return (
    <div>
      <Card key={product.id} className="border-none shadow-none hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <Link href={`/product/${product.id}`}>
            <div>
              <Image
                src={"/images/placeholder.png"}
                width={200}
                height={200}
                alt={product.name || "Product"}
                className="object-cover rounded-xl mb-2"
              />
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-400">{getCategory(product.category)}</p>
            </div>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger
              onClick={handleAlertClick}
              className="rounded-md p-2 bg-black text-white hover:bg-gray-50 hover:text-black"
            >
              Get Now
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>The seller has been notified</AlertDialogTitle>
                <AlertDialogDescription>
                  You will receive the pickup location and time shortly once the seller confirms the order.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Done</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestSellerCard;