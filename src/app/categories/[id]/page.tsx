import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getAllProductsBy } from "@/Productsapi/getAllProductsBy";
import { Product } from "@/types/Product.type";
import Image from "next/image";
interface Props {
  params: { id: string };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params; // ✅ no await

  // fetch single category
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  );

  const json = await res.json(); 
  const currentCategory = json.data; 

  // fetch products by category
  const products = await getAllProductsBy(id, "category[in]");

  return (
    <div className="p-6">

      {/* CATEGORY TITLE */}
      {currentCategory && (
  <>
    <div className="relative w-full h-64 mb-6 flex justify-center">
      <Image
        src={currentCategory.image}
        alt={currentCategory.name}
        width={300}
        height={300}
        className="object-contain rounded"
        priority
      />
    </div>

    <h1 className="text-3xl font-bold mb-6 text-center">
      {currentCategory.name}
    </h1>
  </>
)}


      {/* PRODUCTS */}
      <div className="flex flex-wrap ">
        {products.length ? (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>

    </div>
  );
}
