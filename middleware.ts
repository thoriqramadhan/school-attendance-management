import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const runtime = "nodejs"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value
    const pathname = request.nextUrl.pathname

    const publicRoutes = ["/login", "/register"]
    const isPublic = publicRoutes.some(p => pathname.startsWith(p))

    if (isPublic && token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET!)
            return NextResponse.redirect(new URL("/", request.url))
        } catch {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}



export const config = {
    matcher: ["/((?!_next|api|404|not-found|favicon.icon|robot.txt|_next/static|_next/image).*)"]
}