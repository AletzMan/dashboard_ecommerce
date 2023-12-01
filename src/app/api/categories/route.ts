import { ICategory } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  try {
    /* TODO */
    //Agregar aqui el fetch a la base de datos
    const response = await pool.query(`SELECT * FROM categories`)
    const categories: ICategory[] = response[0] as ICategory[]

    if (categories.length > 0) {
      return NextResponse.json({ categories }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
