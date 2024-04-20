"use client"
import { useProductInformation } from "@/app/utils/store"
import { TextField } from "../../components/TextField/TextField"
import { ToggleSwitch } from "../../components/ToggleSwitch/ToggleSwitch"
import styles from "./createedit.module.scss"
import { ChangeEvent, useEffect } from "react"
import { TextFieldType } from "@/app/Types/types"
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { IInputs } from "./FormProdtc"
import { set } from "zod"

interface Props {
	errors: FieldErrors<IInputs>
	control: Control<IInputs>
	setValue: UseFormSetValue<IInputs>
}

export function Information(props: Props) {
	const { errors, control, setValue } = props
	const { productValue, setProductValue, errorEmpty, setErrorEmpty, loadInformation } = useProductInformation()

	useEffect(() => {
		setValue("price", productValue.price.toString())
		setValue("inventoryQuantity", productValue.inventory_quantity.toString())
		setValue("minimuninventoryQuantity", productValue.minimun_inventory_quantity.toString())
	}, [productValue])

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setProductValue({ ...productValue, [e.target.name]: e.target.value })
		setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}
	return (
		<div className={styles.salesInformation}>
			<div className={styles.article_price}>
				<h4 className={styles.article_deliveryTitle}>Pricing options</h4>
				<TextField
					textFieldProps={{
						name: "price",
						label: "Price:",
						value: productValue.price.toString(),
						isRequired: true,
						error: errors.price?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch
					label="Is Discounted"
					active={productValue.is_discounted}
					setActive={(e) => setProductValue({ ...productValue, is_discounted: e.valueOf() as boolean })}
				/>
				<TextField
					textFieldProps={{
						name: "discount",
						label: "Discount:",
						value: productValue.discount.toString(),
						error: "",
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
						disabled: !productValue.is_discounted,
					}}
				/>
			</div>
			<div className={styles.article_delivery}>
				<h4 className={styles.article_deliveryTitle}>Shipping and pickup</h4>
				<ToggleSwitch
					label="Same day delivery"
					active={productValue.same_day_delivery}
					setActive={(e) => setProductValue({ ...productValue, same_day_delivery: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Store PickUp"
					active={productValue.store_pickUp}
					setActive={(e) => setProductValue({ ...productValue, store_pickUp: e.valueOf() as boolean })}
				/>
			</div>
			<div className={styles.article_delivery}>
				<h4 className={styles.article_deliveryTitle}>Status</h4>
				<TextField
					textFieldProps={{
						name: "inventoryQuantity",
						label: "Inventory Quantity:",
						value: productValue?.inventory_quantity?.toString(),
						isRequired: true,
						error: errors.inventoryQuantity?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<TextField
					textFieldProps={{
						name: "minimuninventoryQuantity",
						label: "Minimum Quantity:",
						value: productValue?.minimun_inventory_quantity?.toString(),
						isRequired: true,
						error: errors.minimuninventoryQuantity?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch label="Is New" active={productValue.is_new} setActive={(e) => setProductValue({ ...productValue, is_new: e.valueOf() as boolean })} />
				<ToggleSwitch
					label="Is Free Shipping"
					active={productValue.is_freeShipping}
					setActive={(e) => setProductValue({ ...productValue, is_freeShipping: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Is Clearance"
					active={productValue.is_clearance}
					setActive={(e) => setProductValue({ ...productValue, is_clearance: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Is Sale"
					active={productValue.is_sale}
					setActive={(e) => setProductValue({ ...productValue, is_sale: e.valueOf() as boolean })}
				/>
			</div>
		</div>
	)
}
