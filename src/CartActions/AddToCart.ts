
"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(productId: string) {
 try {const token = await getMyToken();
console.log(token)
  if (!token) {
    throw new Error("You should login first!");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token, 
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return data;}
  catch(error){
    return error
  }
}
