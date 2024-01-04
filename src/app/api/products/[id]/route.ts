import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context

  const id = params.id

  try {
    const [product] = await pool.query("SELECT * FROM products WHERE id=?", [id])

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: any) {
  const { params } = context

  const body = await request.json()
  const id = params.id

  const fieldsToUpdate = Object.entries(body)

  let query: string = `UPDATE products SET ${fieldsToUpdate
    .map(([key]) => `${key}=?`)
    .join(",")} WHERE id=?`

  try {
    await pool.query(query, [...fieldsToUpdate.map(([, value]) => value), id])

    return NextResponse.json({ message: "Product updated" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
