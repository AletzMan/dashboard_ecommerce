
import { IProductData } from "@/app/Types/types";
import { productsData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const paramSort = params.get("sort")
    try {
        /* TODO */
        //Agregar aqui la consulta a la base de datos

        const response: IProductData[] = productsData



        return NextResponse.json({ response: response.length }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}