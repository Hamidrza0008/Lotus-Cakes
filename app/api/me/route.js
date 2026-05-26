import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function GET(req) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken");

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not logged in"
                },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

        const [user] = await db.execute(`
            SELECT  
            id,
            name,
            email,
            phone,
            role,
            address

         FROM users

         WHERE id = ?` ,
            [decoded.id]
        )

        if (user.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                user: user[0]
            },
            { status: 200 }
        )


    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid token"
            },
            { status: 500 }
        );

    }
}