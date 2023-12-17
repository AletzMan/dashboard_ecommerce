import { FacebookIcon } from "@/app/SVG/componentsSVG"
import { CardSocialMediaStatistics } from "./components/CardSocialMediaStatistics"
import styles from "./marketing.module.scss"
import { LineChartG } from "../components/LineChart/LineChart"

const data = [
	["Year", "Facebook", "Twitter", "Instagram", "YouTube", "TikTok"],
	["2013", 1000, 400, 200, 100, 50],
	["2014", 1170, 460, 250, 200, 100],
	["2015", 660, 1120, 300, 300, 200],
	["2016", 1030, 540, 350, 400, 300],
	["2017", 1150, 400, 400, 500, 400],
	["2018", 1250, 500, 450, 600, 500],
	["2019", 1350, 600, 500, 700, 600],
	["2020", 1450, 700, 550, 800, 700],
	["2021", 1550, 800, 600, 900, 800],
]

const options = {
	hAxis: {
		title: "Year",
		textStyle: {
			color: "DDDDDD",
		},
		titleTextStyle: {
			color: "DDDDDD",
		},
		gridlines: {
			color: "#333333",
		},
	},
	vAxis: {
		title: "Traffic form social media",
		textStyle: {
			color: "DDDDDD",
		},
		titleTextStyle: {
			color: "DDDDDD",
		},
	},
	series: {},
	annotations: {
		textStyle: {
			color: "DDDDDD",
		},
	},
	backgroundColor: "transparent",
	is3D: true,
	//colors: ["#3b5998", "#1da1f2", "#c13584", "#ff0000", "#DDDDDD"],
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
				<LineChartG data={data} options={options} />
			</article>
		</section>
	)
}
