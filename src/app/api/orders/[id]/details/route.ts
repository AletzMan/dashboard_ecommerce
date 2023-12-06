import { IOrderDetails, IQuantity } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context
  const searchParams = request.nextUrl.searchParams
  const sort = searchParams.get("sort") || "asc"
  const order = searchParams.get("order") || ""
  const page: number = Number(searchParams.get("page")) || 1

  try {
    const id = params.id
    let query = `SELECT DISTINCT products.*, order_details.quantity 
    FROM products
    LEFT JOIN order_details ON products.id = order_details.item_id
    WHERE products.id IN(?)`
    const pageSize = 5
    const offset = (page - 1) * pageSize

    if (order) {
      query += ` ORDER BY ${order} ${sort}`
    }

    query += ` LIMIT ${pageSize} OFFSET ${offset}`

    const [details] = await pool.query("SELECT * FROM order_details WHERE order_id=?", [id])
    const items: IOrderDetails[] = details as IOrderDetails[]
    let itemsID: number[] = []
    items.forEach((item) => {
      itemsID.push(item.item_id)
    })
    console.log(sort)
    const [products] = await pool.query(query, [itemsID])

    const response = await pool.query("SELECT COUNT(*) AS quantity FROM products WHERE id IN (?)", [
      itemsID,
    ])
    const quantity: IQuantity[] = response[0] as IQuantity[]
    const totalProducts = quantity[0].quantity
    const totalPages = Math.ceil(totalProducts / pageSize)
    const data = {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
      pageSize,
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
