import { Product } from "@/types/Product.type";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import AddToCartBtn from "../AddtoCartbtn/AddToCartBtn";
import AddToWishlistBtn from "../AddtoWishlistbtn/AddToWishlistBtn";
export default function ProductCard({ product }: { product: Product }) {
  return <>
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" >
  <div className="p-4">
       <Card
  className="
    w-full rounded-2xl border-0
    shadow-md
    transition-all duration-300
    hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
  "
>
      
      
   <Link href={`/products/${product.id}`}>   
   <CardContent className="py-1 px-3 flex justify-center">
        <div className="relative ">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={300}
              height={300}
            className="object-contain"
          />
        </div>
      </CardContent>

      {/* Info */}
      <CardHeader className="pt-0 px-4  ">
        <CardDescription className="text-green-600 text-sm">
          {product.category.name}
        </CardDescription>
        <CardTitle className="text-sm font-medium line-clamp-1">
          {product.title}
        </CardTitle>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="px-4 pb-1 flex justify-between items-center">
        <span className="font-semibold">{product.price} EGP</span>
        <span className="flex items-center gap-1 text-sm text-yellow-400 ">
          <i className="fa-solid fa-star"></i>
          {product.ratingsAverage}
        </span>
      </CardFooter>
      </Link>
      <div className="px-2 flex gap-1 ">
       <AddToCartBtn id={product.id} />
       <AddToWishlistBtn id={product.id} />
      
      </div>

    </Card>
</div>
    </div>
  </>
}
