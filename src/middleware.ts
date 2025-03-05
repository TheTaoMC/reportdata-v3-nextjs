// middleware.ts
import { NextResponse } from "next/server";

export async function middleware(request: any) {
  const token = request.cookies.get("token")?.value;

  /*     if (!token && request.nextUrl.pathname.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", request.url)); // Redirect ไปยัง Login หากไม่มี Token
    } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*"],
};
