import { IOrderByState } from "@/app/Types/types";
import { stateOrdersData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {

    try {
        /* TODO */
        //Agregar aqui el fetch a la base de datos
        const response: IOrderByState[] = stateOrdersData
        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}

