"use client"
import { useProductInformation } from "@/app/utils/store"
import { TextField } from "../../components/TextField/TextField"
import { ToggleSwitch } from "../../components/ToggleSwitch/ToggleSwitch"
import styles from "./createedit.module.scss"
import { ChangeEvent, useEffect } from "react"
import { TextFieldType } from "@/app/Types/types"
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { IInputs } from "./FormProduct"
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
		setValue("price", productValue?.price?.toString())
		setValue("inventory_quantity", productValue?.inventory_quantity?.toString())
		setValue("minimun_inventory_quantity", productValue?.minimun_inventory_quantity?.toString())
	}, [productValue])

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setProductValue({ ...productValue, [e.target.name]: e.target.value })
		setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}

	const HandleChecked = (e: ChangeEvent<HTMLInputElement>) => {
		setProductValue({ ...productValue, [e.target.name]: e.target.checked })
		setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}


	return (
		<div className={styles.salesInformation}>
			<fieldset className={styles.article_price}>
				<legend className={styles.article_deliveryTitle}>Pricing options</legend>
				<TextField
					textFieldProps={{
						name: "price",
						label: "Price:",
						value: productValue?.price?.toString(),
						isRequired: true,
						error: errors.price?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch
					name="is_discounted"
					label="Is Discounted"
					controlExt={control}
					active={productValue.is_discounted}
					onChanges={(e) => HandleChecked(e)}
				/>
				<TextField
					textFieldProps={{
						name: "discount",
						label: "Discount:",
						value: productValue?.discount?.toString(),
						error: errors.discount?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
						disabled: !productValue.is_discounted,
					}}
				/>
			</fieldset>
			<fieldset className={styles.article_delivery}>
				<legend className={styles.article_deliveryTitle}>Shipping and pickup</legend>
				<ToggleSwitch
					name="same_day_delivery"
					label="Same day delivery"
					active={productValue.same_day_delivery}
					onChanges={(e) => HandleChecked(e)}
				/>
				<ToggleSwitch
					name="store_pickUp"
					label="Store PickUp"
					active={productValue.store_pickUp}
					onChanges={(e) => HandleChecked(e)}
				/>
			</fieldset>
			<fieldset className={styles.article_delivery}>
				<legend className={styles.article_deliveryTitle}>Status</legend>
				<TextField
					textFieldProps={{
						name: "inventory_quantity",
						label: "Inventory Quantity:",
						value: productValue?.inventory_quantity?.toString(),
						isRequired: true,
						error: errors?.inventory_quantity?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<TextField
					textFieldProps={{
						name: "minimun_inventory_quantity",
						label: "Minimum Quantity:",
						value: productValue?.minimun_inventory_quantity?.toString(),
						isRequired: true,
						error: errors.minimun_inventory_quantity?.message,
						controlExt: control,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch name="is_new" label="Is New" active={productValue.is_new} onChanges={(e) => HandleChecked(e)} />
				<ToggleSwitch
					name="is_freeShipping"
					label="Is Free Shipping"
					active={productValue.is_freeShipping}
					onChanges={(e) => HandleChecked(e)}
				/>
				<ToggleSwitch
					name="is_clearance"
					label="Is Clearance"
					active={productValue.is_clearance}
					onChanges={(e) => HandleChecked(e)}
				/>
				<ToggleSwitch
					name="is_sale"
					label="Is Sale"
					active={productValue.is_sale}
					onChanges={(e) => HandleChecked(e)}
				/>
			</fieldset>
		</div>
	)
}
