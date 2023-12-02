import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context
  console.log("ENDPOINT: ", params)
  const id = params.id

  try {
    const [product] = await pool.query("SELECT * FROM products WHERE id=?", [id])

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
