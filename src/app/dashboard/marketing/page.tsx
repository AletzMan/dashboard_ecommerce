import { FacebookIcon } from "@/app/SVG/componentsSVG"
import { CardSocialMediaStatistics } from "./components/CardSocialMediaStatistics"
import styles from "./marketing.module.scss"
import { BarChart, IOptionsChart } from "../components/BarChart/BarChart"



const options: IOptionsChart = {
	chart: {
		height: 220,
		width: 1600,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ["transparent"],
	},
	fill: {
		opacity: 1,
		colors: [
			"#3b5998", "#1da1f2", "#c13584", "#ff0000", "#DDDDDD"
		],
	},
}

const series = [
	{
		name: "Facebook",
		data: [4000, 8000, 9234, 7234, 10000, 12000, 15345],
	},
	{
		name: "Twitter",
		data: [6000, 10000, 11234, 10234, 8000, 6000, 12345]
	},
	{
		name: "Instagram",
		data: [8000, 12000, 13234, 12234, 10000, 8000, 19345]
	},
	{
		name: "YouTube",
		data: [10000, 15000, 16234, 15234, 12000, 10000, 22345],
	},
	{
		name: "TikTok",
		data: [12000, 18000, 19234, 18234, 14000, 12000, 25345]
	}
]
const xaxis = {
	title: {
		enabled: true,
		text: "Months",
	},
	categories: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
}
const yaxis = {
	title: {
		enabled: true,
		text: "Followers",
	},
}

export default function MarketingPage() {
	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<header className={styles.header}>
				<CardSocialMediaStatistics name="Facebook" />
				<CardSocialMediaStatistics name="Twitter" />
				<CardSocialMediaStatistics name="Instagram" />
				<CardSocialMediaStatistics name="YouTube" />
				<CardSocialMediaStatistics name="TikTok" />
			</header>
			<article className={styles.article}>
				<BarChart series={series} options={options} xaxis={xaxis} yaxis={yaxis} />
			</article>
		</section>
	)
}
