"use client"
import { Modal } from '@/app/components/Modal/Modal'
import { CancelIcon, UpdateIcon } from '@/app/SVG/componentsSVG'
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
import { Categories, URL_API } from '@/app/Constants/constants'
import { Revailidate } from '@/app/services/actions'

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
    const { control, formState: { errors, isValid }, handleSubmit, getValues } = useForm<IForm>({ defaultValues: { inventoryQuantity: product.inventory_quantity.toString(), minimuninventoryQuantity: product.minimun_inventory_quantity.toString() }, resolver: zodResolver(inventorySchema) })

    const HandleUpdateStock = async (id: number) => {
        if (isValid) {
            try {
                const response = await axios.put(`${URL_API}products/stock/${id}`, { inventory_quantity: getValues("inventoryQuantity"), minimun_inventory_quantity: getValues("minimuninventoryQuantity") })
                if (response.status === 200) {
                    setOpenModal(false)
                    router.refresh()
                    Revailidate("inventoryPage")
                    enqueueSnackbar("Stock updated", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "center" } })
                }
            } catch (error) {
                console.error(error)
                enqueueSnackbar("Error updating stock", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
            }
        }
    }

    const GetAlertOfProduct = () => {
        if (product.inventory_quantity > (product.minimun_inventory_quantity) && product.inventory_quantity < product.minimun_inventory_quantity + alerts[0]?.quantity) return alerts[0].name
        if (product.inventory_quantity < (product.minimun_inventory_quantity) && product.inventory_quantity > 0) return alerts[1].name
        if (product.inventory_quantity === 0) return "out of stock"
        else return "normal"
    }

    const AlertName = GetAlertOfProduct()

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={styles.header_sku}>{product.sku}</span>
                <span className={styles.header_category}>{Categories.items.find(category => category.id.toString() === product.category)?.name}</span>
            </header>
            <section className={styles.section}>
                <Image className={styles.section_image} src={product.image} alt={product.title} width={100} height={100} />
                <h2 className={styles.section_title}>{product.title.split(",")[0]}</h2>
                <Image className={styles.section_brand} src={product.brand_logo} alt={product.title} width={50} height={50} />
                {<span className={`
                ${styles.section_status} ${AlertName === "low stock" && styles.section_statusLow} 
                ${AlertName === "critical stock" && styles.section_statusCritical} 
                ${AlertName === "out of stock" && styles.section_statusOutStock}
                ${AlertName === "normal" && styles.section_statusNormal}`
                }>{GetAlertOfProduct()}</span>}
            </section>
            <footer className={styles.footer}>
                <span className={styles.footer_quantity}>{product.inventory_quantity}<span className={styles.footer_quantityText}> available</span></span>
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
                <Modal title='Update Stock' viewModal={openModal} onClick={() => setOpenModal(false)}>
                    <form className={styles.form} onSubmit={handleSubmit((data) => console.log(data))}>
                        <h2 className={styles.form_title}>{product.sku}</h2>
                        <TextField textFieldProps={{
                            label: "Inventory Quantity",
                            name: "inventoryQuantity",
                            type: TextFieldType.Number,
                            value: product.inventory_quantity.toString(),
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
                            value: product.minimun_inventory_quantity.toString(),
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