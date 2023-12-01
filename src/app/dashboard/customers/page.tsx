import { TotalCustomers } from "../overview/components/TotalsView/TotalCustomers"
import styles from "./customers.module.scss"

export default function CustomersPage() {
	return (
		<section className={styles.section}>
			{/* @ts-expect-error Server Component */}
			<TotalCustomers />
		</section>
	)
}
