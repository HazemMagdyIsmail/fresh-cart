"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";
import { cashCheckout } from "@/CheckoutActions/cashCheckout";
import { onlineCheckout } from "@/CheckoutActions/onlineCheckout";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

// Zod schema for checkout form
const checkoutSchema = z.object({
  details: z.string().min(3, "Please enter address details"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  paymentMethod: z.enum(["cod", "online"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export default function CheckoutForm() {
const cartId =  useParams().id as string;
const router = useRouter();
const {setCartCount } = useContext(CartContext)!
console.log(cartId)

 

  const {
    control,
    handleSubmit,
    formState: { touchedFields, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cod",
    },
  });

  const showError = (name: keyof CheckoutFormValues, error?: any) =>
    touchedFields[name] && error;


async function onSubmit(data: CheckoutFormValues) {
  const shippingAddress = {
    details: data.details,
    phone: data.phone,
    city: data.city,
  };

  try {
    let res: { status: string; message: string; session: { url: string; cancel_url: string; }; };

    if (data.paymentMethod === "cod") {
      res = await cashCheckout(cartId, shippingAddress);
       if (res?.status === "success") {
  toast.success(res.message || "Order completed successfully!");
setCartCount(0)
  setTimeout(() => {
    router.push("/allorders");
  }, 1500);
}
 else {
      toast.error(res?.message || "Checkout failed");

       router.push("/cart");

    }




    } else {


      res = await onlineCheckout(cartId, shippingAddress);
if (res?.status === "success") {
window.location.assign(res.session.url);

      
    } else {
  toast.error(res?.message || "Checkout failed");

  setTimeout(() => {
    window.location.href = res.session.cancel_url;
  }, 2000); 
}



    }

  } catch (error) {
    toast.error("Something went wrong during checkout");
  }
}


  return (
    <div className="flex justify-center items-center pt-14">
      <Card className="w-full sm:max-w-md rounded-2xl shadow-2xl border-none">
        <CardHeader>
          <CardTitle className="text-center text-xl">Checkout</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Details */}
            <Controller
              name="details"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("details", fieldState.error)}>
                  <FieldLabel>Address Details</FieldLabel>
                  <Input {...field} />
                  {showError("details", fieldState.error) && (
                    <FieldError className="text-red-600" errors={[fieldState.error!]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("phone", fieldState.error)}>
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...field} />
                  {showError("phone", fieldState.error) && (
                    <FieldError className="text-red-600" errors={[fieldState.error!]} />
                  )}
                </Field>
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("city", fieldState.error)}>
                  <FieldLabel>City</FieldLabel>
                  <Input {...field} />
                  {showError("city", fieldState.error) && (
                    <FieldError className="text-red-600" errors={[fieldState.error!]} />
                  )}
                </Field>
              )}
            />

            {/* Payment Method */}
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Payment Method</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full bg-green-700 text-white">
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </CardContent>

        <CardFooter />
      </Card>
    </div>
  );
}
