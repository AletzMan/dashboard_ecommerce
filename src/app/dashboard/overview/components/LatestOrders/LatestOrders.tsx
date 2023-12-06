import axios from "axios"
import styles from "./latestorders.module.scss"
import { IOrder } from "@/app/Types/types"
import Link from "next/link"
import { FormattedString } from "@/app/utils/functions"
import { ArrowIcon, ArrowRightIcon, ViewOffIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"

const classStatus = [
	{ status: "pending", class: styles.order_statusPending },
	{ status: "processing", class: styles.order_statusProcessing },
	{ status: "delivered", class: styles.order_statusDelivered },
	{ status: "cancelled", class: styles.order_statusCancelled },
]

interface IPagination {
	orders: IOrder[]
	totalOrders: number
	totalPages: number
	currentPage: number
	pageSize: number
}


export async function LatestOrders() {
	const response = await axios.get("http://localhost:3000/api/orders")

	const orders: IPagination = response.data.data

	return (
		<div className={`${styles.section} scrollBarStyle`}>
			<article className={styles.table}>
				<ul className={styles.header}>
					<li className={styles.header_title}>ID</li>
					<li className={styles.header_title}>Items</li>
					<li className={styles.header_title}>State</li>
					<li className={styles.header_title}>Status</li>
					<li className={styles.header_title}>Date</li>
					<li className={styles.header_title}>Amount</li>
					<li className={styles.header_title}>Details</li>
				</ul>
				<div className={styles.table_orders}>
					{orders.orders.map((order) => (
						<ul className={styles.order}>
							<li className={`${styles.order_item} ${styles.order_id}`}>{order.id}</li>
							<li className={`${styles.order_item} ${styles.order_products}`}>{order.address_id}</li>
							<li className={`${styles.order_item} ${styles.order_state}`}>{order.state}</li>
							<li className={`${styles.order_item} ${styles.order_status} ${classStatus.find((status) => status.status === order.state)?.class}`}>
								{order.state}
							</li>
							<li className={`${styles.order_item} ${styles.order_date}`}>{order.creation_date}</li>
							<li className={`${styles.order_item} ${styles.order_amount}`}>{FormattedString(order.total_price)}</li>
							<li className={`${styles.order_item}`}>
								<Link className={`${styles.order_details}`} href={`dashboard/orders/order-list/${order.order_id}`} title="View order details">
									<ViewOnIcon className={styles.order_detailsIcon} />
								</Link>
							</li>
						</ul>
					))}
				</div>
			</article>
		</div>
	)
}
