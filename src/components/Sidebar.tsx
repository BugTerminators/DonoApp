import { Button } from "@/components/ui/button";
import { Home, Truck, Bell, User } from "lucide-react";

const Sidebar = () => (
  <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white border-r flex-col items-center py-8 gap-8">
    {[Home, Truck, Bell, User].map((Icon, idx) => (
      <Button key={idx} variant="ghost" size="icon" className="p-2">
        <Icon className="h-6 w-6" />
      </Button>
    ))}
  </div>
);

export default Sidebar;