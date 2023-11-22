
import { UploadFile } from "@/Firebase/firebase";
import { IBrand, IProductData } from "@/app/Types/types";
import { pool } from "@/app/utils/database";
import { productsData } from "@/app/utils/mockdata";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest, context: any) {
    const params = request.nextUrl.searchParams
    /*if (session === null) {
    return NextResponse.json({ message: "You do not have the necessary permissions to access this resource." }, { status: 403 })
  }*/
    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        const response = await pool.query(`SELECT * FROM brands`)
        const brands: IBrand[] = response[0] as IBrand[]

        return NextResponse.json({ brands }, { status: 200 })


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
    console.log(brand.logo === "", brand.nameBrand === "")

    try {
        const date = new Date().toISOString()
        if (brand.logo === "" || brand.nameBrand === "") {
            return NextResponse.json({ message: "The request is missing a required field. Please make sure all required fields are provided.", error: { logo: brand.logo === "", name: brand.nameBrand === "" } }, { status: 400 })
        }

        const response = await pool.query(`INSERT INTO brands(name, name_logo, logo, createdDate, lastModified ) VALUES(?,?,?,?,?) `, [brand.nameBrand, brand.name_logo, brand.logo, date, date])
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
