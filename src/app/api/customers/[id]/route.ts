import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context
  const id = params.id
  console.log(id)
  try {
    const [customer] = await pool.query("SELECT * FROM users WHERE id=?", [id])

    return NextResponse.json({ customer }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
