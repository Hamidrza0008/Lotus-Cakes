import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const [rows] = await db.execute(`SELECT * FROM orders`);
    console.log(rows);

    return NextResponse.json(rows);
}