import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (req.nextUrl.pathname.startsWith("/todo")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }


  if (req.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/todo", req.url));
  }
  if (req.nextUrl.pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/todo", req.url));
  }
  
  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
