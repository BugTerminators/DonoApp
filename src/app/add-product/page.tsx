import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const AddListing = () => {
    const categories = [
        { id: 1, name: 'Food', image: '/images/food.png' },
        { id: 2, name: 'Clothes', image: '/images/clothes.png' },
        { id: 3, name: 'Books', image: '/images/books.png' },
        { id: 4, name: 'Utensils', image: '/images/utensils.png' },
        { id: 5, name: 'Electronics', image: '/images/electronics.png' },
        { id: 6, name: 'Stationary', image: '/images/stationary.png' },
    ];

    return (
        <div className="mx-auto bg-white min-h-screen pb-20 md:pb-0 md:max-w-7xl">
            {/* Status Bar - Mobile Only */}
            

            {/* Header */}
            <div className="px-4 py-2 md:py-6 md:px-8 flex items-center mb-6">
                <Link href="/">
                <Button variant="ghost" size="icon" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                </Link>
                <h3 className="text-2xl md:text-3xl font-semibold">Add Listing</h3>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-12 md:px-8">
                {/* Details Section */}
                <div className="px-4 md:px-0 mb-8 md:mb-0">
                    <h2 className="md:text-3xl font-bold mb-4 md:mb-6">Details</h2>

                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
                            <Input
                                placeholder="Product Name"
                                className="border-none bg-transparent text-md md:text-xl placeholder:text-gray-500"
                            />
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
                            <Textarea
                                placeholder="Product Description"
                                className="border-none bg-transparent text-md md:text-xl placeholder:text-gray-500 min-h-[120px] md:min-h-[200px] resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Section */}
                <div className="px-4 md:px-0">
                    <h2 className="md:text-3xl font-bold mb-4 md:mb-6">Category</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="relative overflow-hidden rounded-2xl aspect-[4/3] group transition-transform hover:scale-105"
                            >
                                <Image
                                    src={category.image}
                                    width={500}
                                    height={500}
                                    alt={category.name}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <span className="text-white text-xl md:text-2xl font-semibold">
                                        {category.name}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Button - Fixed at bottom on mobile, within content on desktop */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:relative md:mt-12 md:px-8 md:border-t-0">
                <Button className="w-full py-6 text-lg md:text-xl bg-black hover:bg-gray-800 rounded-full">
                    Add Listing
                </Button>
            </div>
        </div>
    );
};

export default AddListing;