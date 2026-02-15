import NextAuth, { DefaultSession,User } from "next-auth"
import {JWT} from "next-auth/jwt"
declare module "next-auth" {
  interface User{
user:{
    role:string,
    email:string,
    name:string
},
token:string
  }
  interface Session {
    user: {
    role:string,
    email:string,
    name:string
}
  }
}
declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string
  }
}










