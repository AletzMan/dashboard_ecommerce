
import { ITotalSales, totalOrdersData, totalSalesData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const paramSort = params.get("sort")
    try {
        /* TODO */
        //Agregar aqui la consulta a la base de datos

        const response: ITotalSales = totalSalesData()



        return NextResponse.json({ response: response.amount }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}