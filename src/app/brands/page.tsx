
import Link from "next/link";

import React from "react";
 import Image from "next/image";
import { Brand } from "@/types/Brand.type";
export default async function Brands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const json = await res.json();
  const brands = json.data;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand: Brand) => (
          <div
            key={brand._id}
            className="relative group overflow-hidden rounded-lg shadow-md bg-white"
          >
            {/* Brand Image */}
          

<Image
  src={brand.image}       // your image URL
  alt={brand.name}        // alt text
  width={400}             // set width
  height={128}            // set height
  className="object-contain p-4 bg-white w-full h-32"
/>


            {/* Hover overlay with name link */}
            <Link
              href={`/brands/${brand._id}`}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {brand.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
