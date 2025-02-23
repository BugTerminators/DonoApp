// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Check, X } from "lucide-react"

// interface User {
//   name: string
//   email: string
//   date: string
//   avatarColor: string
//   initials: string
// }

// const users: User[] = [
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   {
//     name: "Hiya Sarkar",
//     email: "sarkarhiya53@gmail.com",
//     date: "Feb 20",
//     avatarColor: "bg-[#f6e1a4]",
//     initials: "HS",
//   },
//   {
//     name: "Sree Gopal Saha",
//     email: "sreegopal0101@gmail.com",
//     date: "Feb 18",
//     avatarColor: "bg-[#f6d6a4]",
//     initials: "SS",
//   },
//   // Add more users as needed
// ]

// export default function UserApprovalList() {
//   return (
//     <div className="max-h-screen md:max-w-[calc(50vw)] bg-[#fff] text-zinc-900">
//       <div className="px-2 space-y-1">
//         {users.map((user, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between rounded-sm p-3 transition-colors hover:bg-zinc-100"
//           >
//             <div className="flex items-center gap-3">
//               <Avatar className={`h-8 w-8 ${user.avatarColor}`}>
//                 <AvatarFallback className="text-zinc-900">{user.initials}</AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
//                 <span className="font-medium">{user.name}</span>
//                 <span className="text-sm text-zinc-500">{user.email}</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-500/10">
//                 <Check className="h-4 w-4 mr-1.5" />
//                 <span className="hidden md:block">Approve</span>
//               </Button>
//               <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-500/10">
//                 <X className="h-4 w-4 mr-1.5" />
//                 <span className="hidden md:block">Decline</span>
//               </Button>
//               <span className="ml-4 hidden text-sm text-zinc-500 sm:inline">{user.date}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { fetchOrders } from "@/services/apis/orders";
import { fetchUsers } from "@/services/apis/users";
import { fetchListings } from "@/services/apis/listings"; // Fetch listings
import { useUser } from "@clerk/nextjs";

interface Request {
  id: number;
  user_email: string;
  listing_id: number;
  status: number;
  requested_at: string;
  approved_at: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
}

interface Listing {
  id: number;
  title: string;
}

export default function UserApprovalList() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [listings, setListings] = useState<Record<number, string>>({});
  const { user } = useUser();
  useEffect(() => {
    async function loadData() {
      try {
        console.log("🔄 Loading data...");
        console.log("User:", user);
        if (user && user.primaryEmailAddress) {
          const requestsData = await fetchOrders(user?.primaryEmailAddress?.emailAddress);
          setRequests(requestsData);

          const usersData = await fetchUsers();
          const userMap: Record<number, User> = {};
          usersData.forEach((user: User) => {
            userMap[user.id] = user;
          });
          setUsers(userMap);

          const listingsData = await fetchListings(); // Fetch listings
          const listingMap: Record<number, string> = {};
          listingsData.forEach((listing: Listing) => {
            listingMap[listing.id] = listing.title;
          });
          setListings(listingMap);

          console.log("✅ Data loaded successfully.");
        }
      } catch (error) {
        console.error("❌ Error loading data:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="max-h-screen md:max-w-[calc(50vw)] bg-white text-zinc-900">
      <div className="px-2 space-y-1">
        {requests.map((req) => {
          const user = users[0] || {
            name: "Unknown User",
            email: "",
            initials: "U",
            avatarColor: "bg-gray-300",
          };

          const listingTitle = listings[req.listing_id] || "Unknown Listing";

          return (
            <div
              key={req.id}
              className="flex items-center justify-between rounded-sm p-3 transition-colors hover:bg-zinc-100"
            >
              <div className="flex items-center gap-3">
                <Avatar className={`h-8 w-8 ${user.avatarColor}`}>
                  <AvatarFallback className="text-zinc-900">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className="font-medium">{req.user_email}</span>
                  <span className="text-sm text-zinc-500">{user.email}</span>
                  <span className="text-sm text-blue-600">({listingTitle})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-500 hover:text-green-700 hover:bg-green-500/10"
                >
                  <Check className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:block">Approve</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:block">Decline</span>
                </Button>
                <span className="ml-4 hidden text-sm text-zinc-500 sm:inline">
                  {new Date(req.requested_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
