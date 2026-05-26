import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
      // ✅ login page ko allow kiya
    if (req.nextUrl.pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = req.cookies.get("adminToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, secret);

        // optional: role check
        if (payload.role !== "admin") {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        return NextResponse.next();

    } catch (err) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }
}

export const config = {
    matcher: ["/admin/dashboard/:path*"],
};