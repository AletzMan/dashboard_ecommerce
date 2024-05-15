import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, OrdersIcon } from "@/app/SVG/componentsSVG"

interface Props {
    title: string
    count: number
    type: "Cancelled" | "Pending" | "On the Way" | "Delivered" | "Total"
}

export async function TotalOrderByState({ count, title, type }: Props) {


    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <span className={styles.article_number}>{count}</span>
                <h4 className={styles.article_title}>{title}</h4>
            </header>
            <div
                className={`${`${styles.article_orders} 
                ${type === "Delivered" && styles.article_ordersCompleted}
                ${type === "Pending" && styles.article_ordersPending}
                ${type === "On the Way" && styles.article_ordersWay}
                ${type === "Cancelled" && styles.article_ordersCancelled}
                `}
                 ${styles.article_image}`}
            >
                <OrdersIcon className={styles.article_icon} />
            </div>
            <span className={styles.article_balance}>
                <ArrowIcon className={styles.article_balanceIcon} />
                {`${Math.round(Math.random() * 25)}%`}
                <span className={styles.article_balanceText}> this week</span>
            </span>
        </article>
    )
}
