import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logout successful"
            },
            { status: 200 }
        )

        response.cookies.set("userToken", "", {
            httpOnly: true,

            expires: new Date(0),

            path: "/"
        })

        return response
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 }
        )
    }

}