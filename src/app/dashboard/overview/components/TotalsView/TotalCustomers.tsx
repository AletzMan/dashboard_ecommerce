import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, CustomersIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

const GetTotalCustomers = async () => {
	try {
		const response = await fetch(`${URL_API}users`, { next: { revalidate: 3600, tags: ["totalusers"] } })
		const responseCustomers = await response.json()
		return responseCustomers.response.length
	} catch (error) {
		console.error(error)
		return 0
	}
}

interface Props {
	count?: number
}

export async function TotalCustomers({ count }: Props) {
	let customers = count
	if (!count) {
		customers = await GetTotalCustomers()
	}

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
