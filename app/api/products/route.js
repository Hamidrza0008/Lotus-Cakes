import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.execute("SELECT * FROM products");

  return NextResponse.json(rows);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      category,
      description,
      image,
      price,
      stock,
    } = body;

    await db.execute(
      `INSERT INTO products 
      (name, category, description, image, price, stock)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        description,
        image,
        price,
        stock,
      ]
    );

    return NextResponse.json({
      message: "Product Added Successfully",
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await db.execute("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}