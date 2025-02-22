import { Bell, Home, Truck, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/">
      <Button variant="ghost" size="icon" className="p-2">
        <Home className="h-6 w-6" />
      </Button>
    </Link>
    <Link href="/deliveries">
      <Button variant="ghost" size="icon" className="p-2">
        <Truck className="h-6 w-6" />
      </Button>
    </Link>
    <Link href="/notifications">
      <Button variant="ghost" size="icon" className="p-2">
        <Bell className="h-6 w-6" />
      </Button>
    </Link>
    <Link href="/profile">
      <Button variant="ghost" size="icon" className="p-2">
        <User className="h-6 w-6" />
      </Button>
    </Link>
    <UserButton />
      </div>
    </div>
  );
  
  export default MobileNav;