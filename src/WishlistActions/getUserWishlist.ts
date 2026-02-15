"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserWishlist() {
  const token = await getMyToken();
console.log(token)
  if (!token) {
     return { status: "guest", data: [] }
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      token, 
    },
    
  });

  const data = await res.json();
  console.log(data)
  return data;
}
