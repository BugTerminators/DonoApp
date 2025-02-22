import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const BestSellerCard = ({ product }) => (
    <Card key={product.id} className="border-none shadow-none hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <img src={product.image} alt={product.name} className="w-full h-48 md:h-64 object-cover rounded-xl mb-2" />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-400">{product.category}</p>
        <Button variant="outline" size="icon" className="mt-2 rounded-full">
          <span className="text-xl">+</span>
        </Button>
        gghhjk
      </CardContent>
    </Card>
  );
  
  export default BestSellerCard;