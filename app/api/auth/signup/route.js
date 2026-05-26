import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
    try {

        const body = await req.json();

        const { name, email, phone, password, address } = body

        if (
            !name || !email || !phone || !password || !address
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            )
        }

        const [existingUser] = await db.execute(`SELECT * FROM users WHERE email = ? OR phone=?`, [email, phone]);

        if (existingUser.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists"
                },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(`INSERT INTO users 
            (name , email , phone , password , address ) 
            values(? , ? , ? , ? , ?)` ,
            [name, email, phone, hashedPassword, address]
        );
        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully"
            },
            { status: 201 }
        )


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