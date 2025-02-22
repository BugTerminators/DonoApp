import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Home, Truck, User, Settings } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileNav from '@/components/MobileNav';
import SearchBar from '@/components/SearchBar';
import Banner from '@/components/Banner';
import BestSellerCard from '@/components/BestSellerCard';

const EcommercePage = () => {
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
     {/*Desktop Navigation */} 
      {/* <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white border-r flex-col items-center py-8 gap-8">
        <Button variant="ghost" size="icon" className="p-2">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="p-2">
          <Truck className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="p-2">
          <Bell className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="p-2">
          <User className="h-6 w-6" />
        </Button>
      </div> */}
    
     <Sidebar/>
      <div className="md:ml-20">
        <div className="max-w-7xl mx-auto">
          {/*Status Bar - Mobile Only */}
          <div className="p-4 flex justify-between items-center md:hidden">
            <span className="text-sm">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-black rounded-full" />
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
          </div>
          

          {/* Welcome Section */}
          <div className="px-4 md:px-8 pt-2 pb-4 md:pt-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back,</h1>
            <p className="text-gray-400 mb-4">Find your favourite product here.</p>

            {/* Search Bar */}
            {/* <div className="flex items-center gap-2 max-w-2xl">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search anything...."
                  className="w-full pl-10 py-2 bg-gray-50 rounded-xl"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div> 
              
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900 text-white rounded-xl p-2"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>*/}
            <SearchBar/>
          </div>

          {/* Black Friday Banner */}
          {/* <div className="px-4 md:px-8 mb-6">
            <Card className="bg-[#FDF1E8] rounded-xl overflow-hidden max-w-6xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <img
                      src="/api/placeholder/400/200"
                      alt="Black Friday Sale"
                      className="w-full h-32 md:h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}

          <Banner/>

          {/* Best Sellers Section */}
          <div className="px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Best Seller</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {bestSellers.map((product) => (
                // <Card key={product.id} className="border-none shadow-none hover:shadow-lg transition-shadow">
                //   <CardContent className="p-0">
                //     <img
                //       src={product.image}
                //       alt={product.name}
                //       className="w-full h-48 md:h-64 object-cover rounded-xl mb-2"
                //     />
                //     <h3 className="font-semibold">{product.name}</h3>
                //     <p className="text-gray-400">{product.category}</p>
                //     <Button
                //       variant="outline"
                //       size="icon"
                //       className="mt-2 rounded-full"
                //     >
                //       <span className="text-xl">+</span>
                //     </Button>
                //   </CardContent>
                // </Card>
                <BestSellerCard product={product}/>
              ))}
            </div>
          </div>

          {/* Bottom Navigation - Mobile Only */}
          {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
            <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
              <Button variant="ghost" size="icon">
                <Home className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Truck className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div> */}
          <MobileNav/>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;