
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {jwtDecode} from "jwt-decode"


export const authOptions: NextAuthOptions = {
  pages:{ signIn:"/login"},
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        )

        const payload = await res.json()
        console.log(payload)

        if (payload.message == "success") {
          const decode:{id:string} = jwtDecode(payload.token)
         

          return {
            id: decode.id,
            user: payload.user,
            token: payload.token,
          }
        }

        return null
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.user = user.user
        token.token = user.token
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user 
      
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
