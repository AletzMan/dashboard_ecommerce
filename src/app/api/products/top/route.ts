import { IProductData } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { productsData } from "@/app/utils/mockdata"
import { NextRequest, NextResponse } from "next/server"

interface IQuantity {
  quantity: number
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const paramQuantity = params.get("quantity") || 1
  try {
    const [products] = await pool.query(
      `SELECT * FROM products ORDER BY soldQuantity DESC LIMIT ?`,
      [paramQuantity]
    )
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
