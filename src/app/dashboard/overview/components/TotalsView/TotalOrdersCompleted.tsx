import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"

interface Props {
    title: string
    id: string
}

export async function TotalOrderCompleted(props: Props) {
    const { title, id } = props
    const responseOrders = await axios.get(`http://localhost:3000/api/orders/count/${id}`)

    const orders: number = responseOrders.data.response
    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <span className={styles.article_number}>{orders}</span>
                <h4 className={styles.article_title}>{title}</h4>
            </header>
            <div className={`${styles.article_ordersCompleted} ${styles.article_image}`}>
                <OrdersIcon className={styles.article_icon} />
            </div>

            <span className={styles.article_balance}>
            </span>
        </article>
    )
}
