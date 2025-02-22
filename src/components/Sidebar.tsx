import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Home, Truck, Bell, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
  <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white border-r flex-col items-center py-8 gap-8">
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
  </div>)
  };

export default Sidebar;