"use client"

import axios from "axios"
import { enqueueSnackbar } from "notistack"
import { ChangeEvent, useState } from "react"
import { Button } from "../../components/Button/Button"
import styles from "../orders.module.scss"
import { URL_API } from "@/app/Constants/constants"
import { Revailidate } from "@/app/services/actions"

interface Props {
    id: number
    status: string
}

export function UpdateOrder(props: Props) {
    const { id, status } = props
    const [statusSelect, setStatusSelect] = useState(status)

    const HandleUpdate = async () => {
        try {
            const response = await axios.patch(`${URL_API}orders/${id}`, {
                state: statusSelect
            })
            if (response.status === 200) {
                Revailidate("orderDetails")
                Revailidate("orderspage")
                enqueueSnackbar("Order successfully updated", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "center" } })
            }
        } catch (error) {

        }
    }

    const HandleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        setStatusSelect(value)
    }

    return (
        <div className={styles.update}>
            <select className={`${styles.update_select} 
                                    ${statusSelect === "DELIVERED" && styles.update_selectDelivered}
                                    ${statusSelect === "PENDING" && styles.update_selectPending}
                                    ${statusSelect === "ON THE WAY" && styles.update_selectWay}
                                    ${statusSelect === "CANCELLED" && styles.update_selectCancelled}`} name="cars" id="cars" value={statusSelect} onChange={(e) => HandleChangeStatus(e)}>
                <option className={`${styles.update_selectDelivered} ${styles.update_option}`} value="DELIVERED">DELIVERED</option>
                <option className={`${styles.update_selectPending} ${styles.update_option}`} value="PENDING">PENDING</option>
                <option className={`${styles.update_selectWay} ${styles.update_option}`} value="ON THE WAY">ON THE WAY</option>
                <option className={`${styles.update_selectCancelled} ${styles.update_option}`} value="CANCELLED">CANCELLED</option>
            </select>
            <Button
                className={styles.update_button}
                title="Update order"
                buttonProps={{
                    onClick: () => HandleUpdate(),
                    text: "Update",
                    type: "button",

                }}
            />
        </div>
    )
}