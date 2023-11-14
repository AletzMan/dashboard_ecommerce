"use client"

import { useState, useEffect } from "react"
import styles from "./mexicomap.module.scss"
import axios from "axios"
import { IOrderByState } from "@/app/Types/types"
import { Map } from "./components/Map"
import { FormattedString, GetSalesRank } from "@/app/utils/functions"
import { generateRandomOrders } from "@/app/utils/mockdata"

export function MexicoMap() {
	const [orders, setOrders] = useState<IOrderByState[] | undefined>(undefined)
	const [ordersTop, setOrdersTop] = useState<IOrderByState[] | undefined>(undefined)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		GetSalesbyState()
	}, [])

	const GetSalesbyState = async () => {
		try {
			setLoading(true)
			const response = await axios.get("/api/orders?sort=state")
			if (response.status === 200) {
				const ordersData: IOrderByState[] = response.data.response

				setOrders(ordersData)
				ordersData.sort((a, b) => {
					if (a.amount > b.amount) {
						return -1
					}
					if (a.amount < b.amount) {
						return 1
					}
					return 0
				})
				const ordersFilter = ordersData.filter((data, index) => index < 10)
				setOrdersTop(ordersFilter)
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
		}
	}
	return (
		<section className={styles.section}>
			{orders && <Map orders={orders} />}
			{!loading && (
				<div className={styles.toporders}>
					<h3 className={styles.toporders_title}>Top sales by state</h3>
					{
						<article className={styles.toporders_table}>
							<ul className={styles.toporders_header}>
								<li className={styles.toporders_titles}>No</li>
								<li className={styles.toporders_titles}>State</li>
								<li className={styles.toporders_titles}>Amount</li>
								<li className={styles.toporders_titles}> Quantity Orders</li>
							</ul>
							{ordersTop?.map((data, index) => (
								<ul className={styles.toporders_data} key={data.id}>
									<li className={styles.toporders_state}>{index + 1}</li>
									<li className={styles.toporders_state}>{data.state}</li>
									<li className={styles.toporders_amount}>{FormattedString(data.amount)}</li>
									<li className={styles.toporders_orders}>{data.orders}</li>
								</ul>
							))}
						</article>
					}
				</div>
			)}
		</section>
	)
}
