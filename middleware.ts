import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { UUID } from "crypto"

export const runtime = "nodejs"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value
    const pathname = request.nextUrl.pathname

    const publicRoutes = ["/login", "/register"]
    const isPublic = publicRoutes.some(p => pathname.startsWith(p))

    if (!token) {
        console.log('no token');

        if (!isPublic) {
            console.log('no token , in private');
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: UUID, roleid: number, name: string }

        const response = isPublic ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next()

        response.headers.set('x-user', JSON.stringify({ id: decoded.sub, roleId: decoded.roleid, name: decoded.name }))
        console.log('success');
        return response
    } catch (error) {
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("access_token")
        return response
    }
}



export const config = {
    matcher: ["/((?!_next|api|404|not-found|favicon.icon|robot.txt|_next/static|_next/image).*)"]
}