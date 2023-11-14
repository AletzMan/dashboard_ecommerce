
import { IOrder, IOrderByState } from "@/app/Types/types";
import { generateRandomOrders, stateOrdersData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
    const params = request.nextUrl.searchParams
    const paramSort = params.get("sort")
    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        if (paramSort === "state") {
            const response: IOrderByState[] = stateOrdersData
            return NextResponse.json({ response }, { status: 200 })

        }
        const orders: IOrder[] = generateRandomOrders(8)

        const response = orders.sort((a, b) => {
            if (a.orderId > b.orderId) {
                return -1
            }
            if (a.orderId < b.orderId) {
                return 1
            }
            return 0
        })

        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}