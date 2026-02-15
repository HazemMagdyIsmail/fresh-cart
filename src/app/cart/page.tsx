"use client";

import  { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserCart } from "@/CartActions/getUserCart";
import { Button } from "@/components/ui/button";
import { removeCartItem } from "@/CartActions/removeCartItem";
import { updateCartItem } from "@/CartActions/updateCartItem";
import { clearCart } from "@/CartActions/clearCart";
import { CartContext } from "@/context/CartContext";
import { CartProduct } from "@/types/CartTypes";
import Link from "next/link";

export default function Cart() {
  const [Products, setProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");

  const [removingId, setRemovingId] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);
  const {setCartCount } = useContext(CartContext)!
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  async function getUserCartProducts() {
    try {
      const res = await getUserCart();
      if (res.status === "success") {
        console.log(res)
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice)
        setCartId(res.cartId);
      } else {
        toast.error("Failed to fetch cart items");
      }
    } catch {
      toast.error("Something went wrong while fetching the cart");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(id: string,count:number,totPrice:number) {
    setRemovingId(id);
    setIsRemoving(true);
    try {
      const res = await removeCartItem(id);
      if (res.status === "success") {
        toast.success("Item removed from cart");
        setProducts(res.data.products);
        setCartCount(prev=>prev-count)
        setTotalPrice(prev=>prev-totPrice)
      } else {
        toast.error("Failed to remove item");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRemovingId("");
      setIsRemoving(false);
    }
  }

  async function clearProductCart() {
    try {
      const res = await clearCart();
      if (res.message === "success") {
        toast.success("Cart cleared successfully");
        setProducts([]);
        setCartCount(0)
        setTotalPrice(0)
      } else {
        toast.error("Failed to clear cart");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  async function updateCartProduct(productId: string, count: number,sign:boolean,Price:number) {
    try {
      setIsUpdating(true);
      setUpdatingId(productId);

      const res = await updateCartItem(productId, `${count}`);

      if (res.status === "success") {
        setProducts(res.data.products);
        if(sign) {setCartCount(prev=>prev+1)
          setTotalPrice(prev=>prev+Price)
        }
          else {setCartCount(prev=>prev-1)
            setTotalPrice(prev=>prev-Price)
          }
      } else {
        toast.error("Failed to update Qty");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
      setUpdatingId("");
    }
  }

  useEffect(() => {
    getUserCartProducts();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 md:px-0">
      {/* Total & Clear Cart */}
        {Products.length > 0 && (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      {/* Total Price */}
      <div className="text-center md:text-right ">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Total: <span className="text-emerald-600">{TotalPrice} EGP</span>
        </h2>
      </div>

      {/* Clear Cart Button */}
      <Button
        onClick={clearProductCart}
        disabled={isUpdating}
        className="bg-red-500 text-white hover:bg-red-400 px-6 py-2 md:ml-6"
      >
        Clear Cart
      </Button>
    </div>
  )}


      {/* Cart Table */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="w-full text-sm md:text-base text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-4"></th>
              <th className="p-2 md:p-4">Product</th>
              <th className="p-2 md:p-4">Qty</th>
              <th className="p-2 md:p-4">Price</th>
              <th className="p-2 md:p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {Products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Your cart is empty
                </td>
              </tr>
            ) : (
              Products.map((prod: CartProduct) => (
                <tr
                  key={prod.product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="p-2 md:p-4">
                    <img
                      src={prod.product.imageCover}
                      className="w-16 md:w-24 rounded"
                      alt={prod.product.title}
                    />
                  </td>

                  {/* Title */}
                  <td className="px-2 md:px-6 py-2 md:py-4 font-semibold truncate max-w-[100px] md:max-w-[150px]  lg:whitespace-normal lg:max-w-[400px]">
                    {prod.product.title}
                  </td>
 

                  {/* Quantity */}
                  <td className="p-2 md:p-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartProduct(
                            prod.product.id,
                            prod.count - 1,
                            false,
                            prod.price
                          )
                        }
                        disabled={isUpdating || isRemoving}
                        className="border rounded-full w-6 h-6 md:w-8 md:h-8 disabled:opacity-50 cursor-pointer"
                      >
                        -
                      </button>

                      <span className="w-6 text-center md:w-8">
                        {updatingId === prod.product.id && isUpdating ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          prod.count
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateCartProduct(
                            prod.product.id,
                            prod.count + 1,
                            true,
                            prod.price
                          )
                        }
                        disabled={isUpdating || isRemoving}
                        className="border rounded-full w-6 h-6 md:w-8 md:h-8 disabled:opacity-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-2 md:p-4 font-semibold">
                    {prod.price * prod.count} <span className="text-sm">EGP</span>
                  </td>

                  {/* Remove */}
                  <td className="p-2 md:p-4">
                    <Button
                      onClick={() =>
                        handleRemove(
                          prod.product.id,
                          prod.count,
                          prod.price * prod.count
                        )
                      }
                      disabled={isUpdating || isRemoving}
                      className="text-red-600 border border-red-600 hover:bg-red-50 w-full md:w-auto"
                    >
                      {removingId === prod.product.id ? "Removing..." : "Remove"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Checkout */}
      {Products.length > 0 && (
        <div className="flex justify-end mt-6">
          <Link href={`/checkout/${cartId}`}>
            <Button className="bg-green-600 text-white hover:bg-green-500 px-6 py-2">
              Check Out
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}