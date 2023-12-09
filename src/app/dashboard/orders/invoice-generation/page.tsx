"use client"
import { AddIcon, DeleteIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { TextFieldType } from "@/app/Types/types"
import { FormattedDate, FormattedString } from "@/app/utils/functions"
import { enqueueSnackbar } from "notistack"
import { ChangeEvent, useState } from "react"
import { Button } from "@/mainComponents/Button/Button"
import { ComboBox } from "@/mainComponents/ComboBox/ComboBox"
import { TextField } from "@/mainComponents/TextField/TextField"
import styles from "./invoice.module.scss"

interface IProductInvoice {
    id: string
    item: string
    quantity: number
    cost: number
    amount: number
}

interface IDates {
    issueDate: string
    dueDate: string
}

export default function () {
    const [subtotal, setSubtotal] = useState<number>(0)
    const [customer, setCustomer] = useState<string>("")
    const [payment, setPayment] = useState<string>("")
    const [dates, setDates] = useState<IDates>({ issueDate: FormattedDate(new Date()), dueDate: "" })
    const [products, setProducts] = useState<IProductInvoice[]>([{ id: crypto.randomUUID(), item: "", quantity: 0, cost: 0, amount: 0 }])

    const HandleChageProducts = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        const prevProducts = [...products]
        if (name === "item") {
            prevProducts[index][name] = value
        }
        if (name === "quantity" || name === "cost") {
            prevProducts[index][name] = Number(value)
            prevProducts[index].amount = prevProducts[index].quantity * prevProducts[index].cost
        }
        let subtotalAmount = 0
        for (let index = 0; index < products.length; index++) {
            subtotalAmount += products[index].amount
        }
        setSubtotal(subtotalAmount)
        setProducts(prevProducts)
    }

    const HandleChageFields = (e: ChangeEvent<HTMLInputElement>) => {


    }

    const HandleChageDates = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setDates({ ...dates, [name]: value })
    }

    const HandleChageBillTo = (value: string) => {
        setCustomer(value)
    }

    const HandleChagePayment = (value: string) => {
        setPayment(value)
    }

    const HandleSave = () => {
        enqueueSnackbar("Invoice successfully created", { variant: "success", anchorOrigin: { horizontal: "center", vertical: "top" } })
    }

    console.log(dates)

    const HandleAddProduct = () => {
        const newProduct: IProductInvoice = { id: crypto.randomUUID(), item: "", quantity: 0, cost: 0, amount: 0 }
        const prevProducts = [...products]
        prevProducts.push(newProduct)
        setProducts(prevProducts)
    }

    const HandleDeleteProduct = (index: number) => {
        const prevProducts = [...products]
        prevProducts.splice(index, 1)
        setProducts(prevProducts)
    }

    return (
        <section className={styles.section}>
            <section className={styles.invoice}>
                <h3 className={styles.invoice_title}>Invoice</h3>
                <div className={styles.invoice_group}>
                    <TextField
                        textFieldProps={{
                            label: "Invoice number",
                            error: false,
                            name: "invoice_number",
                            onChange: HandleChageFields,
                            type: TextFieldType.Search,
                            placeholder: "#0000"
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Order number",
                            error: false,
                            name: "order_number",
                            onChange: HandleChageFields,
                            type: TextFieldType.Text,
                            placeholder: "#0000"
                        }}
                    />
                </div>
                <TextField
                    textFieldProps={{
                        label: "Description",
                        error: false,
                        name: "description",
                        onChange: HandleChageFields,
                        type: TextFieldType.Text,
                        placeholder: "Optional description"
                    }}
                />
                <article className={styles.items}>
                    <header className={styles.items_header}>
                        <ul className={styles.items_headerList}>
                            <li className={styles.items_headerItem}>Items</li>
                            <li className={styles.items_headerItem}>QTY</li>
                            <li className={styles.items_headerItem}>Cost</li>
                            <li className={styles.items_headerItem}>Amount</li>
                        </ul>
                    </header>
                    {products.map((product, index) => (
                        <div key={product.id} className={styles.items_content}>
                            <TextField
                                textFieldProps={{
                                    label: "",
                                    error: false,
                                    name: "item",
                                    onChange: (e) => HandleChageProducts(e, index),
                                    type: TextFieldType.Text,
                                    placeholder: "Name item"
                                }}
                            />
                            <TextField
                                textFieldProps={{
                                    label: "",
                                    error: false,
                                    name: "quantity",
                                    onChange: (e) => HandleChageProducts(e, index),
                                    type: TextFieldType.Number,
                                    placeholder: "0"
                                }}
                            />
                            <TextField
                                textFieldProps={{
                                    label: "",
                                    error: false,
                                    name: "cost",
                                    onChange: (e) => HandleChageProducts(e, index),
                                    type: TextFieldType.Number,
                                    placeholder: "0"
                                }}
                            />
                            <span className={styles.items_contentAmount}>{FormattedString(product.amount)}</span>
                            {index > 0 &&
                                <button className={styles.items_delete} onClick={() => HandleDeleteProduct(index)}>
                                    <DeleteIcon />
                                </button>}
                        </div>
                    ))}
                    <Button className={styles.items_add}
                        title="Add product"
                        buttonProps={{
                            text: "New product",
                            type: "button",
                            onClick: HandleAddProduct,
                            iconButton: <AddIcon />,
                            isSecondary: true
                        }}
                    />
                    <div className={styles.items_totals}>

                        <div className={styles.items_subtotal}>
                            <span className={styles.items_subtotalText}>NET</span>
                            <span className={styles.items_subtotalNumber}>{FormattedString(subtotal)}</span>
                        </div>
                        <div className={styles.items_vat}>
                            <span className={styles.items_subtotal}>IVA(16%)</span>
                            <span className={styles.items_subtotalNumber}>{FormattedString((subtotal / 100) * 16)}</span>
                        </div>
                        <div className={styles.items_total}>
                            <span className={styles.items_totalText}>IVA</span>
                            <span className={styles.items_totalNumber}>{FormattedString(((subtotal / 100) * 16) + subtotal)}</span>
                        </div>

                    </div>
                </article>
            </section>
            <section className={styles.information}>
                <h3 className={styles.information_title}>Information and Payment</h3>
                <ComboBox
                    options={["Javier Hernandez", "Hugo Sanches", "Cristiano Ronaldo"]}
                    value={customer}
                    onValueChange={HandleChageBillTo}
                    label="Bill to"
                    name="bill_to"
                />
                <ComboBox
                    options={["Paypal", "Debit Card"]}
                    value={payment}
                    onValueChange={HandleChagePayment}
                    label="Payment"
                    name="payment"
                />
                <article className={styles.information_dates}>
                    <div className={styles.information_datesGroup}>
                        <label className={styles.information_label}>Issued Date</label>
                        <input disabled className={`${styles.information_date} ${styles.information_dateIssued}`}
                            type={"date"}
                            name="issueDate"
                            value={dates.issueDate}
                            onChange={HandleChageDates}
                        />
                    </div>
                    <div className={styles.information_datesGroup}>
                        <label className={styles.information_label}>Due Date</label>
                        <input className={`${styles.information_date}`}
                            name="dueDate"
                            type={"date"}
                            value={dates.dueDate}
                            onChange={HandleChageDates}
                        />
                    </div>
                </article>
                <div className={styles.information_save}>
                    <Button className={styles.items_add}
                        title="Save"
                        buttonProps={{
                            text: "Save",
                            type: "button",
                            onClick: HandleSave,
                            iconButton: <SaveIcon />
                        }}
                    />
                </div>
            </section>
        </section>
    )
}