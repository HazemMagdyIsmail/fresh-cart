"use client";

import React, { useEffect, useState } from "react";

import getAllCategories from "@/Categoriesapi/getAllCategories.api";
import { getAllProductsBy } from "@/Productsapi/getAllProductsBy";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Product } from "@/types/Product.type";
import { Category } from "@/types/CartTypes";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  
  useEffect(() => {
    async function loadCategories() {
      let cats = await getAllCategories();
      cats=cats.reverse()
      setCategories(cats);

      if (cats.length > 0) {
        setActiveCategory(cats[0]._id);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    async function loadProducts() {
      const prods = await getAllProductsBy(
        activeCategory,
        "category[in]"
      );
      setProducts(prods);
    }

    loadProducts();
  }, [activeCategory]);

  return (
    <div className=" p-6">

      <div className="flex gap-4 overflow-x-auto pb-4 mb-6 border-b">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat._id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium
              ${
                activeCategory === cat._id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-200"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap ">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products in this category</p>
        )}
      </div>
    </div>
  );
}
