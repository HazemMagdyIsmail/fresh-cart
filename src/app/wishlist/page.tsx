"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { getUserWishlist } from "@/WishlistActions/getUserWishlist";
import { removeWishlistItem } from "@/WishlistActions/removeWishlistItem";
import { addToCart } from "@/CartActions/AddToCart";
import { WishlistContext } from "@/context/WIshlistContext";

import { WishlistProduct } from "@/types/WishlistType";
import { CartContext } from '@/context/CartContext';

export default function Wishlist() {
   const { setCartCount } = useContext(CartContext)!
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");
  const [addingId, setAddingId] = useState("");
const {  setWishlistIds } = useContext(WishlistContext)!
  async function getUserWishlistProducts() {
    try {
      const res = await getUserWishlist();
      if (res.status === "success") {
        setProducts(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(id:string) {
  setRemovingId(id);
  try {
    const res = await removeWishlistItem(id);

    if (res.status === "success") {
      toast.success("Removed from wishlist");

       setWishlistIds(prev => prev.filter(pid => pid !== id))
      setProducts((prev) =>
        prev.filter((item:WishlistProduct) => item.id !== id)
      );
      
    } else {
      toast.error("Failed to remove item");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setRemovingId("");
  }
}


  async function handleAddToCart(id:string) {
    setAddingId(id);
    try {
      const res = await addToCart(id);
      if (res.status === "success") {
        toast.success("Added to cart");
        setCartCount(prev => prev + 1)   
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddingId("");
    }
  }

  useEffect(() => {
    getUserWishlistProducts();
  }, []);

 return (
  <>
    {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    ) : (
      <div className="w-full max-w-6xl mx-auto py-10 px-4 md:px-0">
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xl rounded-2xl border border-default text-center">
          <table className="w-full text-sm md:text-base text-left text-body">
            <thead className="bg-neutral-secondary-medium border-b">
              <tr>
                <th className="px-4 md:px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th className="px-4 md:px-6 py-3 font-medium">Product</th>
                <th className="px-4 md:px-6 py-3 font-medium">Price</th>
                <th className="px-4 md:px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center">
                    Your wishlist is empty
                  </td>
                </tr>
              ) : (
                Products.map((prod: WishlistProduct) => (
                  <tr
                    key={prod.id}
                    className="border-b hover:bg-neutral-secondary-medium transition"
                  >
                    {/* Product Image */}
                    <td className="p-2 md:p-4">
                      <img
                        src={prod.imageCover}
                        alt={prod.title}
                        className="w-16 md:w-24 rounded mx-auto"
                      />
                    </td>

                    {/* Product Title */}
<td className="px-2 md:px-6 py-2 md:py-4 font-semibold truncate max-w-[200px] lg:truncate-none lg:whitespace-normal lg:max-w-none">
  {prod.title}
</td>




                    {/* Product Price */}
                    <td className="px-2 md:px-6 py-2 md:py-4 font-semibold">
                      {prod.price}EGP
                    </td>

                    {/* Actions */}
                    <td className="px-2 md:px-6 py-2 md:py-4 flex flex-col md:flex-row gap-2 justify-center items-center">
                      <Button
                        onClick={() => handleAddToCart(prod.id)}
                        disabled={addingId === prod.id}
                        className="bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-300 cursor-pointer w-full md:w-auto"
                      >
                        {addingId === prod.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Add to Cart"
                        )}
                      </Button>

                      <Button
                        onClick={() => handleRemove(prod.id)}
                        disabled={removingId === prod.id}
                        className="text-red-600 border border-red-600 hover:bg-red-50 cursor-pointer w-full md:w-auto"
                      >
                        {removingId === prod.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Remove"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </>
);

}
