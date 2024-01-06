"use client"
import { Modal } from '@/app/components/Modal/Modal'
import { CancelIcon, UpdateIcon, UploadIcon } from '@/app/SVG/componentsSVG'
import { IAlertInventory, IProductInventory, TextFieldType } from '@/app/Types/types'
import { inventorySchema } from '@/app/validations/inventorySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button/Button'
import { TextField } from '../../components/TextField/TextField'
import styles from './itemcard.module.scss'

interface IForm {
    inventoryQuantity: string
    minimuninventoryQuantity: string
}

interface Props {
    product: IProductInventory
    alerts: IAlertInventory[]
}

export default function ItemCard({ product, alerts }: Props) {
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const { control, formState: { errors, isValid }, handleSubmit, getValues } = useForm<IForm>({ defaultValues: { inventoryQuantity: product.inventoryQuantity.toString(), minimuninventoryQuantity: product.minimuninventoryQuantity.toString() }, resolver: zodResolver(inventorySchema) })

    const HandleUpdateStock = async (id: number) => {
        if (isValid) {
            try {
                const response = await axios.put(`http://localhost:3000/api/products/${id}`, { inventoryQuantity: getValues("inventoryQuantity"), minimuninventoryQuantity: getValues("minimuninventoryQuantity") })
                if (response.status === 200) {
                    setOpenModal(false)
                    router.refresh()
                    enqueueSnackbar("Stock updated", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "center" } })
                }
            } catch (error) {
                console.error(error)
                enqueueSnackbar("Error updating stock", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
            }
        }
    }

    const GetAlertOfProduct = () => {
        if (product.inventoryQuantity > (product.minimuninventoryQuantity) && product.inventoryQuantity < product.minimuninventoryQuantity + alerts[0].quantity) return alerts[0].name
        if (product.inventoryQuantity < (product.minimuninventoryQuantity) && product.inventoryQuantity > 0) return alerts[1].name
        if (product.inventoryQuantity === 0) return "out of stock"
        else return "normal"
    }

    const AlertName = GetAlertOfProduct()

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={styles.header_sku}>{product.sku}</span>
                <span className={styles.header_category}>{product.category}</span>
            </header>
            <section className={styles.section}>
                <Image className={styles.section_image} src={product.image} alt={product.title} width={100} height={100} />
                <h2 className={styles.section_title}>{product.title.split(",")[0]}</h2>
                <Image className={styles.section_brand} src={product.brandLogo} alt={product.title} width={50} height={50} />
                {<span className={`
                ${styles.section_status} ${AlertName === "low stock" && styles.section_statusLow} 
                ${AlertName === "critical stock" && styles.section_statusCritical} 
                ${AlertName === "out of stock" && styles.section_statusOutStock}
                ${AlertName === "normal" && styles.section_statusNormal}`
                }>{GetAlertOfProduct()}</span>}
            </section>
            <footer className={styles.footer}>
                <span className={styles.footer_quantity}>{product.inventoryQuantity}<span className={styles.footer_quantityText}> available</span></span>
                <Button className={styles.footer_button}
                    title="Update stock"
                    buttonProps={{
                        onClick: () => setOpenModal(true),
                        text: "Update stock",
                        type: "button",

                    }}
                />
            </footer>
            {openModal &&
                <Modal title='Update Stock'>
                    <form className={styles.form} onSubmit={handleSubmit((data) => console.log(data))}>
                        <h2 className={styles.form_title}>{product.sku}</h2>
                        <TextField textFieldProps={{
                            label: "Inventory Quantity",
                            name: "inventoryQuantity",
                            type: TextFieldType.Number,
                            value: product.inventoryQuantity.toString(),
                            controlExt: control,
                            step: "1",
                            error: errors.inventoryQuantity?.message,
                            onChange: () => { }
                        }} />
                        <TextField textFieldProps={{
                            label: "Minimum Quantity",
                            name: "minimuninventoryQuantity",
                            type: TextFieldType.Number,
                            controlExt: control,
                            value: product.minimuninventoryQuantity.toString(),
                            error: errors.minimuninventoryQuantity?.message,
                            step: "1",
                            onChange: () => { }
                        }} />
                        <div className={styles.buttons}>
                            <Button
                                title='Update Stock'
                                buttonProps={{
                                    text: "Update",
                                    type: "submit",
                                    iconButton: <UpdateIcon />,
                                    onClick: () => HandleUpdateStock(product.id),
                                }}
                            />
                            <Button
                                title='Cancel'
                                buttonProps={{
                                    text: "Cancel",
                                    type: "button",
                                    iconButton: <CancelIcon />,
                                    onClick: () => setOpenModal(false),
                                    isSecondary: true,
                                }}
                            />
                        </div>
                    </form>
                </Modal>}
        </article>
    )
}