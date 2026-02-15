"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

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
import { loginSchema, LoginFormValues } from "@/lib/login.schema"
import Link from "next/link"

export default function LoginForm() {
  

  const {
    control,
    handleSubmit,
    formState: { touchedFields, isSubmitting },
    
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const showError = (name: keyof LoginFormValues, error?: any) =>
    touchedFields[name] && error

  async function onSubmit(data: LoginFormValues) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl:"/"
    })
console.log(res,"ckmswkvdmvkwmvwfkmvkemvkdwkmvkmfwkvwmkwmvfwm")
    if (res?.ok) {
      toast.success("Logged in successfully ",{
        position : "top-center",
        duration:3000
      })
      setTimeout(() => {
window.location.href = "/"

    
  }, 1000)


      
    }else{
 toast.error(res?.error,{
        position : "top-center",
        duration:3000
      })
    }

   
   
     
  }

  return (
    <Card className="w-full sm:max-w-md rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("email", fieldState.error)}>
                <FieldLabel>Email</FieldLabel>
                <Input {...field} placeholder="example@email.com" />
                {showError("email", fieldState.error) && (
                  <FieldError errors={[fieldState.error!]} />
                )}
              </Field>
            )}
          />

         
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={showError("password", fieldState.error)}>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" {...field} />
                {showError("password", fieldState.error) && (
                  <FieldError errors={[fieldState.error!]} />
                )}
              </Field>
            )}
          />
         


          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  )
}
