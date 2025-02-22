import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Banner = () => (
  <div className="px-4 md:px-8 mb-6">
    <Card className="bg-[#FDF1E8] rounded-xl overflow-hidden max-w-6xl">
      <CardContent className="p-4 md:p-6">
        <Image src="/api/placeholder/400/200" width={500} height={500} alt="Featured Product" className="w-full h-32 md:h-48 object-cover rounded-lg" />
      </CardContent>
    </Card>
  </div>
);

export default Banner;