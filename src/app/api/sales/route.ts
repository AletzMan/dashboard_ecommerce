import { IAllTimePeriod, IPeriodSales, ISalesPerYear } from "@/app/Types/types"
import { IMonthlySales, IYearlySales, YearlySalesData } from "@/app/utils/mockdata"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams
	const paramPeriod = params.get("period")
	const paramYear = params.get("year")
	try {
		/* TODO */
		//Agregar aqui la consulta a la base de datos
		const response = YearlySalesData.find((year) => year.year.toString() === paramYear)
		const currentYear = new Date().getFullYear()

		if (response && paramPeriod === "Month") {
			const yearAmount: IMonthlySales[] = response.data
			const data: number[] = GetDataPerMonth(yearAmount)
			const first: number = YearlySalesData[0].year
			const last: number = YearlySalesData[YearlySalesData.length - 1].year
			const current = GetHighestCurrentMonth(YearlySalesData)
			const allTime = GetHighestAllTimeMonth(YearlySalesData)

			return NextResponse.json({ data, first, last, current, allTime }, { status: 200 })
		} else if (response && paramPeriod === "Year") {
			/*TODO*/
			//Agregar obtencion de registros por hora semana dia y anio
			const data: number[] = []
			const res = GetDataPerYear(YearlySalesData)
			return NextResponse.json(
				{ data: res[0].amount, first: 0, last: 0, current: 0, allTime: 0 },
				{ status: 200 }
			)
		}

		return NextResponse.json({}, { status: 401 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

const GetDataPerMonth = (yearAmount: IMonthlySales[]): number[] => {
	const data: number[] = []

	yearAmount.forEach((month) => {
		data.push(month.salesAmount)
	})
	return data
}

const GetHighestAllTimeMonth = (data: IYearlySales[]): IAllTimePeriod => {
	let monthMax: IPeriodSales = { period: "", sales: 0, salesAmount: 0 }
	let yearMax: number = 0
	data.forEach((year) => {
		year.data.forEach((month) => {
			if (month.salesAmount > monthMax.salesAmount) {
				monthMax.period = month.month
				monthMax.sales = month.sales
				monthMax.salesAmount = month.salesAmount
				yearMax = year.year
			}
		})
	})
	return { period: monthMax, year: yearMax }
}

const GetHighestCurrentMonth = (data: IYearlySales[]): IPeriodSales | undefined => {
	const currentYear = new Date().getFullYear()

	const currentData = data.find((year) => year.year.toString() === currentYear.toString())?.data
	let currentAmount: number[] = []
	currentData?.forEach((data) => {
		currentAmount.push(data.salesAmount)
	})

	const maxMonth = Math.max(...currentAmount)
	const indexMaxMonth = currentAmount.indexOf(maxMonth)
	let currentMonth: IMonthlySales | undefined = undefined

	currentData?.forEach((data, index) => {
		if (index === indexMaxMonth) {
			currentMonth = data
		}
	})
	return currentMonth
}

const GetDataPerYear = (data: IYearlySales[]) => {
	let amountOfMonth: number = 0
	let salesOfMonth: number = 0
	let amountOfYear: number[] = []
	let salesOfYear: number[] = []
	let years: number[] = []
	let dataOfYear: ISalesPerYear[] = []
	data.forEach((year) => {
		year.data.forEach((month) => {
			amountOfMonth += month.salesAmount
			salesOfMonth += month.sales
		})
		amountOfYear.push(amountOfMonth)
		salesOfYear.push(salesOfMonth)
		years.push(year.year)
	})
	dataOfYear.push({ amount: amountOfYear, year: years, sales: salesOfYear })
	return dataOfYear
}

const GetHighestCurrentYear = (data: IYearlySales[]): IPeriodSales | undefined => {
	const currentYear = new Date().getFullYear()

	const currentData = data.find((year) => year.year.toString() === currentYear.toString())?.data
	let currentAmount: number[] = []
	currentData?.forEach((data) => {
		currentAmount.push(data.salesAmount)
	})

	const maxMonth = Math.max(...currentAmount)
	const indexMaxMonth = currentAmount.indexOf(maxMonth)
	let currentMonth: IMonthlySales | undefined = undefined

	currentData?.forEach((data, index) => {
		if (index === indexMaxMonth) {
			currentMonth = data
		}
	})
	return currentMonth
}
