"use client"

import axios from "axios"
import { enqueueSnackbar } from "notistack"
import { ChangeEvent, useState } from "react"
import { Button } from "../../components/Button/Button"
import styles from "../orders.module.scss"

interface Props {
    id: number
    status: string
}

export function UpdateOrder(props: Props) {
    const { id, status } = props
    const [statusSelect, setStatusSelect] = useState(status)

    const HandleUpdate = async () => {
        try {
            const response = await axios.put(`/api/orders/${id}`, {
                state: statusSelect
            })
            if (response.status === 200) {
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
                                    ${statusSelect === "Delivered" && styles.update_selectDelivered}
                                    ${statusSelect === "Pending" && styles.update_selectPending}
                                    ${statusSelect === "On the way" && styles.update_selectWay}
                                    ${statusSelect === "Cancelled" && styles.update_selectCancelled}`} name="cars" id="cars" value={statusSelect} onChange={(e) => HandleChangeStatus(e)}>
                <option className={`${styles.update_selectDelivered} ${styles.update_option}`} value="Delivered">Delivered</option>
                <option className={`${styles.update_selectPending} ${styles.update_option}`} value="Pending">Pending</option>
                <option className={`${styles.update_selectWay} ${styles.update_option}`} value="On the way">On the way</option>
                <option className={`${styles.update_selectCancelled} ${styles.update_option}`} value="Cancelled">Cancelled</option>
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