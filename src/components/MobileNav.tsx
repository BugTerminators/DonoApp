import { Bell, Home, Truck, User } from "lucide-react";
import { Button } from "./ui/button";

const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
        {[Home, Truck, Bell, User].map((Icon, idx) => (
          <Button key={idx} variant="ghost" size="icon">
            <Icon className="h-6 w-6" />
          </Button>
        ))}
      </div>
    </div>
  );
  
  export default MobileNav;