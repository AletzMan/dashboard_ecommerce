import { FormattedString } from "@/app/utils/functions"
import styles from "./totalsview.module.scss"
import { ArrowIcon, CartIcon } from "@/app/SVG/componentsSVG"
import axios from "axios"

export async function TotalSales() {
	const sales = 19521.00
	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{FormattedString(sales)}</span>
				<h4 className={styles.article_title}>Sales Amount</h4>
			</header>
			<div className={`${styles.article_sales} ${styles.article_image}`}>
				<CartIcon className={styles.article_icon} />
			</div>
			<span className={styles.article_balance}>
				<ArrowIcon className={`${styles.article_balanceIcon} ${styles.article_balanceIconIncrement}`} />
				{`${20}%`}
				<span className={styles.article_balanceText}> this week</span>
			</span>
		</article>
	)
}
