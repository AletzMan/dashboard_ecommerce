"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { BarChart, IOptionsChart, ISeries, IXAxis, IYAxis } from "../../components/BarChart/BarChart"
import { DescriptionSales } from "./DescriptionSales"
import { OptionsSales } from "./OptionsSales"
import styles from "./salescomponents.module.scss"
import axios from "axios"
import { useEffect, useState } from "react"
import { LoadingIcon } from "@/app/SVG/componentsSVG"
import { IMonthlySales } from "@/app/utils/mockdata"
import { IAllTimePeriod } from "@/app/Types/types"

interface IChart {
	options: IOptionsChart
	xaxis: IXAxis
	yaxis: IYAxis
}

export function Stats() {
	const router = useRouter()
	const params = useSearchParams()
	const period = params.get("period")
	const year = params.get("year")
	const [rangeYears, setRangeYears] = useState({ firstYear: 0, lastYear: 0 })
	const [dataSales, setDataSales] = useState<number[]>([])
	const [dataChart, setDataChart] = useState<IChart | undefined>(undefined)
	const [dataSeries, setDataSeries] = useState<ISeries[] | undefined>(undefined)
	const [currentData, setCurrentData] = useState<IMonthlySales | undefined>(undefined)
	const [allTimeData, setAllTimeData] = useState<IAllTimePeriod | undefined>(undefined)
	const [loading, setLoading] = useState(true)

	const GetData = async () => {
		setLoading(true)
		const response = await axios.get(`http://localhost:3000/api/sales?period=${period}&year=${year}`)
		const data: number[] = response.data.data
		setDataSales(data)
		setCurrentData(response.data.current)
		setAllTimeData(response.data.allTime)


		const firstYear: number = response.data.first
		const lastYear: number = response.data.last
		setRangeYears({ firstYear, lastYear })
		//setLoading(false)
	}

	useEffect(() => {
		if (dataSales.length > 0) {
			//setLoading(true)
			const options: IOptionsChart = {
				chart: {
					height: 350,
					width: 850,
				},
				stroke: {
					show: true,
					width: 2,
					colors: ["transparent"],
				},
				fill: {
					opacity: 1,
					colors: [
						"#c8c32f", // Rojo
						"#5e9bab", // Amarillo
						"#059a23", // Azul
						"#2f71c8", // Verde
						"#9b59b6", // Morado
					],
				},
			}

			const series = [
				{
					name: "Sales",
					data: dataSales,
				},
			]

			const xaxis = {
				title: {
					enabled: true,
					text: "Months",
				},
				categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			}

			const yaxis = {
				title: {
					enabled: true,
					text: "$ USD",
				},
			}

			setDataChart({ options, xaxis, yaxis })
			setDataSeries(series)
		}
		setLoading(false)
	}, [dataSales])

	useEffect(() => {
		GetData()
	}, [year])

	return (
		<article className={styles.article}>
			<div className={styles.article_graphic}>
				<OptionsSales lastYear={rangeYears.lastYear} firstYear={rangeYears.firstYear} />
				{loading && (
					<div className={styles.loadingGraph} style={{ width: dataChart?.options.chart.width, height: 445.98 }}>
						<LoadingIcon className={styles.loadingGraph_icon} />
					</div>
				)}
				{!loading && dataSeries && dataChart && (
					<BarChart options={dataChart.options} series={dataSeries} xaxis={dataChart.xaxis} yaxis={dataChart?.yaxis} />
				)}
			</div>
			{<DescriptionSales currentData={currentData} allTimeData={allTimeData} />}
		</article>
	)
}
