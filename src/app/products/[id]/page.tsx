import { getSpecificProduct } from "@/Productsapi/getSpecificProduct.api";

import Image from "next/image";

import DetailsAddToCartBtn from "@/app/_components/AddtoCartbtn/DetailsAddToCartBtn";
import AddToWishlistBtn from "@/app/_components/AddtoWishlistbtn/AddToWishlistBtn";
import { getAllProductsBy } from "@/Productsapi/getAllProductsBy";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Product } from "@/types/Product.type";
export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const{ id } = await params;

  const product = await getSpecificProduct(id);
  console.log(product)
  const relevantProducts = await getAllProductsBy( product.category._id,  "category[in]" );
  console.log(relevantProducts)

  const filteredProducts = relevantProducts.filter(
    (p: Product) => p.id !== product.id
  );
 return (
    <div className="container w-[80%] mx-auto mt-10">
      {/* MAIN PRODUCT DETAILS */}
      <div className="flex flex-wrap lg:flex-nowrap lg:items-center">
        <div className="w-full lg:w-1/4">
          <Image
            src={product.imageCover.startsWith("http") ? product.imageCover : `https://ecommerce.routemisr.com${product.imageCover}`}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg w-full"
            priority
          />
        </div>

        <div className="w-full lg:w-3/4 pb-6 relative">
          <div className="lg:p-6">
            <h1 className="text-2xl font-semibold pb-4">{product.title}</h1>

            <p className="text-gray-400 pb-5">{product.description}</p>

            <p className="text-sm text-gray-500 pb-1">
              Brand:{" "}
              <span className="font-medium text-foreground">
                {product.brand.name}
              </span>
            </p>

            <p className="text-sm text-gray-500 pb-2">
              Category:{" "}
              <span className="font-medium text-foreground">
                {product.category.name}
              </span>
            </p>

            <div className="flex justify-between">
              <div className="font-bold text-gray-500">{product.price} EGP</div>
              <div className="flex items-center gap-2 pb-6">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="font-medium">{product.ratingsAverage}</span>
                <span className="text-muted-foreground">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>
            </div>

            <DetailsAddToCartBtn id={id} />
          </div>

          <div className="absolute top-10 right-0">
            <AddToWishlistBtn id={product.id} />
          </div>
        </div>
      </div>

      {/* RELEVANT PRODUCTS */}
      {filteredProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="flex flex-wrap ">
            {filteredProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}