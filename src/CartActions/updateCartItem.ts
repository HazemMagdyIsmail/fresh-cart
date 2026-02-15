"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function updateCartItem(productId:string,count:string){
     const token = await getMyToken();
    console.log(token)
      if (!token) {
        throw new Error("No token found");
      }
    
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token, 
        },
        body: JSON.stringify({ count }),
      });
    
      const data = await res.json();
      return data;
}