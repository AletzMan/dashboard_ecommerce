import styles from "./totalsview.module.scss"
import { ArrowIcon, VisitorsIcon } from "@/app/SVG/componentsSVG"

export async function TotalVisitors() {
	const visitors = 2138
	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{visitors}</span>
				<h4 className={styles.article_title}>Visitors</h4>
			</header>
			<div className={`${styles.article_visitors} ${styles.article_image}`}>
				<VisitorsIcon className={styles.article_icon} />
			</div>
			<span className={styles.article_balance}>
				<ArrowIcon className={styles.article_balanceIcon} />
				{`${20}%`}
				<span className={styles.article_balanceText}> this week</span>
			</span>
		</article>
	)
}
