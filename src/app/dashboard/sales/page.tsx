import { TotalOrders } from "../overview/components/TotalsView/TotalOrders"
import { TotalSales } from "../overview/components/TotalsView/TotalSales"
import styles from "./components/salescomponents.module.scss"
import { Stats } from "./components/Stats"

export default async function SalesPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	return (
		<section className={styles.section}>
			<div className={styles.totals}>
				{/* @ts-expect-error Server Component */}
				<TotalSales />
				{/* @ts-expect-error Server Component */}
				<TotalOrders title="Total Sales" />
			</div>
			<Stats />
		</section>
	)
}
