import React from 'react';
import Sidebar from "@/components/Sidebar";
import MobileNav from '@/components/MobileNav';
import SearchBar from '@/components/SearchBar';
import Banner from '@/components/Banner';
import BestSellerCard from '@/components/BestSellerCard';
import { currentUser } from '@clerk/nextjs/server'

async function EcommercePage() {
  const user = await currentUser()

  const bestSellers = [
    {
      id: 1,
      name: 'Olive Shorts',
      category: 'Bottoms',
      image: '/api/placeholder/300/400'
    },
    {
      id: 2,
      name: 'Azalea Sweater',
      category: 'Sweaters',
      image: '/api/placeholder/300/400'
    },
    {
      id: 3,
      name: 'Denim Jacket',
      category: 'Outerwear',
      image: '/api/placeholder/300/400'
    },
    {
      id: 4,
      name: 'Shirt',
      category: 'Outerwear',
      image: '/api/placeholder/300/400'
    },
    {
      id: 5,
      name: 'Shoe',
      category: 'Footwear',
      image: '/api/placeholder/300/400'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="md:ml-20">
        <div className="max-w-7xl mx-auto">
          {/*Status Bar - Mobile Only */}
          
          

          {/* Welcome Section */}
          <div className="px-4 md:px-8 pt-2 pb-4 md:pt-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back, {user?.firstName}</h1>
            <p className="text-gray-400 mb-4">Find your favourite product here.</p>
            
            {/* Search Bar */}
            <SearchBar/>
          </div>

          <Banner/>

          {/* Best Sellers Section */}
          <div className="px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Best Seller</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {bestSellers.map((product, index) => (
                <BestSellerCard key={index} product={product}/>
              ))}
            </div>
          </div>

          {/* Bottom Navigation - Mobile Only */}
          <MobileNav/>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;