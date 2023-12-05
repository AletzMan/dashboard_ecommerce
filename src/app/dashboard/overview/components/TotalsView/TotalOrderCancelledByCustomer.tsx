import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"

interface Props {
    title: string
    id: string
}

export async function TotalOrderCancelledByCustomer(props: Props) {
    const { title, id } = props
    const responseOrders = await axios.get(`http://localhost:3000/api/orders/count/${id}`)

    const orders: number = responseOrders.data.response
    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <h4 className={styles.article_title}>{title}</h4>
                <span className={styles.article_number}>{orders}</span>
            </header>
            <div className={`${styles.article_ordersCancelled} ${styles.article_image}`}>
                <OrdersIcon className={styles.article_icon} />
            </div>

            <span className={styles.article_balance}>
            </span>
        </article>
    )
}
