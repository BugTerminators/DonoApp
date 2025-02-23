import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Banner = () => (
  <div className="px-0 md:px-0 mb-6">
    <Card className="bg-[#FDF1E8] rounded-xl overflow-hidden max-w-6xl">
      <CardContent className="p-0">
        <Image 
          src="/images/banner.png" 
          width={800} 
          height={400} 
          alt="Featured Product" 
          className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  </div>
);

export default Banner;
