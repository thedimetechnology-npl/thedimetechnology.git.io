import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "admin_session"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(ADMIN_COOKIE)?.value

  // Protect /admin except /admin/login
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next()
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect admin API except login
  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/login") return NextResponse.next()
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
