"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserCart() {
  const token = await getMyToken();

  if (!token) {
    return {
      status: "guest",
      data: {
        products: []
      }
    };
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const data = await res.json();
  
  return data;
}
