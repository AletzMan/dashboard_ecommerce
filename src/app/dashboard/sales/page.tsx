import { TotalOrders } from "../overview/components/TotalsView/TotalOrders"
import { TotalSales } from "../overview/components/TotalsView/TotalSales"
import styles from "./components/salescomponents.module.scss"
import { Stats } from "./components/Stats"

export default async function SalesPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<div className={styles.totals}>
				<TotalSales />
				<TotalOrders title="Total Sales" />
			</div>
			<Stats />
		</section>
	)
}
