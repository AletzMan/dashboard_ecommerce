import { FormattedString } from "@/app/utils/functions"
import styles from "./topsales.module.scss"
import { IOrderByState } from "@/app/Types/types"

interface Props {
	ordersTop: IOrderByState[] | undefined
}

export function TopSales(props: Props) {
	const { ordersTop } = props
	return (
		<div className={styles.toporders}>
			<h3 className={styles.toporders_title}>Top sales by state</h3>
			{
				<article className={styles.toporders_table}>
					<ul className={styles.toporders_header}>
						<li className={styles.toporders_titles}>No</li>
						<li className={styles.toporders_titles}>State</li>
						<li className={styles.toporders_titles}>Amount</li>
						<li className={styles.toporders_titles}>Orders</li>
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
	)
}
