import { IOrder, IOrderByState, IProductData, IQuantity, ProductType } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { CreateIDProduct } from "@/app/utils/functions"
import { generateRandomOrders, productsData, stateOrdersData } from "@/app/utils/mockdata"
import { escapeId, ResultSetHeader } from "mysql2/promise"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  const paramQuantity: string = params.get("quantity") || ""
  const search = params.get("search") || ""
  const sort = params.get("sort") || "asc"
  const order = params.get("order") || ""
  const user_id = params.get("user_id") || ""
  const page: number = Number(params.get("page")) || 1
  try {
    /* TODO */
    //Agregar aqui el fetch a la base de datos
    if (paramSort === "state") {
      const response: IOrderByState[] = stateOrdersData
      return NextResponse.json({ response }, { status: 200 })
    } else {
      let query =
        "SELECT orders.*, users.name, users.lastname FROM orders JOIN users ON orders.user_id = users.id "
      const pageSize = 5
      const offset = (page - 1) * pageSize

      if (search && user_id) {
        query += " WHERE user_id=? AND LIKE ? OR order_id LIKE ?"
      } else if (search) {
        query += " WHERE orders.id LIKE ? OR order_id LIKE ?"
      } else if (user_id) {
        query += " WHERE user_id=?"
      }

      if (order) {
        query += ` ORDER BY ${order} ${sort}`
      }

      query += ` LIMIT ${pageSize} OFFSET ${offset}`

      // Crear un array de valores para la declaración preparada
      const likePatternSearch = `%${search}%`
      const likePatternUser = `${user_id}`
      let values: string[] = []
      if (search && user_id) {
        values = [likePatternUser, likePatternSearch, likePatternSearch]
      } else if (search) {
        values = [likePatternSearch, likePatternSearch]
      } else if (user_id) {
        values = [likePatternUser]
      }

      const [orders] = await pool.query(query, values)

      let queryCount = "SELECT COUNT (*) AS quantity FROM orders"
      if (search) {
        queryCount += " WHERE id LIKE ? OR order_id LIKE ?"
      }
      const likePatternCount = `%${search}%`
      const valuesCount = search ? [likePatternCount, likePatternCount] : []

      const response = await pool.query(queryCount, valuesCount)
      const quantity: IQuantity[] = response[0] as IQuantity[]
      const totalOrders = quantity[0].quantity
      const totalPages = Math.ceil(totalOrders / pageSize)
      const data = {
        orders,
        totalOrders,
        totalPages,
        currentPage: page,
        pageSize,
      }

      return NextResponse.json({ data }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
