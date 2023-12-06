import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context

  const id = params.id

  try {
    const [address] = await pool.query("SELECT * FROM shipping_address WHERE id=?", [id])

    return NextResponse.json({ address }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
