
import { ICategory } from "@/app/Types/types";
import { pool } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
    const { params } = context
    const id = params.id
    console.log(id)
    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        const response = await pool.query(`SELECT * FROM subcategories WHERE category_id=?`, [id])
        const subCategories: ICategory[] = response[0] as ICategory[]
        console.log(subCategories)

        if (subCategories.length > 0) {
            return NextResponse.json({ subCategories }, { status: 200 })
        }



    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}