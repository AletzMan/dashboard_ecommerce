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
	console.log("search", search)
	/*if (session === null) {
	  return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
	}*/
	try {
		/* TODO */
		//Agregar aqui el fetch a la base de datos
		let query = "SELECT * FROM coupons"
		const pageSize = 10
		const offset = (page - 1) * pageSize

		if (search) {
			query += " WHERE code LIKE ? or description LIKE ?"
		}

		if (order) {
			query += ` ORDER BY ${order} ${sort}`
		}

		query += ` LIMIT ${pageSize} OFFSET ${offset}`

		// Crear un array de valores para la declaración preparada
		const likePattern = `%${search}%`
		const values = search ? [likePattern, likePattern] : []

		const [coupons] = await pool.query(query, values)

		let queryCount = "SELECT COUNT (*) AS quantity FROM coupons"

		if (search) {
			queryCount += " WHERE code LIKE ? or description LIKE ?"
		}
		const likePatternCount = `%${search}%`
		const valuesCount = search ? [likePatternCount, likePatternCount] : []

		const response = await pool.query(queryCount, valuesCount)
		const quantity: IQuantity[] = response[0] as IQuantity[]
		const total = quantity[0].quantity
		const totalPages = Math.ceil(total / pageSize)

		return NextResponse.json({ coupons, total, totalPages, currentPage: page, pageSize }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

interface ICoupon {
	code: string
	description: string
	discount: number
	start_date: string
	end_date: string
	limits: number
}

export async function POST(request: NextRequest, context: any) {
	try {
		/*const session = await getServerSession({ req: request })
		if (session === null) {
			return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
		}*/
		const coupon: ICoupon = await request.json()
		const query = "INSERT INTO coupons (code, description, limits, discount, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)"
		const response = await pool.query(query, [coupon.code, coupon.description, coupon.limits, coupon.discount, coupon.start_date, coupon.end_date])
		return NextResponse.json({ message: "OK", error: false }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: error, error: true }, { status: 500 })
	}
}