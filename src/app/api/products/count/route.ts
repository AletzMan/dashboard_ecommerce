import { IProductData } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { productsData } from "@/app/utils/mockdata"
import { NextRequest, NextResponse } from "next/server"

interface IQuantity {
  quantity: number
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  try {
    const response = await pool.query("SELECT COUNT (*) AS quantity FROM products")
    const quantity: IQuantity[] = response[0] as IQuantity[]
    return NextResponse.json({ response: quantity[0].quantity }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
