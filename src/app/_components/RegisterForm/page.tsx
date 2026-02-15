"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/lib/register.schema"
import { useRouter } from "next/navigation"




type FormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { touchedFields, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  })
const router = useRouter()
  const showError = (name: keyof FormValues, error?: any) =>
    touchedFields[name] && error

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      const result = await res.json()

      if (!res.ok) {
        
        if (result?.errors) {
          Object.entries(result.errors).forEach(([key, message]) => {
            setError(key as keyof FormValues, {
              type: "server",
              message: message as string,
            })
          })
        } else {
          toast.error(result.message || "Something went wrong")
        }
        return
      }

      toast.success("Account created successfully ", {
        description: result.message,
      })

      reset()
      router.push("/login")
    } catch (error) {
      toast.error("Network error, please try again")
    }
  }

  return (
    <Card className="w-full sm:max-w-md rounded-2xl shadow-2xl border-none">
      <CardHeader>
        <CardTitle className="text-center text-xl">Create Account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("name", fieldState.error)}>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} />
                {showError("name", fieldState.error) && (
                  <FieldError className="text-red-600"  errors={[fieldState.error!]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("email", fieldState.error)}>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} />
                {showError("email", fieldState.error) && (
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

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("password", fieldState.error)}>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" {...field} />
                {showError("password", fieldState.error) && (
                  <FieldError className="text-red-600" errors={[fieldState.error!]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("rePassword", fieldState.error)}>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input type="password" {...field} />
                {showError("rePassword", fieldState.error) && (
                  <FieldError className="text-red-600" errors={[fieldState.error!]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  )
}
