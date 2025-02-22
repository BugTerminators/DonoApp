"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BestSellerCard = ({ product }: any) => {
  const handleAlertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Card key={product.id} className="border-none shadow-none hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <Link href={`/product/${product.id}`}>
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 md:h-64 object-cover rounded-xl mb-2" 
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-400">{product.category}</p>
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