import { ITotalSales, totalOrdersData, totalSalesData } from "@/app/utils/mockdata"
import { NextRequest, NextResponse } from "next/server"
import { set } from "zod"

interface IAmount {
  quantity: number
  amount: number
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  try {
    /* TODO */
    //Agregar aqui la consulta a la base de datos

    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(totalSalesData())
      }, 500)
    })

    const amount: IAmount = (await response) as IAmount
    console.log(amount)

    return NextResponse.json({ response: amount.amount }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
