import { pool } from "@/app/utils/database"
import { ResultSetHeader } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params

  try {
    /*const session = await getServerSession({ req: request })
		if (session === null) {
			return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
		}*/

    const query = "DELETE FROM coupons WHERE id = ?"
    const response = await pool.query(query, [id])
    const result: ResultSetHeader[] = response as ResultSetHeader[]

    if (result[0].affectedRows === 0) {
      return NextResponse.json({ message: "Coupon not found", error: true }, { status: 404 })
    }

    return NextResponse.json({ message: "OK", error: false }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error, error: true }, { status: 500 })
  }
}
