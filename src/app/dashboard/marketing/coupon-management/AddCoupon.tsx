"use client"
import { Modal } from "@/app/components/Modal/Modal"
import { CancelIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { ButtonType, TextFieldType } from "@/app/Types/types"
import { CouponSchema } from "@/app/validations/couponSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { enqueueSnackbar, SnackbarProvider } from "notistack"
import { ChangeEvent, FormEvent } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button/Button"
import { TextField } from "../../components/TextField/TextField"
import styles from "./coupons.module.scss"
import { URL_API } from "@/app/Constants/constants"

interface ICoupon {
    code: string
    description: string
    discount: string
    limits: string
    start_date: string
    end_date: string
}


export const AddCoupon = () => {
    const router = useRouter()
    const { control, formState: { errors, isValid }, handleSubmit, getValues } = useForm<ICoupon>({
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
    const HandleSaveCoupon = async () => {
        if (isValid) {
            const values = getValues()
            try {
                const response = await axios.post(`${URL_API}coupons`, {
                    code: values.code,
                    description: values.description,
                    discount: values.discount,
                    limits: values.limits,
                    start_date: new Date(values.start_date).toISOString(),
                    end_date: new Date(values.end_date).toISOString()
                })
                if (response.status === 201) {
                    router.refresh()
                    enqueueSnackbar("Coupon created", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } })
                }
            } catch (error) {
                console.error(error)
                enqueueSnackbar("Error creating coupon", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
            }
        } else {
            enqueueSnackbar("Fill in all fields correctly", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
        }
    }

    const HandleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
    }
    return (
        <form className={styles.modal} onSubmit={handleSubmit((data) => console.log(data))} >
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
                        step: "0.05",
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
            <footer className={styles.modal_footer}>
                <Button title="Save" className={styles.modal_footerButton}
                    buttonProps={
                        {
                            text: "Save",
                            type: "submit",
                            typeButton: ButtonType.WhitIcon,
                            iconButton: <SaveIcon />,
                            onClick: () => HandleSaveCoupon(),
                            isSecondary: false

                        }
                    }
                />
            </footer>

        </form>
    )
}