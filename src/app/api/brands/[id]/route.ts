import { pool } from "@/app/utils/database"
import { ResultSetHeader } from "mysql2"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, context: any) {
    const id = context.params.id
    console.log(id)
    const session = await getServerSession()

    /*if (session === null) {
        return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
    }*/


    try {
        const response = await pool.query(`DELETE FROM brands WHERE id=? `, [id])
        const brands: ResultSetHeader[] = response as ResultSetHeader[]

        console.log(response)
        if (brands[0].affectedRows === 1) {
            return NextResponse.json({}, { status: 200 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }

    //return NextResponse.json({ error: "" }, { status: 500 })
}


export async function PUT(request: NextRequest, context: any) {
    const id = context.params.id
    const brand = await request.json()
    console.log(brand)
    const session = await getServerSession()

    /*if (session === null) {
        return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
    }*/
    const date = new Date().toISOString()

    try {
        const response = await pool.query(`UPDATE brands SET name=?, name_logo=?, logo=?, lastModified=? WHERE id=? `, [brand.nameBrand, brand.name_logo, brand.logo, date, id])
        const brands: ResultSetHeader[] = response as ResultSetHeader[]

        console.log(response)
        if (brands[0].affectedRows === 1) {
            return NextResponse.json({}, { status: 200 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }

    //return NextResponse.json({ error: "" }, { status: 500 })
}