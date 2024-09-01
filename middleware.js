import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware ran");

  if (req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", requrest.url));
  }

  return NextResponse.json({ success: "Successfully Ran" });
}

export const config = {
  matcher: ["/userslist/:path*"],
};
