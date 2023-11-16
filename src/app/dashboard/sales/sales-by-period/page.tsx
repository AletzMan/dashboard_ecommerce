import { BarChart, IOptionsChart } from "../../components/BarChart/BarChart"
import { OptionsSales } from "./components/OptionsSales"
const options: IOptionsChart = {
	series: [
		{
			name: "Profit",
			data: [12000, 21567, 22345, 19234, 14000, 16890, 8200],
		},
		{
			name: "Lost",
			data: [6000, 14000, 17234, 11234, 20000, 10000, 27356],
		},
	],
	xaxis: {
		title: {
			enabled: true,
			text: "Months",
		},
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"],
	},
	yaxis: {
		title: {
			enabled: true,
			text: "$ USD",
		},
	},
	chart: {
		height: 350,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ["transparent"],
	},
	fill: {
		opacity: 1,
		colors: [
			"#059a23", // Azul
			"#5e9bab", // Amarillo
			"#c8c32f", // Rojo
			"#2f71c8", // Verde
			"#9b59b6", // Morado
		],
	},
}

export default function SalesPage() {
	return (
		<section>
			<header>
				<OptionsSales />
			</header>
			<article>
				<BarChart options={options} />
			</article>
		</section>
	)
}
