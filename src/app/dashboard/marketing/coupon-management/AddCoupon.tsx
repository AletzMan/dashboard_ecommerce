"use client"
import { Modal } from "@/app/components/Modal/Modal"
import { CancelIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { ButtonType, TextFieldType } from "@/app/Types/types"
import { CouponSchema } from "@/app/validations/couponSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { enqueueSnackbar, SnackbarProvider } from "notistack"
import { ChangeEvent, FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button/Button"
import { TextField } from "../../components/TextField/TextField"
import styles from "./coupons.module.scss"
import { URL_API } from "@/app/Constants/constants"
import { Revailidate } from "@/app/services/actions"

interface ICoupon {
    code: string
    description: string
    discount: string
    limits: string
    start_date: string
    end_date: string
}


export const AddCoupon = () => {
    const [created, setCreated] = useState(false)
    const router = useRouter()
    const { control, formState: { errors }, handleSubmit, reset } = useForm<ICoupon>({
        resolver: zodResolver(CouponSchema),
        defaultValues: {
            code: "",
            description: "",
            discount: "",
            limits: "",
            start_date: "",
            end_date: ""
        }
    })
    const HandleSaveCoupon = async (data: ICoupon) => {
        try {
            const response = await axios.post(`${URL_API}coupons`, data)
            if (response.status === 201) {
                setCreated(true)
                setTimeout(() => {
                    setCreated(false)
                    reset()
                }, 100);
                router.refresh()
                Revailidate("getcoupons")
                enqueueSnackbar("Coupon created", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } })
            }
        } catch (error) {
            console.error(error)
            enqueueSnackbar("Error creating coupon", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
        }

    }

    const HandleError = () => {
        enqueueSnackbar("Fill in all fields correctly", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
    }

    const HandleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
    }
    return (
        <form className={styles.modal} onSubmit={handleSubmit(HandleSaveCoupon, HandleError)} >
            {!created &&
                <section className={styles.modal_section}>
                    <TextField
                        textFieldProps={{
                            label: "Code",
                            type: TextFieldType.Text,
                            placeholder: "Code",
                            onChange: () => { },
                            error: errors.code?.message,
                            name: "code",
                            controlExt: control
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Description",
                            type: TextFieldType.Text,
                            placeholder: "Description",
                            onChange: () => { },
                            error: errors.description?.message,
                            name: "description",
                            controlExt: control
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Discount",
                            type: TextFieldType.Number,
                            placeholder: "Discount",
                            onChange: () => { },
                            error: errors.discount?.message,
                            name: "discount",
                            controlExt: control,
                            step: "0.01",
                            help: "Discount in percentage format (0.05 = 5%)"
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Limits",
                            type: TextFieldType.Number,
                            placeholder: "Limits",
                            onChange: () => { },
                            error: errors.limits?.message,
                            name: "limits",
                            controlExt: control,
                            step: "1",
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Start date",
                            type: TextFieldType.DateTime,
                            placeholder: "Start date",
                            onChange: (e) => HandleChangeDate(e),
                            error: errors.start_date?.message,
                            name: "start_date",
                            controlExt: control
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "End date",
                            type: TextFieldType.DateTime,
                            placeholder: "End date",
                            onChange: (e) => HandleChangeDate(e),
                            error: errors.end_date?.message,
                            name: "end_date",
                            controlExt: control
                        }}
                    />
                </section>
            }
            <footer className={styles.modal_footer}>
                <Button title="Save" className={styles.modal_footerButton}
                    buttonProps={
                        {
                            text: "Save",
                            type: "submit",
                            typeButton: ButtonType.WhitIcon,
                            iconButton: <SaveIcon />,
                            onClick: () => { },
                            isSecondary: false

                        }
                    }
                />
            </footer>

        </form>
    )
}