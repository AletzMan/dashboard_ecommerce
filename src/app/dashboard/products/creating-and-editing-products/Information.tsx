"use client"
import { useProductInformation } from "@/app/utils/store"
import { TextField } from "../../components/TextField/TextField"
import { ToggleSwitch } from "../../components/ToggleSwitch/ToggleSwitch"
import styles from "./createedit.module.scss"
import { ChangeEvent } from "react"
import { TextFieldType } from "@/app/Types/types"

export function Information() {
	const { productValue, setProductValue, errorEmpty, setErrorEmpty } = useProductInformation()
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
						error: errorEmpty.price,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch
					label="Is Discounted"
					active={productValue.isDiscounted}
					setActive={(e) => setProductValue({ ...productValue, isDiscounted: e.valueOf() as boolean })}
				/>
				<TextField
					textFieldProps={{
						name: "discount",
						label: "Discount:",
						value: productValue.discount.toString(),
						error: false,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
						disabled: !productValue.isDiscounted,
					}}
				/>
			</div>
			<div className={styles.article_delivery}>
				<h4 className={styles.article_deliveryTitle}>Shipping and pickup</h4>
				<ToggleSwitch
					label="Same day delivery"
					active={productValue.sameDayDelivery}
					setActive={(e) => setProductValue({ ...productValue, sameDayDelivery: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Store PickUp"
					active={productValue.storePickUp}
					setActive={(e) => setProductValue({ ...productValue, storePickUp: e.valueOf() as boolean })}
				/>
			</div>
			<div className={styles.article_delivery}>
				<h4 className={styles.article_deliveryTitle}>Status</h4>
				<TextField
					textFieldProps={{
						name: "inventoryQuantity",
						label: "Inventory Quantity:",
						value: productValue.inventoryQuantity.toString(),
						isRequired: true,
						error: errorEmpty.inventoryQuantity,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Number,
					}}
				/>
				<ToggleSwitch label="Is New" active={productValue.isNew} setActive={(e) => setProductValue({ ...productValue, isNew: e.valueOf() as boolean })} />
				<ToggleSwitch
					label="Is Free Shipping"
					active={productValue.isFreeShipping}
					setActive={(e) => setProductValue({ ...productValue, isFreeShipping: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Is Clearance"
					active={productValue.isClearance}
					setActive={(e) => setProductValue({ ...productValue, isClearance: e.valueOf() as boolean })}
				/>
				<ToggleSwitch
					label="Is Sale"
					active={productValue.isSale}
					setActive={(e) => setProductValue({ ...productValue, isSale: e.valueOf() as boolean })}
				/>
			</div>
		</div>
	)
}
