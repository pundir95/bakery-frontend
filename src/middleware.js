import { NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/dashboard", "/profile","billing"];
const PUBLIC_ROUTES = ["/login", "/sign-up"];
const SHARED_ROUTES = ["/about-us", "/blog", "/home", "/"];

export function middleware(req) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  console.log(pathname, "pathname");
  // update (home route code)
  if (pathname == "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!token && PRIVATE_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (SHARED_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

// Define the paths where middleware should run
export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/login",
    "/sign-up",
    "/about-us",
    "/blog",
    "/billing",
    "/",
  ], // Match the routes
};
