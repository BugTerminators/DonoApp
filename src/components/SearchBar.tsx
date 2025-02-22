// "use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
// import { useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

const SearchBar = () => {
  // const { isSignedIn, user } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   // If the user is not authenticated, redirect to the login page
  //   if (!isSignedIn) {
  //     router.push("/onboarding");
  //   }
  // }, [isSignedIn, router]);

  return (
    <div className="flex items-center gap-2 max-w-2xl">
      <div className="flex-1 relative">
        <Input type="text" placeholder="Search anything..." className="w-full pl-10 py-2 bg-gray-50 rounded-xl" />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <Button variant="outline" size="icon" className="bg-gray-900 text-white rounded-xl p-2">
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;