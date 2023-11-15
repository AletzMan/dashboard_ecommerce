import { BarChart } from "./components/BarChart/BarChart"
import { MexicoMap } from "./components/MexicoMap/MexicoMap"
import Link from "next/link"
import styles from "./dashboard.module.scss"
import { LatestOrders } from "./components/LatestOrders/LatestOrders"
import { ArrowRightIcon } from "../SVG/componentsSVG"
import { TotalsView } from "./components/TotalsView/TotalsView"
import { PieChartG } from "./components/PieChart/PieChart"
import { TopProducts } from "./components/TopProducts/TopProducts"
import axios from "axios"
import { IOrderByState } from "../Types/types"
import { TopSales } from "./components/TopSales/TopSales"

export default async function DashboardPage() {
	const response = await axios.get("http://localhost:3000/api/orders?sort=state")
	const orders: IOrderByState[] = response.data.response
	const ordersTop = orders.filter((data, index) => index < 10)
	return (
		<main className={`${styles.main_container} scrollBarStyle`}>
			<section className={` ${styles.totals}`}>
				<TotalsView />
			</section>
			<div className={styles.container}>
				<section className={`${styles.container_profit} ${styles.container_section}`}>
					<h2 className={styles.container_title}>Profit & Loss</h2>
					<BarChart />
				</section>
				<section className={`${styles.container_sales} ${styles.container_section}`}>
					<MexicoMap orders={orders} />
				</section>
				<section className={`${styles.container_topsales} ${styles.container_section}`}>
					<TopSales ordersTop={ordersTop} />
				</section>
				<section className={`${styles.container_orders} ${styles.container_section}`}>
					<header className={styles.container_orders_header}>
						<h2 className={styles.container_title}>Latest Orders</h2>
						<Link className={styles.container_ordersShow} href={`dashboard/orders/order-list`} title="Show all orders">
							Show all
							<ArrowRightIcon />
						</Link>
					</header>
					<LatestOrders />
				</section>
				<section className={`${styles.container_products} ${styles.container_section}`}>
					<h2 className={styles.container_title}>Best sellers</h2>
					<Link className={styles.container_ordersShow} href={`dashboard/products/top-products`} title="Show all orders">
						Show all
						<ArrowRightIcon />
					</Link>
					{<TopProducts />}
				</section>
				<section className={`${styles.container_section} ${styles.container_traffic}`}>
					<h2 className={styles.container_title}>Traffic Web</h2>
					{<PieChartG />}
				</section>
			</div>
		</main>
	)
}
