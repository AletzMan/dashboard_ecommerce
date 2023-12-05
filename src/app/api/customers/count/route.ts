import { IQuantity } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { ICustomer, customers } from "@/app/utils/mockdata"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  try {
    const queryCount = "SELECT COUNT (*) AS quantity FROM users"

    const response = await pool.query(queryCount)
    const quantity: IQuantity[] = response[0] as IQuantity[]
    console.log(quantity[0].quantity)

    return NextResponse.json({ response: quantity[0].quantity }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
