"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
console.log(token)
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token, 
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  console.log(data)
  return data;
}
