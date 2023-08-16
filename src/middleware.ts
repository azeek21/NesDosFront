import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/todos/:id*", "/"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  console.log("here", token);
  if (!token) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}
