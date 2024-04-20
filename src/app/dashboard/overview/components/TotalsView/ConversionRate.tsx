import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ConversionIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

export async function ConversionRate() {
	const response = await fetch(`${URL_API}orders`, { next: { revalidate: 3600, tags: ["totalorders"] } })
	const responseOrders = await response.json()
	const orders = responseOrders.response.totalResults

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
