import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
    const { params } = context

    const id = params.id

    try {
        const [order] = await pool.query("SELECT orders.*, users.name, users.lastname FROM orders JOIN users ON orders.user_id = users.id  WHERE orders.id=?", [id])
        console.log(order)
        return NextResponse.json({ order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
