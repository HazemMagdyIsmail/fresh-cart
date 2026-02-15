"use server";

import { CheckoutFormValues, ShippingAddress } from "@/app/checkout/[id]/page";
import { getMyToken } from "@/utilities/getMyToken";

export async function onlineCheckout(cartId: string, data: ShippingAddress) {
  const token = await getMyToken();
if(!token){
    return
}
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.Base_URL}`,
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
