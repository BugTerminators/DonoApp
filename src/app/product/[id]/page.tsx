"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { usePathname } from 'next/navigation';

const ProductDetail = () => {
    const productId = usePathname().slice(9);
    console.log(productId);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('S');

    const images = [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
    ];

    const sizes = ['S', 'M', 'L', 'XL'];

    return (
        <div className="mx-auto bg-white min-h-screen pb-20 md:pb-0 md:max-w-7xl">
            {/* Status Bar - Mobile Only */}
            <div className="p-4 flex justify-between items-center md:hidden">
                <span className="text-sm">9:41</span>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-black rounded-full" />
                    <div className="w-4 h-4 bg-black rounded-full" />
                </div>
            </div>

            {/* Header */}
            <div className="px-4 py-2 flex justify-between items-center md:py-6 md:px-8">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold md:text-2xl">Detail Product</h1>
                <Button variant="ghost" size="icon">
                    <Heart className="h-6 w-6" />
                </Button>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-12 md:px-8 md:py-8">
                {/* Left Column - Images */}
                <div className="md:sticky md:top-8">
                    {/* Main Image */}
                    <div className="px-4 mb-4 md:px-0">
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src={images[selectedImage]}
                                alt="Product"
                                className="w-full h-72 md:h-[600px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="px-4 mb-6 md:px-0">
                        <div className="flex gap-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-1 rounded-xl overflow-hidden ${selectedImage === index ? 'ring-2 ring-black' : ''
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-20 md:h-24 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="px-4 md:px-0 md:max-w-xl">
                    <h2 className="text-3xl font-bold mb-1 md:text-4xl">Azalea Sweate:</h2>
                    <h2 className="text-xl font-bold mb-1">Product Id: {productId}</h2>
                    <p className="text-gray-400 mb-4 md:text-lg">Sweaters</p>

                    {/* Ratings and Stats */}
                    <div className="flex items-center gap-4 mb-8 md:gap-8">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">4.8</span>
                            <span className="text-gray-400">(200 Review)</span>
                        </div>
                        <div className="text-gray-400">
                            <span className="font-semibold text-black">250</span> Item Sold
                        </div>
                        <div className="text-gray-400">
                            <span className="font-semibold text-black">115</span> Stock
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6 md:mb-8">
                        <h3 className="text-xl font-bold mb-4 md:text-2xl">Size</h3>
                        <div className="flex gap-3">
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    className={`rounded-full w-12 h-12 md:w-14 md:h-14 ${selectedSize === size ? 'bg-black text-white' : 'border-gray-200'
                                        }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8 md:mb-12">
                        <h3 className="text-xl font-bold mb-2 md:text-2xl">Description</h3>
                        <p className="text-gray-400 leading-relaxed md:text-lg">
                            This blend of cotton and recycled polyester gives the ReNew Sweatshirt a soft, plush inside and a smooth jersey exterior. Plus, it features a modern design that makes it perfect for both casual and semi-formal occasions.
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <Button className="w-full py-6 text-lg bg-black hover:bg-gray-800 rounded-full md:text-xl">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;