import { OptionsDateLocal } from "@/app/Constants/constants"
import { IAddress, IOrder } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
import axios from "axios"
import { headers } from "next/headers"
import styles from "../orders.module.scss"

const GetOrder = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/orders/${id}`)
        if (response.status === 200) {
            return response.data.order[0]
        }
    } catch (error) {
        console.error(error)
    }
}

const GetAddress = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/address/${id}`)
        if (response.status === 200) {
            return response.data.address[0]
        }
    } catch (error) {
        console.error(error)
    }
}

export default async function OrderPage() {
    const headersList = headers();
    const pathname = headersList.get("next-url")
    let order: IOrder | undefined = undefined
    let address: IAddress | undefined = undefined

    if (pathname) {
        const id = pathname?.split("/")[3] || ""
        order = await GetOrder(id)
        if (order)
            address = await GetAddress(order?.address_id.toString())
    }

    return (
        <section className={styles.section}>
            <article className={styles.details_header}>
                <h3 className={styles.details_title}>Order ID: <span className={styles.details_titleID}>{order?.order_id}</span></h3>
                <h3 className={styles.details_title}>Order # <span className={styles.details_titleID}>{order?.id}</span></h3>
            </article>
            <article className={styles.details_resumen}>
                {order &&
                    <div className={styles.details_order}>
                        <h4 className={styles.details_orderTitle}>Order Details</h4>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Name</label>
                            <span className={styles.details_fieldText}>{`${order?.name} ${order?.lastname}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Creation Date</label>
                            <span className={styles.details_fieldText}>{new Date(order?.creation_date || "").toLocaleDateString("es-MX", OptionsDateLocal)}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Status</label>
                            <span className={
                                `${styles.details_fieldText} 
                                ${order.state === "Delivered" && styles.details_fieldTextDelivered}
                                ${order.state === "Pending" && styles.details_fieldTextPending}
                                ${order.state === "On the way" && styles.details_fieldTextWay}
                                ${order.state === "Cancelled" && styles.details_fieldTextCancelled}`
                            }>{order?.state}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Amount</label>
                            <span className={`${styles.details_fieldText} ${styles.details_fieldTextAmount}`}>{FormattedString(Number(order?.total_price))}</span>
                        </div>
                    </div>}
                {address &&
                    <div className={styles.details_address}>
                        <h4 className={styles.details_orderTitle}>Delivery Data</h4>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Name</label>
                            <span className={styles.details_fieldText}>{`${address?.name} ${address?.last_name}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Phonenumber</label>
                            <span className={styles.details_fieldText}>{`${address?.phone_number}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Address</label>
                            <span className={styles.details_fieldText}>{`${address?.street_name} ${address?.street_number}, ${address?.colonia} ${address?.postal_code}`}</span>
                            <span className={styles.details_fieldText}>{`${address?.city}, ${address?.state}`}</span>
                        </div>
                    </div>
                }
            </article>

        </section>
    )
}