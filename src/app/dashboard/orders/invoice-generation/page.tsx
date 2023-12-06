"use client"
import { DeleteIcon } from "@/app/SVG/componentsSVG"
import { TextFieldType } from "@/app/Types/types"
import { ChangeEvent, useState } from "react"
import { ComboBox } from "../../components/ComboBox/ComboBox"
import { TextField } from "../../components/TextField/TextField"
import styles from "./invoice.module.scss"

export default async function () {
    const [tax, setTax] = useState<number>(0)

    const HandleChageFields = (e: ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <section className={styles.section}>
            <header>
            </header>
            <section className={styles.invoice}>
                <h3 className={styles.invoice_title}>Invoice</h3>
                <div className={styles.invoice_group}>
                    <TextField
                        textFieldProps={{
                            label: "Invoice number",
                            error: false,
                            name: "invoice_number",
                            onChange: HandleChageFields,
                            type: TextFieldType.Text
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            label: "Order number",
                            error: false,
                            name: "order_number",
                            onChange: HandleChageFields,
                            type: TextFieldType.Text
                        }}
                    />
                </div>
                <TextField
                    textFieldProps={{
                        label: "Description",
                        error: false,
                        name: "description",
                        onChange: HandleChageFields,
                        type: TextFieldType.Text
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
                    <div className={styles.items_content}>
                        <TextField
                            textFieldProps={{
                                label: "",
                                error: false,
                                name: "description",
                                onChange: HandleChageFields,
                                type: TextFieldType.Text
                            }}
                        />
                        <TextField
                            textFieldProps={{
                                label: "",
                                error: false,
                                name: "description",
                                onChange: HandleChageFields,
                                type: TextFieldType.Number
                            }}
                        />
                        <TextField
                            textFieldProps={{
                                label: "",
                                error: false,
                                name: "description",
                                onChange: HandleChageFields,
                                type: TextFieldType.Number
                            }}
                        />
                        <TextField
                            textFieldProps={{
                                label: "",
                                error: false,
                                name: "description",
                                onChange: HandleChageFields,
                                type: TextFieldType.Number
                            }}
                        />
                        <button>
                            <DeleteIcon />
                        </button>
                    </div>
                    <div className={styles.items_tax}>

                        <span className={styles.items_taxLabel}>Tax</span>
                        <ComboBox
                            options={["0", "5", "10", "15"]}
                            value={tax.toString()}
                            onValueChange={HandleChageFields}


                        />
                        <span className={styles.items_taxLabel}>-</span>

                    </div>
                </article>
            </section>
        </section>
    )
}