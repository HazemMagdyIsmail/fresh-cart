"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function removeWishlistItem(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token, 
    }
  });

  const data = await res.json();
  console.log(data)
  return data;
}
