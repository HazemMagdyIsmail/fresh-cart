"use server";

import { CheckoutFormValues, ShippingAddress } from "@/app/checkout/[id]/page";
import { getMyToken } from "@/utilities/getMyToken";

export async function cashCheckout(cartId: string, data: ShippingAddress) {
  const token = await getMyToken();
if(!token){
    return
}
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress: data,
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
