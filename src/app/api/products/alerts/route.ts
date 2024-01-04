import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  try {
    const [alerts] = await pool.query("SELECT * FROM alerts_inventory")

    if (!alerts) {
      return NextResponse.json({ message: "No alerts found" }, { status: 404 })
    }
    return NextResponse.json({ alerts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
