import React from "react";
import Image from "next/image";
import { Product } from "@/types/Product.type";
import { getAllProductsBy } from "@/Productsapi/getAllProductsBy";
import ProductCard from "@/app/_components/ProductCard/ProductCard";

interface BrandPageProps {
  params: { id: string };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { id } = await  params;

  // Fetch single brand
  const brandRes = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  const brandJson = await brandRes.json();
  const brand = brandJson.data;

  // If brand doesn't exist
  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Brand not found 😔</p>
      </div>
    );
  }

  
  const products: Product[] = await getAllProductsBy(id,"brand");

  return (
    <div className="container mx-auto p-6">
      {/* Brand Preview */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-40 h-40 relative mb-4">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-wrap ">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available 😔</p>
        )}
      </div>
    </div>
  );
}
