// import React from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { 
//   Coins, 
//   Grid3X3, 
//   Mail,
//   Phone,
//   Settings
// } from "lucide-react";
// import { currentUser } from '@clerk/nextjs/server';
// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";

// const ProfilePage = async (req:any, res:any) => {
//   const userStats = {
//     products: 24,
//     tokens: 1250,
//     sales: 156
//   };
//   const { userId } = getAuth(req);
//   if (!userId) return res.status(401).json({ error: "Unauthorized" });
  
//   const clerk = await clerkClient();
//   const userData = await clerk.users.getUser(userId);
//   const user = await currentUser();
 
//   const products = [
//     { id: 1, image: '/api/placeholder/300/300' },
//     { id: 2, image: '/api/placeholder/300/300' },
//     { id: 3, image: '/api/placeholder/300/300' },
//     { id: 4, image: '/api/placeholder/300/300' },
//     { id: 5, image: '/api/placeholder/300/300' },
//     { id: 6, image: '/api/placeholder/300/300' },
//     // Add more products as needed
//   ];

//   return (
//     <div className="max-w-2xl mx-auto bg-white min-h-screen">
//       {/* Profile Header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <h1 className="text-xl font-semibold">{user?.firstName}</h1>
//         <Button variant="ghost" size="icon">
//           <Settings className="h-6 w-6" />
//         </Button>
//       </div>

//       {/* Profile Info Section */}
//       <div className="p-6">
//         <div className="flex items-start gap-8">
//           {/* Profile Picture */}
//           <Avatar className="h-20 w-20">
//             <AvatarImage src={userData.imageUrl} alt="Profile" />
//             <AvatarFallback>JD</AvatarFallback>
//           </Avatar>

//           {/* Stats */}
//           <div className="flex-1">
//             <div className="flex gap-6 mb-4">
//               <div className="text-center">
//                 <div className="font-semibold">{userStats.products}</div>
//                 <div className="text-sm text-gray-500">Products</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold">{userStats.sales}</div>
//                 <div className="text-sm text-gray-500">Sales</div>
//               </div>
//               <div className="text-center flex flex-col items-center">
//                 <div className="font-semibold flex items-center gap-1">
//                   <Coins className="h-4 w-4 text-yellow-500" />
//                   {userStats.tokens}
//                 </div>
//                 <div className="text-sm text-gray-500">Tokens</div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-2">
//               <h2 className="font-semibold">{user?.firstName}</h2>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Mail className="h-4 w-4" />
//                 <span>{userData.primaryEmailAddress?.emailAddress}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Phone className="h-4 w-4" />
//                 <span>{userData.phoneNumbers?.[0]?.phoneNumber || 'No phone number'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid Section */}
//       <div className="border-t">
//         <div className="flex items-center justify-center py-2 border-b">
//           <Button variant="ghost" className="flex items-center gap-2">
//             <Grid3X3 className="h-4 w-4" />
//             <span>PRODUCTS</span>
//           </Button>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-3 gap-1">
//           {products.map((product) => (
//             <Card 
//               key={product.id} 
//               className="relative aspect-square overflow-hidden group border-0 rounded-none"
//             >
//               <img
//                 src={product.image}
//                 alt={`Product ${product.id}`}
//                 className="w-full h-full object-cover"
//               />
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
'use client';

import React from 'react';
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Coins, 
  Grid3X3, 
  Mail,
  Phone
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useUser();

  const userStats = {
    products: 24,
    tokens: 1250,
    sales: 156
  };

  const products = [
    { id: 1, image: '/api/placeholder/300/300' },
    { id: 2, image: '/api/placeholder/300/300' },
    { id: 3, image: '/api/placeholder/300/300' },
    { id: 4, image: '/api/placeholder/300/300' },
    { id: 5, image: '/api/placeholder/300/300' },
    { id: 6, image: '/api/placeholder/300/300' },
  ];

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.firstName && !user?.lastName) return 'U';
    return `${(user?.firstName?.[0] || '')}${(user?.lastName?.[0] || '')}`;
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">{user.fullName}</h1>
        <Button variant="ghost" size="icon">
          
        </Button>
      </div>

      {/* Profile Info Section */}
      <div className="p-6">
        <div className="flex items-start gap-8">
          {/* Profile Picture */}
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>

          {/* Stats */}
          <div className="flex-1">
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="font-semibold">{userStats.products}</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{userStats.sales}</div>
                <div className="text-sm text-gray-500">Sales</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="font-semibold flex items-center gap-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  {userStats.tokens}
                </div>
                <div className="text-sm text-gray-500">Tokens</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h2 className="font-semibold">{user.fullName}</h2>
              {user.primaryEmailAddress && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.primaryEmailAddress.emailAddress}</span>
                </div>
              )}
              {user.primaryPhoneNumber && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{user.primaryPhoneNumber.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="border-t">
        <div className="flex items-center justify-center py-2 border-b">
          <Button variant="ghost" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            <span>PRODUCTS</span>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-1">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="relative aspect-square overflow-hidden group border-0 rounded-none"
            >
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-1 text-white">
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;