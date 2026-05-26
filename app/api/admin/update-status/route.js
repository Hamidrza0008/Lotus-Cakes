import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { message: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const query = `
      UPDATE orders
      SET order_status = ?
      WHERE id = ?
    `;

    await db.execute(query, [status, orderId]);

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
    });

  } catch (error) {
    console.error("Status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order status",
        error: error.message
      },
      { status: 500 }
    );
  }
}