import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

interface Props {
    title: string
    id: string
}

export async function TotalOrdersByCustomer(props: Props) {
    const { title, id } = props
    const response = await fetch(`${URL_API}orders/statistics/count?user_id=${id}`, { next: { revalidate: 7200, tags: ["ordersCount"] } })
    const responseOrders = await response.json()
    console.log(responseOrders)

    const orders: number = responseOrders.response
    console.log(orders)
    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <h4 className={styles.article_title}>{title}</h4>
                <span className={styles.article_number}>{orders}</span>
            </header>
            <div className={`${styles.article_orders} ${styles.article_image}`}>
                <OrdersIcon className={styles.article_icon} />
            </div>

            <span className={styles.article_balance}>

            </span>
        </article>
    )
}
