"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Listing } from '@/backend/src/services/types';
import Image from 'next/image';
import { fetchProductById } from '@/services/apis/listings';

const ProductDetail = () => {
    const productId = usePathname().slice(9);
    const [product, setProduct] = useState<Listing | null>(null);

    useEffect(() => {
        // const fetchProduct = async () => {
        //     try {
        //         const response = await fetch(`/api/listings/${productId}`);
        //         const data = await response.json();
        //         setProduct(data);
        //     } catch (error) {
        //         console.error("Error fetching product details:", error);
        //     }
        // };
        const loadData = async () => {
            const fetchProduct = await fetchProductById(productId);
            setProduct(fetchProduct);
        };
        loadData();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto bg-white min-h-screen pb-20 md:pb-0 md:max-w-7xl">
            {/* Header */}
            <div className="px-4 py-2 flex justify-between items-center md:py-6 md:px-8">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-semibold md:text-2xl">{product.title}</h1>
                <Button variant="ghost" size="icon">
                    <Heart className="h-6 w-6" />
                </Button>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-12 md:px-8 md:py-8">
                {/* Left Column - Image */}
                <div className="md:sticky md:top-8">
                    <div className="px-4 mb-4 md:px-0">
                        <div className="rounded-2xl overflow-hidden">
                            <Image
                                src={product.image_url ? product.image_url : "/placeholder.jpg"}
                                width={500}
                                height={500}
                                alt={product.title}
                                className="w-full h-72 md:h-[600px] object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="px-4 md:px-0 md:max-w-xl">
                    <h2 className="text-xl font-bold mb-1">Product Id: {product.id}</h2>
                    <p className="text-gray-400 mb-4 md:text-lg">{product.description}</p>
                    <p className="text-gray-400 mb-4 md:text-lg">Quantity: {product.quantity}</p>
                    <p className="text-gray-400 mb-4 md:text-lg">Size: {product.size}</p>

                    {/* Get Item Now Button with Alert Dialog */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full py-6 text-lg bg-black hover:bg-gray-800 rounded-full md:text-xl">
                                Get Item Now
                            </Button>
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
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
