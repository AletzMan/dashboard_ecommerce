import { pool } from "@/app/utils/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
    const { params } = context

    const id = params.id

    try {
        const [order] = await pool.query("SELECT orders.*, users.name, users.lastname FROM orders JOIN users ON orders.user_id = users.id  WHERE orders.id=?", [id])

        return NextResponse.json({ order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}


export async function PUT(request: NextRequest, context: any) {
    const { params } = context
    const id = params.id

    let query = "UPDATE orders SET "
    const order = await request.json()
    const fields = Object.entries(order)
    let stringFields: string = ""
    let stringValues: Array<string | number> = []
    for (let index = 0; index < fields.length; index++) {
        stringFields += `${fields[index][0]}=? `
        stringValues.push(`${fields[index][1]}`)

    }
    query += stringFields
    query += " WHERE id=?"
    stringValues.push(Number(id))
    console.log(query, stringFields, stringValues)
    try {
        const response = await pool.query(query, stringValues)

        return NextResponse.json({ order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}