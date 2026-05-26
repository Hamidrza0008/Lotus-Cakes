import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function GET(req) {

    try {

        const hashedPassword = await bcrypt.hash("Admin@0008", 10);

        await db.execute(
            `
                INSERT INTO users (
                    name,
                    email,
                    phone,
                    password,
                    role,
                    address
                )
                VALUES (?, ?, ?, ?, ?, ?)
                ` ,
            [
                "Admin",
                "admin0008@gmail.com",
                "9599424493",
                hashedPassword,
                "admin",
                "Mumbai"
            ]
        )

        return NextResponse.json({
            success: true,
            message: "Admin created successfully"
        })

    } catch (error) {
    console.log(error);

    return NextResponse.json({
        success: false,
        message: error.message
    });
}

}