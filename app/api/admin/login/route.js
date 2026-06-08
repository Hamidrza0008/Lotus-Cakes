import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





export async function POST(req) {


    try {

        const hash = await bcrypt.hash("admin0008", 10);
console.log(hash);
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

        const [rows] = await db.execute(`SELECT * FROM users WHERE email=?`, [email]);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found"
                },
                { status: 404 }
            )
        }

        const admin = rows[0];

        if (admin.role !== "admin") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Access denied"
                },
                { status: 403 }
            )
        }

        // console.log(password);
        // console.log(admin.password);
        // const pwd = await bcrypt.hash("admin123" , 10);
        // console.log(pwd)
        const isMatched = await bcrypt.compare(password , admin.password);
        console.log(isMatched);

        if (!isMatched) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials"
                },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        const response = NextResponse.json(
            {
                success: true,
                message: "Admin Logged In Successfully",
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                }
            }
        )

        response.cookies.set("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        })

        return response;


    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            { status: 500 }
        );
    }
}