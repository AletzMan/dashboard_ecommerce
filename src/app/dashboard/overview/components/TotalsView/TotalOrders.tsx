import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

interface Props {
	title: string
}

const GetOrdersCount = async () => {
	try {
		const response = await fetch(`${URL_API}orders`, { next: { revalidate: 10000, tags: ["totalorders"] } })
		const responseOrders = await response.json()
		const orders = responseOrders.response.totalResults
		return orders
	} catch (error) {
		console.error(error)
		return 0
	}
}

export async function TotalOrders(props: Props) {
	const { title } = props

	const orders: number = await GetOrdersCount()

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
