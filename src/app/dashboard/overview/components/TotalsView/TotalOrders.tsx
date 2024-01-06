import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"

interface Props {
	title: string
}

const GetOrdersCount = async () => {
	try {
		const responseOrders = await axios.get("http://localhost:3000/api/orders/count")
		return responseOrders.data.response
	} catch (error) {
		//console.log(error)
		return 0
	}
}

export async function TotalOrders(props: Props) {
	const { title } = props

	const orders: number = await GetOrdersCount()

	console.log("ORDERS: ", orders)
	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{orders}</span>
				<h4 className={styles.article_title}>{title}</h4>
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
	)
}
