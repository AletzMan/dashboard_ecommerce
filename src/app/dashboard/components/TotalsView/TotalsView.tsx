import { FormattedString } from "@/app/utils/functions"
import styles from "./totalsview.module.scss"
import { CartIcon, ConversionIcon, CustomersIcon, OrdersIcon, ProductsIcon, SpendingIcon, VisitorsIcon } from "@/app/SVG/componentsSVG"

export function TotalsView() {
	return (
		<>
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>{FormattedString(325000)}</span>
					<h4 className={styles.article_title}>Sales</h4>
				</header>
				<div className={`${styles.article_sales} ${styles.article_image}`}>
					<CartIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>{235}</span>
					<h4 className={styles.article_title}>Orders</h4>
				</header>
				<div className={`${styles.article_orders} ${styles.article_image}`}>
					<OrdersIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
			{/*<article className={styles.article}>
				<header className={styles.article_header}>
					<h4 className={styles.article_title}>Spending</h4>
				</header>
				<div className={`${styles.article_spending} ${styles.article_image}`}>
					<SpendingIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_number}>{FormattedString(87000)}</span>
	</article>*/}
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>375</span>
					<h4 className={styles.article_title}>Products</h4>
				</header>
				<div className={`${styles.article_products} ${styles.article_image}`}>
					<ProductsIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>234</span>
					<h4 className={styles.article_title}>Customers</h4>
				</header>
				<div className={`${styles.article_customers} ${styles.article_image}`}>
					<CustomersIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>1049</span>
					<h4 className={styles.article_title}>Visitors</h4>
				</header>
				<div className={`${styles.article_visitors} ${styles.article_image}`}>
					<VisitorsIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
			<article className={styles.article}>
				<header className={styles.article_header}>
					<span className={styles.article_number}>22%</span>
					<h4 className={styles.article_title}>Conversion Rate</h4>
				</header>
				<div className={`${styles.article_conversion} ${styles.article_image}`}>
					<ConversionIcon className={styles.article_icon} />
				</div>
				<span className={styles.article_balance}>{`${20}%`}</span>
			</article>
		</>
	)
}
