"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(){
const dtoken = (await cookies()).get("next-auth.session-token")?.value||(await cookies()).get("__Secure-next-auth.session-token")?.value
if(!dtoken)return null
const token = await decode({token : dtoken , secret: process.env.AUTH_SECRET!})

return token?.token;

}