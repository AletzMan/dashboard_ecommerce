"use client"
import { AddIcon, DeleteIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { TextFieldType } from "@/app/Types/types"
import { FormattedDate, FormattedString } from "@/app/utils/functions"
import { enqueueSnackbar } from "notistack"
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@/mainComponents/Button/Button"
import { ComboBox } from "@/mainComponents/ComboBox/ComboBox"
import { TextField } from "@/mainComponents/TextField/TextField"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import styles from "./invoice.module.scss"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { invoiceSchema } from "@/app/validations/invoiceSchema"

interface IProductInvoice {
	id: string
	item: string
	quantity: number
	cost: number
	amount: number
}

interface IItem {
	id: string
	item: string
	quantity: string
	cost: string
}

interface IDates {
	issueDate: string
	dueDate: string
}

type IInputs = {
	invoice_number: string
	order_number: string
	description: string
	bill_to: string
	items: IItem[]
	payment: string
	//issueDate: string
	dueDate: string
}

export default function () {
	const { handleSubmit, formState, control } = useForm<IInputs>({
		resolver: zodResolver(invoiceSchema),
		defaultValues: { items: [{ id: crypto.randomUUID(), item: "", quantity: "0", cost: "0" }] },
	})
	const { errors, isValid } = formState
	const [subtotal, setSubtotal] = useState<number>(0)
	const [customer, setCustomer] = useState<string>("")
	const [payment, setPayment] = useState<string>("")
	const [dates, setDates] = useState<IDates>({ issueDate: FormattedDate(new Date()), dueDate: "" })
	const { fields, append, remove } = useFieldArray({
		control,
		name: `items`,
	})
	const [products, setProducts] = useState<IProductInvoice[]>([{ id: crypto.randomUUID(), item: "", quantity: 0, cost: 0, amount: 0 }])

	const HandleChangeProducts = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const name = e.target.name
		const value = e.target.value
		const prevProducts = [...products]

		if (name.includes("quantity")) {
			prevProducts[index].quantity = Number(value)
			prevProducts[index].amount = prevProducts[index].quantity * prevProducts[index].cost
		}
		if (name.includes("cost")) {
			prevProducts[index].cost = Number(value)
			prevProducts[index].amount = prevProducts[index].quantity * prevProducts[index].cost
		}

		let subtotalAmount = 0
		for (let index = 0; index < products.length; index++) {
			subtotalAmount += products[index].amount
		}

		setSubtotal(subtotalAmount)
		setProducts(prevProducts)
	}

	const HandleChageFields = (e: ChangeEvent<HTMLInputElement>) => { }

	const HandleChageDates = (e: ChangeEvent<HTMLInputElement>, event: (...event: any[]) => void) => {
		const name = e.currentTarget.name
		const value = e.currentTarget.value
		setDates({ ...dates, [name]: value })
		event(e.target.value)
	}

	const HandleChageBillTo = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setCustomer(value)
	}

	const HandleChagePayment = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setPayment(value)
	}

	const HandleSave = () => {
		if (!isValid) enqueueSnackbar("Invalid fields exist", { variant: "error", anchorOrigin: { horizontal: "center", vertical: "top" } })
		else enqueueSnackbar("Invoice successfully created", { variant: "success", anchorOrigin: { horizontal: "center", vertical: "top" } })
	}

	const HandleAddProduct = () => {
		const newProduct: IProductInvoice = { id: crypto.randomUUID(), item: "", quantity: 0, cost: 0, amount: 0 }
		const prevProducts = [...products]
		prevProducts.push(newProduct)
		setProducts(prevProducts)
		const item: IItem = { id: crypto.randomUUID(), item: "", quantity: "0", cost: "0" }
		append(item)
	}

	const HandleDeleteProduct = (index: number) => {
		const prevProducts = [...products]
		prevProducts.splice(index, 1)
		setProducts(prevProducts)
		remove(index)
	}

	const HandleOnSubmit = (data: IInputs) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(HandleOnSubmit)} className={`${styles.section} scrollBarStyle`}>
			<section className={styles.invoice}>
				<h3 className={styles.invoice_title}>Invoice</h3>
				<div className={styles.invoice_group}>
					<TextField
						textFieldProps={{
							label: "Invoice number",
							onChange: HandleChageFields,
							error: errors.invoice_number?.message,
							name: "invoice_number",
							controlExt: control,
							type: TextFieldType.Search,
							placeholder: "#0000",
						}}
					/>
					<TextField
						textFieldProps={{
							label: "Order number",
							onChange: HandleChageFields,
							error: errors.order_number?.message,
							type: TextFieldType.Number,
							placeholder: "#0000",
							name: "order_number",
							controlExt: control,
						}}
					/>
				</div>
				<TextField
					textFieldProps={{
						label: "Description",
						onChange: HandleChageFields,
						error: errors.description?.message,
						type: TextFieldType.Text,
						placeholder: "Optional description",
						name: "description",
						controlExt: control,
					}}
				/>
				<article className={styles.items}>
					<header className={styles.items_header}>
						<ul className={styles.items_headerList}>
							<li className={styles.items_headerItem}>Items</li>
						</ul>
					</header>
					{fields.map((product, index) => (
						<div key={product.id} className={styles.items_content}>
							<TextField
								textFieldProps={{
									label: "Item name",
									onChange: (e) => HandleChangeProducts(e, index),
									error: errors.items?.[index]?.item?.message,
									controlExt: control,
									name: `items.[${index}].item`,
									type: TextFieldType.Text,
									placeholder: "Name item",
								}}
							/>
							<div className={styles.items_groupCost}>
								<TextField
									textFieldProps={{
										label: "Quantity",
										onChange: (e) => HandleChangeProducts(e, index),
										error: errors.items?.[index]?.quantity?.message,
										controlExt: control,
										name: `items.[${index}].quantity`,
										type: TextFieldType.Number,
										placeholder: "0",
										step: "1",
									}}
								/>
								<TextField
									textFieldProps={{
										label: "Cost",
										onChange: (e) => HandleChangeProducts(e, index),
										error: errors.items?.[index]?.cost?.message,
										name: `items.[${index}].cost`,
										controlExt: control,
										type: TextFieldType.Number,
										placeholder: "0",
										step: "any",
									}}
								/>
							</div>
							<div className={styles.items_groupAmount}>
								<div className={styles.items_labelAmount}>
									<label className={styles.items_contentLabel}>Amount</label>
									<span className={styles.items_contentAmount}>{FormattedString(products[index].amount)}</span>
								</div>
								{index > 0 && (
									<button className={styles.items_delete} onClick={() => HandleDeleteProduct(index)}>
										<DeleteIcon />
									</button>
								)}
							</div>
						</div>
					))}
					<Button
						className={styles.items_add}
						title="Add product"
						buttonProps={{
							text: "New product",
							type: "button",
							onClick: HandleAddProduct,
							iconButton: <AddIcon />,
							isSecondary: true,
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
							<span className={styles.items_totalText}>Total</span>
							<span className={styles.items_totalNumber}>{FormattedString((subtotal / 100) * 16 + subtotal)}</span>
						</div>
					</div>
				</article>
			</section>
			<section className={styles.information}>
				<h3 className={styles.information_title}>Information and Payment</h3>
				<ComboBox
					error={errors.bill_to?.message}
					options={[["Hugo Sanches", "Hugo Sanches"], ["Cristiano Ronaldo", "Cristiano Ronaldo"]]}
					value={customer}
					onValueChange={HandleChageBillTo}
					plaaceholder="Select a customer"
					controlExt={control}
					name="bill_to"
					label="Bill to"
				/>
				<ComboBox
					error={errors.payment?.message}
					options={[["Paypal", "Paypal"], ["Debit Card", "Debit Card"]]}
					value={payment}
					plaaceholder="Select a payment"
					onValueChange={HandleChagePayment}
					label="Payment"
					controlExt={control}
					name="payment"
				/>
				<article className={styles.information_dates}>
					<div className={styles.information_datesGroup}>
						<label className={styles.information_label}>Issued Date</label>
						<input
							disabled
							className={`${styles.information_date} ${styles.information_dateIssued}`}
							type={"date"}
							name="issueDate"
							value={dates.issueDate}
						/>
					</div>
					<div className={styles.information_datesGroup}>
						<label className={styles.information_label}>Due Date</label>
						<Controller
							control={control}
							name="dueDate"
							render={({ field }) => (
								<input
									className={`${styles.information_date} ${errors.dueDate?.message && styles.information_dateError}`}
									type={"date"}
									onChange={(e) => HandleChageDates(e, field.onChange)}
								/>
							)}
						/>
						<p className={styles.information_labelError}>{errors.dueDate?.message}</p>
					</div>
				</article>
				<div className={styles.information_save}>
					<Button
						className={styles.items_add}
						title="Save"
						buttonProps={{
							text: "Save",
							type: "submit",
							onClick: HandleSave,
							iconButton: <SaveIcon />,
						}}
					/>
				</div>
			</section>
		</form>
	)
}
