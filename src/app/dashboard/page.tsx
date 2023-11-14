import { BarChart } from "./components/BarChart/BarChart"
import { MexicoMap } from "./components/MexicoMap/MexicoMap"
import Link from "next/link"
import styles from "./dashboard.module.scss"
import { LatestOrders } from "./components/LatestOrders/LatestOrders"
import { ArrowRightIcon } from "../SVG/componentsSVG"
import { TotalsView } from "./components/TotalsView/TotalsView"
import { PieChartG } from "./components/PieChart/PieChart"
import { TopProducts } from "./components/TopProducts/TopProducts"

export default function DashboardPage() {
	return (
		<main className={styles.conteiner}>
			<section className={`${styles.conteiner_totals} ${styles.conteiner_section} ${styles.totals}`}>
				<TotalsView />
			</section>
			<section className={`${styles.conteiner_profit} ${styles.conteiner_section}`}>
				<h2 className={styles.conteiner_title}>Profit & Loss</h2>
				<BarChart />
			</section>
			<section className={`${styles.conteiner_sales} ${styles.conteiner_section}`}>
				<MexicoMap />
			</section>
			<section className={`${styles.conteiner_orders} ${styles.conteiner_section}`}>
				<header className={styles.conteiner_orders_header}>
					<h2 className={styles.conteiner_title}>Latest Orders</h2>
					<Link className={styles.conteiner_ordersShow} href={`dashboard/orders/order-list`} title="Show all orders">
						Show all
						<ArrowRightIcon />
					</Link>
				</header>
				<LatestOrders />
			</section>
			<section className={`${styles.conteiner_products} ${styles.conteiner_section}`}>
				<h2 className={styles.conteiner_title}>Best sellers</h2>
				<Link className={styles.conteiner_ordersShow} href={`dashboard/products/top-products`} title="Show all orders">
					Show all
					<ArrowRightIcon />
				</Link>
				{<TopProducts />}
			</section>
			<section className={`${styles.conteiner_traffic} ${styles.conteiner_section}`}>
				<h2 className={styles.conteiner_title}>Traffic Web</h2>
				{<PieChartG />}
			</section>
		</main>
	)
}
