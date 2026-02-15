"use server"

import { ChangeValues } from "@/app/changepassword/page"
import { getMyToken } from "./getMyToken"


export default async function changeMyPass(data: ChangeValues) {
  const token = await getMyToken()

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
    }
  }

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        currentPassword: data.oldPassword,
        password: data.newPassword,
        rePassword: data.rePassword,
      }),
    }
  )

  const json = await res.json()
  return json
}
