import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  console.log("ENTRO")
  const { params } = context

  const id = params.id
  console.log(id)

  try {
    const [address] = await pool.query("SELECT * FROM shipping_address WHERE id=?", [id])
    console.log("ADDRESS: ", address)
    return NextResponse.json({ address }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
