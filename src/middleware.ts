import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";


const authRoutes = ["/login", "/register"];

const protectedRoutes = {
   user: ["/cart", "/wishList", "/marketplaces/:path*"],
  admin: ["/admin", "/admin/dashboard", "/admin/products", "/admin/orders"],
  vendor: ["/vendor"],
  
};
const protectedSubPaths = ["/marketplaces/category", "/marketplaces/product"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
  

  const isProtectedMarketplace =
  !user && protectedSubPaths.some((route) => pathname.startsWith(route));

if (isProtectedMarketplace) {
  return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
}
  if (!user) {
    const isProtected = Object.values(protectedRoutes).flat().some((route) => pathname.startsWith(route));
    if (isProtected) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  const userRole = user?.role; 

  
  if (pathname.startsWith("/admin")) {
  if (userRole === "admin") {
    // full access
  } else if (userRole === "subAdmin") {
    // subAdmin only allowed for products and orders
    const allowedForSubAdmin = ["/admin/products", "/admin/orders"];
    const isAllowed = allowedForSubAdmin.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // all other roles blocked
    return NextResponse.redirect(new URL("/", request.url));
  }
}


  
  if (pathname.startsWith("/vendor") && !["VENDOR", "admin"].includes(userRole as string)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

 
  if (
    protectedRoutes.vendor.some((route) => pathname.startsWith(route)) &&
    userRole !== "VENDOR" &&
    userRole !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/wishList",
    "/login",
    "/register",
    "/vendor/:path*", 
    "/admin/:path*",
    "/marketplaces/:path*",
  ],
};