
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const BestSellerCard = ({ product }: any) => (
  <div className="">
   
    <Card key={product.id} className="border-none shadow-none hover:shadow-lg transition-shadow">
    <Link href={`/product/${product.id}`}>
      <CardContent className="p-4">
        <img src={product.image} alt={product.name} className="w-full h-48 md:h-64 object-cover rounded-xl mb-2" />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-400">{product.category}</p>
        
        <Button variant="outline" className="rounded-md hover:bg-black hover:text-white">
          <span className="text-md">Get Now</span>
        </Button>
        
      </CardContent>
      </Link>
    </Card>
  
  </div>)
  
  export default BestSellerCard;