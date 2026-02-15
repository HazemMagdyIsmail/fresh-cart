import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (token) {
    
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (pathname === "/cart" || pathname === "/wishlist"||pathname.startsWith("/products/")||pathname === "/allorders" ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    else if(pathname === "/changepassword") return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/cart",       
    "/products/:path*",   
    "/login",             
    "/register",          
    "/wishlist",
    "/changepassword",
    "/allorders",
    
  ],
};
