"use server";

import { getUserId } from "@/utilities/getMyUserId";

export async function getUserOrder() {

const id= await getUserId()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
 


    const payload = await res.json();
    return payload;
  } 

