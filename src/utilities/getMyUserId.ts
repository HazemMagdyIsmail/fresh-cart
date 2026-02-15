"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserId() {
  const token = await getMyToken();

  if (!token) {
    return
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token, 
    }
  });

  const data = await res.json();
  console.log(data)
  return data.decoded.id;
}
