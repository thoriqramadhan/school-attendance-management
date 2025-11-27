import { NextResponse, NextRequest } from "next/server";
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const publicRoute = ['/login', '/register']
    const isInPublicRoute = publicRoute.some(route => request.nextUrl.pathname.startsWith(route));
    if (!token && !isInPublicRoute) return NextResponse.redirect(new URL("/login", request.url));
    // if (token && isInPublicRoute) return NextResponse.next();
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next|api|404|not-found|favicon.icon|robot.txt|_next/static|_next/image).*)"]
}