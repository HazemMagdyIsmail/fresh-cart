"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import changeMyPass from "@/utilities/ChangeMyPass"

export const changeSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  rePassword: z.string().min(6),
}).refine((data) => data.newPassword === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

export type ChangeValues = z.infer<typeof changeSchema>

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { touchedFields, isSubmitting },
  } = useForm<ChangeValues>({
    resolver: zodResolver(changeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
  })

  const showError = (name: keyof ChangeValues, error?: any) =>
    touchedFields[name] && error

  async function onSubmit(data: ChangeValues) {
    try {
      const res = await changeMyPass(data)

      if (res.success) {
        toast.success("Password changed successfully 🔐", {
          position: "top-center",
        })
        reset()
      } else {
        toast.error(res.message || "Failed to change password")
      }
    } catch {
      toast.error("Network error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full sm:max-w-md rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Controller
              name="oldPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("oldPassword", fieldState.error)}>
                  <FieldLabel>Old Password</FieldLabel>
                  <Input type="text" {...field} />
                  {showError("oldPassword", fieldState.error) && (
                    <FieldError errors={[fieldState.error!]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("newPassword", fieldState.error)}>
                  <FieldLabel>New Password</FieldLabel>
                  <Input type="password" {...field} />
                  {showError("newPassword", fieldState.error) && (
                    <FieldError errors={[fieldState.error!]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={showError("rePassword", fieldState.error)}>
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <Input type="password" {...field} />
                  {showError("rePassword", fieldState.error) && (
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
              {isSubmitting ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
