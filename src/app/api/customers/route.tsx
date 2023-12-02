
import { IQuantity } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest, context: any) {
    const params = request.nextUrl.searchParams
    const search = params.get("search") || ""
    const sort = params.get("sort") || "asc"
    const order = params.get("order") || ""
    const page: number = Number(params.get("page")) || 1

    /*if (session === null) {
      return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
    }*/
    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        let query = "SELECT * FROM users"
        const pageSize = 10
        const offset = (page - 1) * pageSize

        if (search) {
            query += " WHERE name LIKE ? or email LIKE ?"
        }

        if (order) {
            query += ` ORDER BY ${order} ${sort}`
        }

        query += ` LIMIT ${pageSize} OFFSET ${offset}`

        // Crear un array de valores para la declaración preparada
        const likePattern = `%${search}%`
        const values = search ? [likePattern, likePattern] : []

        const [users] = await pool.query(query, values)

        let queryCount = "SELECT COUNT (*) AS quantity FROM users"

        if (search) {
            queryCount += " WHERE name LIKE ? or email LIKE ?"
        }
        const likePatternCount = `%${search}%`
        const valuesCount = search ? [likePatternCount, likePatternCount] : []

        const response = await pool.query(queryCount, valuesCount)
        const quantity: IQuantity[] = response[0] as IQuantity[]
        const totalUsers = quantity[0].quantity
        const totalPages = Math.ceil(totalUsers / pageSize)
        const data = {
            users,
            totalUsers,
            totalPages,
            currentPage: page,
            pageSize,
        }

        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
