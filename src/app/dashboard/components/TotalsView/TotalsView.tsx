import { FormattedString } from "@/app/utils/functions"
import styles from "./totalsview.module.scss"
import {
	ArrowDownIcon,
	ArrowDownLineIcon,
	ArrowIcon,
	CartIcon,
	ConversionIcon,
	CustomersIcon,
	OrdersIcon,
	ProductsIcon,
	VisitorsIcon,
} from "@/app/SVG/componentsSVG"
import axios from "axios"

export async function TotalsView() {
	const responseSales = await axios.get("http://localhost:3000/api/sales/count")
	const sales: number = responseSales.data.response
	const responseOrders = await axios.get("http://localhost:3000/api/orders/count")
	const orders: number = responseOrders.data.response
	const responseProducts = await axios.get("http://localhost:3000/api/products/count")
	const products: number = responseProducts.data.response
	const responseCustomers = await axios.get("http://localhost:3000/api/customers/count")
	const customers: number = responseCustomers.data.response
	const visitors = 2138
	return (
		<>
			<div className={styles.section}>
				<article className={styles.article}>
					<header className={styles.article_header}>
						<span className={styles.article_number}>{FormattedString(sales)}</span>
						<h4 className={styles.article_title}>Sales</h4>
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
				<article className={styles.article}>
					<header className={styles.article_header}>
						<span className={styles.article_number}>{orders}</span>
						<h4 className={styles.article_title}>Orders</h4>
					</header>
					<div className={`${styles.article_orders} ${styles.article_image}`}>
						<OrdersIcon className={styles.article_icon} />
					</div>

					<span className={styles.article_balance}>
						<ArrowIcon className={styles.article_balanceIcon} />
						{`${20}%`}
						<span className={styles.article_balanceText}> this week</span>
					</span>
				</article>
			</div>
			<div className={styles.section}>
				<article className={styles.article}>
					<header className={styles.article_header}>
						<span className={styles.article_number}>{products}</span>
						<h4 className={styles.article_title}>Products</h4>
					</header>
					<div className={`${styles.article_products} ${styles.article_image}`}>
						<ProductsIcon className={styles.article_icon} />
					</div>
					<span className={styles.article_balance}>
						<ArrowIcon className={styles.article_balanceIcon} />
						{`${20}%`}
						<span className={styles.article_balanceText}> this week</span>
					</span>
				</article>
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
			</div>
			<div className={styles.section}>
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
			</div>
		</>
	)
}
