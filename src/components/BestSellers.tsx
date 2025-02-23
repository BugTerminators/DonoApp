"use client";
import BestSellerCard from './BestSellerCard';
import React, { useEffect, useState } from 'react';
import { Listing } from '@/backend/src/services/types';
import { fetchListings } from '@/services/apis/listings';

const BestSellers = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedListings = await fetchListings();
            setListings(fetchedListings);
        };
        loadData();
    }, []);
    return (
        <div className="px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Best Seller</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {listings.map((product) => (
                    <BestSellerCard 
                        key={product.id} 
                        product={{
                            ...product,
                            image: product.image_url || '',
                            name: product.title
                        }} 
                    />
                ))}
            </div>
        </div>
    )
}

export default BestSellers