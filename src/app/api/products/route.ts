
import { IOrder, IOrderByState, IProductData } from "@/app/Types/types";
import { generateRandomOrders, productsData, stateOrdersData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
    const params = request.nextUrl.searchParams
    const paramSort = params.get("sort")
    const paramQuantity: string = params.get("quantity") || ""
    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        if (paramSort === "profit") {
            const response: IProductData[] = productsData.sort((a, b) => {
                if (a.quantitySold > b.quantitySold) {
                    return -1
                }
                if (a.quantitySold < b.quantitySold) {
                    return 1
                }
                return 0
            }).filter((product, index) => index < parseInt(paramQuantity))
            return NextResponse.json({ response }, { status: 200 })

        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}