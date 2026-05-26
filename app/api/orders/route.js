import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function GET(req) {
    const cookieStore =await cookies();
    const token = cookieStore.get("userToken")?.value;

    if(!token){
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    const user_id = decoded.id;
    
    const [ordersRow] = await db.execute("SELECT * FROM orders WHERE user_id=?" , [user_id]);
    return NextResponse.json(ordersRow)

}

export async function POST(req) {

    try {
        const body = await req.json();
        const {
            customer_name,
            customer_phone,
            customer_address,
            total_price,
            payment_method,
            order_items,
        } = body;

        const cookieStore =await cookies();
        const token = cookieStore.get("userToken")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id;

        // Validation
        if (
            !customer_name ||
            !customer_phone ||
            !customer_address ||
            !total_price ||
            !order_items
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Insert Query
        const query = `
      INSERT INTO orders (
        user_id,
        customer_name,
        customer_phone,
        customer_address,
        total_price,
        payment_method,
        order_items
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            user_id,
            customer_name,
            customer_phone,
            customer_address,
            total_price,
            payment_method || "Cash on Delivery",
            JSON.stringify(order_items),
        ];

        await db.execute(query, values);

        return NextResponse.json({
            success: true,
            message: "Order placed successfully",
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }


}