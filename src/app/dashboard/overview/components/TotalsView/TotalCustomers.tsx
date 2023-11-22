import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, CustomersIcon } from "@/app/SVG/componentsSVG"

export async function TotalCustomers() {
	const responseCustomers = await axios.get("http://localhost:3000/api/customers/count")
	const customers: number = responseCustomers.data.response
	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{customers}</span>
				<h4 className={styles.article_title}>Customers</h4>
			</header>
			<div className={`${styles.article_customers} ${styles.article_image}`}>
				<CustomersIcon className={styles.article_icon} />
			</div>
			<span className={styles.article_balance}>
				<ArrowIcon className={styles.article_balanceIcon} />
				{`${20}%`}
				<span className={styles.article_balanceText}> this week</span>
			</span>
		</article>
	)
}
