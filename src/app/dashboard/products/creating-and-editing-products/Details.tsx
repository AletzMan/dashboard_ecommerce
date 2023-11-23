"use client"
import { ChangeEvent, useState } from "react"
import { TextField } from "../../components/TextField/TextField"
import styles from "./createedit.module.scss"
import { ButtonType, IAttribute, ICharacteristicProduct, TextFieldType } from "@/app/Types/types"
import { AddIcon, DeleteIcon, RemoveIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import { useProductInformation } from "@/app/utils/store"

export function Details() {
	const { setProductValue, productValue } = useProductInformation()
	const [detailsProduct, setDetailsProduct] = useState<ICharacteristicProduct[]>([
		{ id: crypto.randomUUID(), name: "New characteristic", attributes: [{ id: crypto.randomUUID(), name: "New attribute", value: "0" }] },
	])
	const [remove, setRemove] = useState({ remove: false, index: NaN })

	const HandleAddAttribute = (index: number) => {
		const newAttribute: IAttribute = { id: crypto.randomUUID(), name: "New attributte", value: "0" }
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics[index].attributes.push(newAttribute)
		setDetailsProduct(prevCharacteristics)
	}

	const HandleRemoveAttribute = (indexCharacteristic: number, indexAttributte: number) => {
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics[indexCharacteristic]?.attributes.splice(indexAttributte, 1)
		setDetailsProduct(prevCharacteristics)
	}

	const HandleAddCharacteristic = () => {
		const newCharacteristic: ICharacteristicProduct = {
			id: crypto.randomUUID(),
			name: "New characteristic",
			attributes: [{ id: crypto.randomUUID(), name: "New attribute", value: "0" }],
		}
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics.push(newCharacteristic)
		setDetailsProduct(prevCharacteristics)
	}

	const HandleRemoveCharacteristic = (indexCharacteristic: number) => {
		setRemove({ remove: true, index: indexCharacteristic })
		setTimeout(() => {
			RemoveCharacteristic(indexCharacteristic)
		}, 500)
	}

	const RemoveCharacteristic = (indexCharacteristic: number) => {
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics.splice(indexCharacteristic, 1)
		setDetailsProduct(prevCharacteristics)
		setRemove({ remove: false, index: NaN })
	}

	const HandleChangeCharacteristic = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const prevCharacteristics = [...detailsProduct]
		const newName = e.currentTarget.value
		prevCharacteristics[index].name = newName
		setDetailsProduct(prevCharacteristics)
		setProductValue({ ...productValue, specs: prevCharacteristics })
	}
	const HandleChangeAttribute = (e: ChangeEvent<HTMLInputElement>, indexCharacteristic: number, indexAttribute: number) => {
		const prevCharacteristics = [...detailsProduct]
		const newName = e.currentTarget.value
		const nameField = e.currentTarget.name
		if (nameField === "name" || nameField === "value") {
			prevCharacteristics[indexCharacteristic].attributes[indexAttribute][nameField] = newName
		}
		setDetailsProduct(prevCharacteristics)
		setProductValue({ ...productValue, specs: prevCharacteristics })
	}

	return (
		<div className={styles.details}>
			<h3 className={styles.article_sectionTitle}>Details product</h3>
			<div className={styles.details_characteristics}>
				<h3 className={styles.details_title}>Characteristics</h3>
				{detailsProduct.map((characteristic, indexCharacteristic) => (
					<div
						key={characteristic.id}
						className={`${styles.details_characteristic} ${remove.remove && remove.index === indexCharacteristic && styles.details_characteristicNone}`}
					>
						{indexCharacteristic > 0 && (
							<button
								className={styles.details_characteristicRemove}
								onClick={() => HandleRemoveCharacteristic(indexCharacteristic)}
								title="Delete characteristic"
							>
								<DeleteIcon />
							</button>
						)}
						<TextField
							textFieldProps={{
								name: "characteristic",
								label: "Characteristic name:",
								value: detailsProduct[indexCharacteristic].name,
								error: false,
								onChange: (e) => HandleChangeCharacteristic(e, indexCharacteristic),
								type: TextFieldType.Text,
							}}
						/>
						<div className={styles.details_attributes}>
							<h4 className={styles.details_attributesTitle}>Attributes</h4>
							<Button
								className={styles.details_addAttribute}
								buttonProps={{
									onClick: () => HandleAddAttribute(indexCharacteristic),
									text: "Attribute",
									type: "button",
									typeButton: ButtonType.WhitIcon,
									iconButton: <AddIcon />,
									isSecondary: true,
								}}
								title="Add characteristic"
							/>

							{characteristic.attributes.map((attribute, indexAttribute) => (
								<div key={attribute.id} className={styles.details_attribute}>
									<TextField
										textFieldProps={{
											name: "name",
											label: "Attribute:",
											value: detailsProduct[indexCharacteristic].attributes[indexAttribute].name,
											error: false,
											onChange: (e) => HandleChangeAttribute(e, indexCharacteristic, indexAttribute),
											type: TextFieldType.Text,
										}}
									/>
									<TextField
										textFieldProps={{
											name: "value",
											label: "Value:",
											value: detailsProduct[indexCharacteristic].attributes[indexAttribute].value,
											error: false,
											onChange: (e) => HandleChangeAttribute(e, indexCharacteristic, indexAttribute),
											type: TextFieldType.Text,
										}}
									/>
									{indexAttribute > 0 && (
										<button
											className={styles.details_attributeRemove}
											onClick={() => HandleRemoveAttribute(indexCharacteristic, indexAttribute)}
											title="Delete attribute"
										>
											<RemoveIcon />
										</button>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<Button
				className={styles.details_addFeature}
				buttonProps={{
					onClick: HandleAddCharacteristic,
					text: "Add Characteristic",
					type: "button",
					typeButton: ButtonType.WhitIcon,
					iconButton: <AddIcon />,
					isSecondary: true,
				}}
				title="Add characteristic"
			/>
		</div>
	)
}
