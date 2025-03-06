import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    if (!token) {
        // If there's no token, redirect to the signin page
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Allow the request to proceed if a token is found
    return NextResponse.next();
}

// This ensures the middleware runs only for the routes you specify
export const config = {
    matcher: "/dashboard/:path*",  // Match any path under /dashboard
};