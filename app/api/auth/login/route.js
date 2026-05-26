import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {


    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            )
        }

        const [user] = await db.execute(`SELECT * FROM users WHERE email=?`, [email]);

        if (user.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email"
                },
                { status: 400 }
            )
        }

        const isPasswordMatched = await bcrypt.compare(password, user[0].password);

        if (!isPasswordMatched) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid password"
                },
                { status: 400 }
            )
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                role: user[0].role,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        )

        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful",

                user: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role
                }

            },
            { status: 200 }

        )

        response.cookies.set("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })

        return response;



    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 }
        );
    }
}