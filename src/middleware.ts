import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/profile/, /^\/posts\/\w+$/], 
  ADMIN: [/^\/dashboard/, /^\/posts\/\w+$/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  // If the user is not logged in
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to login and register pages
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      ); // Redirect to login
    }
  }

  // Allow access to posts details for both USER and ADMIN roles
  if (pathname.startsWith("/posts") && (user.role === "USER" || user.role === "ADMIN")) {
    return NextResponse.next();
  }

  // Check if the user has access to the requested route based on their role
  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next(); // Allow access to the route
    }
  }

  // Redirect to home if the user does not have access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:page*",
    "/profile/:page*",
    "/posts/:page*", // Match all post routes, including details
    "/login",
    "/register",
  ],
};