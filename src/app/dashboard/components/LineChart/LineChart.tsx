"use client"

import Chart from "react-google-charts"

interface IData {}

interface IOptions {
	annotations?: {
		textStyle?: {
			fontSize?: number
			bold?: boolean
			italic?: boolean
			color?: string
		}
	}
	hAxis: {
		title: string
		textStyle?: {
			fontSize?: number
			fontName?: string
			bold?: boolean
			italic?: boolean
			color?: string
		}
		gridlines?: {
			color?: string
		}
	}
	vAxis: {
		title: string
		textStyle?: {
			fontSize?: number
			fontName?: string
			bold?: boolean
			italic?: boolean
			color?: string
		}
		titleTextStyle?: {
			fontSize?: number
			fontName?: string
			bold?: boolean
			italic?: boolean
			color?: string
		}
	}
	series: {
		1?: {
			annotations?: {
				textStyle?: {
					fontSize?: number
					bold?: boolean
					italic?: boolean
					color?: string
				}
			}
		}
	}
	backgroundColor: string
	is3D: boolean
}

interface ILineChart {
	data: any
	options: IOptions
}

export const LineChartG = ({ data, options }: ILineChart) => {
	return <Chart chartType="LineChart" data={data} options={options} width={"100%"} height={"350px"} />
}
