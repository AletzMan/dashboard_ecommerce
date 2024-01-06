"use client"
import { AddIcon } from "@/app/SVG/componentsSVG"
import { ButtonType } from "@/app/Types/types"
import { useState } from "react"
import { Button } from "../../components/Button/Button"
import { AddCoupon } from "./AddCoupon"
import styles from "./coupons.module.scss"


export const ButtonAddCoupon = () => {
    const [openModal, setOpenModal] = useState(false)

    const HandleAddCoupon = () => {
        setOpenModal(true)
    }

    return (
        <div>

            <Button
                title="Add Coupon"
                buttonProps={
                    {
                        text: "Add Coupon",
                        type: "button",
                        typeButton: ButtonType.WhitIcon,
                        iconButton: <AddIcon />,
                        onClick: () => HandleAddCoupon()
                    }
                } />
            {openModal && <AddCoupon setOpenModal={() => setOpenModal(false)} />}
        </div>
    )
}