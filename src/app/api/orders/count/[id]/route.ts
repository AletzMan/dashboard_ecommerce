import { IQuantity } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const { params } = context
  const id = params.id
  try {
    /* TODO */
    //Agregar aqui la consulta a la base de datos

    const queryCount = "SELECT COUNT (*) AS quantity FROM orders WHERE id=?"
    const response = await pool.query(queryCount, id)
    const quantity: IQuantity[] = response[0] as IQuantity[]
    console.log(quantity[0].quantity)

    return NextResponse.json({ response: quantity[0].quantity }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
