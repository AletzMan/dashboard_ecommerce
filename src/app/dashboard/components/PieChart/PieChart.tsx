"use client"

import Chart from "react-google-charts"
import styles from "./piechart.module.scss"

export const data = [
	["Type", "Percetange"],
	["Web Site", 45],
	["Social Media", 26],
	["Refferal", 29],
]

export const options = {
	title: "",
	sliceVisibilityThreshold: 0.2, // 20%
	backgroundColor: "transparent",
	colors: [
		"#059a23", // Azul
		"#5e9bab", // Amarillo
		"#c8c32f", // Rojo
		"#9b59b6", // Morado
		"#2f71c8", // Verde
	],
	legend: {
		textStyle: {
			color: "white",
		},
	},
}

export function PieChartG() {
	return <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"350px"} />
}
