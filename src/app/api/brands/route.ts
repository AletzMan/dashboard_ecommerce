import { UploadFile } from "@/Firebase/firebase"
import { IBrand, IProductData, IQuantity } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { productsData } from "@/app/utils/mockdata"
import { ResultSetHeader } from "mysql2"
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
    let query = "SELECT * FROM brands"
    const pageSize = 3
    const offset = (page - 1) * pageSize

    if (search) {
      query += " WHERE name LIKE ?"
    }

    if (order) {
      query += ` ORDER BY ${order} ${sort}`
    }

    query += ` LIMIT ${pageSize} OFFSET ${offset}`

    // Crear un array de valores para la declaración preparada
    const likePattern = `%${search}%`
    const values = search ? [likePattern] : []

    const [brands] = await pool.query(query, values)

    let queryCount = "SELECT COUNT (*) AS quantity FROM brands"

    if (search) {
      queryCount += " WHERE name LIKE ?"
    }
    const likePatternCount = `%${search}%`
    const valuesCount = search ? [likePatternCount] : []

    const response = await pool.query(queryCount, valuesCount)
    const quantity: IQuantity[] = response[0] as IQuantity[]
    const totalBrands = quantity[0].quantity
    const totalPages = Math.ceil(totalBrands / pageSize)
    const data = {
      brands,
      totalBrands,
      totalPages,
      currentPage: page,
      pageSize,
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest, context: any) {
  const session = await getServerSession()

  /*if (session === null) {
        return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
    }*/

  const brand = await request.json()

  try {
    const date = new Date().toISOString()
    if (brand.logo === "" || brand.nameBrand === "") {
      return NextResponse.json(
        {
          message:
            "The request is missing a required field. Please make sure all required fields are provided.",
          error: { logo: brand.logo === "", name: brand.nameBrand === "" },
        },
        { status: 400 }
      )
    }

    const response = await pool.query(
      `INSERT INTO brands(name, name_logo, logo, createdDate, lastModified ) VALUES(?,?,?,?,?) `,
      [brand.nameBrand, brand.name_logo, brand.logo, date, date]
    )
    const brands: ResultSetHeader[] = response as ResultSetHeader[]

    if (brands[0].affectedRows === 1) {
      return NextResponse.json({}, { status: 201 })
    }
  } catch (error) {
    if ((error as { sqlState: string }).sqlState === "23000") {
      console.error((error as { sqlState: number }).sqlState)
      return NextResponse.json(
        {
          message: "The provided name already exists in the database",
          error: { logo: false, name: true },
        },
        { status: 409 }
      )
    }
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }

  //return NextResponse.json({ error: "" }, { status: 500 })
}
