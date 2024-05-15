import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ConversionIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

const GetOrders = async () => {
	try {
		const response = await fetch(`${URL_API}orders`, { next: { revalidate: 10000, tags: ["totalorders"] } })
		const responseOrders = await response.json()
		return responseOrders.response.totalResults
	} catch (error) {
		console.error(error)
	}
}

export async function ConversionRate() {

	const orders = await GetOrders()

	const visitors = 2138
	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{`${Math.floor((orders / visitors) * 100)}%`}</span>
				<h4 className={styles.article_title}>Conversion Rate</h4>
			</header>
			<div className={`${styles.article_conversion} ${styles.article_image}`}>
				<ConversionIcon className={styles.article_icon} />
			</div>
			<span className={styles.article_balance}>
				<ArrowIcon className={styles.article_balanceIcon} />
				{`${20}%`}
				<span className={styles.article_balanceText}> this week</span>
			</span>
		</article>
	)
}
