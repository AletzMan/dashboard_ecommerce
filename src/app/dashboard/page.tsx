import { BarChart, IOptionsChart } from "./components/BarChart/BarChart"
import { MexicoMap } from "./overview/components/MexicoMap/MexicoMap"
import Link from "next/link"
import styles from "./dashboard.module.scss"
import { LatestOrders } from "./overview/components/LatestOrders/LatestOrders"
import { ArrowRightIcon } from "../SVG/componentsSVG"
import { TotalsView } from "./overview/components/TotalsView/TotalsView"
import { PieChartG } from "./components/PieChart/PieChart"
import { TopProducts } from "./overview/components/TopProducts/TopProducts"
import axios from "axios"
import { IOrderByState } from "../Types/types"
import { TopSales } from "./overview/components/TopSales/TopSales"

export default async function DashboardPage() {
	return <></>
}
