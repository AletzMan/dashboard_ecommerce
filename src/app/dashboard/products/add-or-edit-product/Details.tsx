"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TextField } from "../../components/TextField/TextField"
import styles from "./createedit.module.scss"
import { ButtonType, IAttribute, ICharacteristicProduct, ProductType, TextFieldType } from "@/app/Types/types"
import { AddIcon, ArrowDownIcon, ArrowDownLineIcon, ArrowDownSolidtIcon, DeleteIcon, RemoveIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import { useProductInformation } from "@/app/utils/store"
import { IProduct, IProductCharacteristic } from "@/app/interfaces/product"
import { Control, FieldErrors, UseFormGetValues, useFieldArray } from "react-hook-form"
import { IInputs } from "./FormProduct"

interface Props {
	productSelect?: IProduct
	control: Control<IInputs>
	errors: FieldErrors<IInputs>
	getValues: UseFormGetValues<IInputs>
	reset: boolean
}

export function Details({ productSelect, control, getValues, errors, reset }: Props) {
	const { setProductValue, productValue, loadInformation, EmptyProduct } = useProductInformation()
	const [detailsProduct, setDetailsProduct] = useState<IProductCharacteristic[]>([
		{ id: crypto.randomUUID(), name: "", attributes: [{ id: crypto.randomUUID(), name: "", value: "" }] }
	])
	const [removeField, setRemoveField] = useState({ remove: false, index: NaN })
	const detailsRef = useRef<HTMLDivElement | null>(null)
	const { fields: Characteristics, append, remove, update, replace } = useFieldArray({
		control,
		name: `details`,
	})

	useEffect(() => {
		if (reset) {
			const newItems = { id: crypto.randomUUID(), name: "", attributes: [{ id: crypto.randomUUID(), name: "", value: "" }] }
			replace(newItems)
			setDetailsProduct([newItems])
		}
	}, [reset])


	useEffect(() => {
		if (productValue?.specs?.details?.length === 0) {
			const newCharacteristic: IProductCharacteristic = {
				id: crypto.randomUUID(),
				name: "",
				attributes: [{ id: crypto.randomUUID(), name: "", value: "" }],
			}
			const newDetailsProduct = [...detailsProduct]
			newDetailsProduct.push(newCharacteristic)
			setDetailsProduct(newDetailsProduct)
		} else {
			setDetailsProduct(productValue?.specs?.details)
			productValue?.specs?.details.map((product, index) => {
				update(index, product)
				return
			})
		}

	}, [loadInformation])

	const HandleAddAttribute = (index: number) => {
		const newAttribute: IAttribute = { id: crypto.randomUUID(), name: "", value: "" }
		const prevCharacteristics: IProductCharacteristic[] = [...Characteristics]
		prevCharacteristics[index].attributes.push(newAttribute)
		update(index, prevCharacteristics[index])
		const prevCharacteristicsContent = [...detailsProduct]
		prevCharacteristicsContent[index].attributes.push(newAttribute)
		setDetailsProduct(prevCharacteristicsContent)
		const newAttributeContent: IAttribute[] = [...Characteristics[index].attributes]
		newAttributeContent.push({ id: crypto.randomUUID(), name: "", value: "" })
	}

	const HandleRemoveAttribute = (indexCharacteristic: number, indexAttributte: number) => {
		const prevCharacteristicsContent = [...detailsProduct]
		prevCharacteristicsContent[indexCharacteristic]?.attributes.splice(indexAttributte, 1)
		setDetailsProduct(prevCharacteristicsContent)
		const prevCharacteristics: IProductCharacteristic[] = [...Characteristics]
		const updateChatacterist = { ...prevCharacteristics[indexCharacteristic] }
		const newsAttributes = updateChatacterist.attributes.filter((attribute, index) => index != indexAttributte)
		updateChatacterist.attributes = newsAttributes
		update(indexCharacteristic, updateChatacterist)
	}

	const HandleAddCharacteristic = () => {
		const newCharacteristic: IProductCharacteristic = {
			id: crypto.randomUUID(),
			name: "",
			attributes: [{ id: crypto.randomUUID(), name: "", value: "" }],
		}
		append(newCharacteristic)
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics.push(newCharacteristic)
		setDetailsProduct(prevCharacteristics)
		setProductValue({ ...productValue, specs: { details: prevCharacteristics } })
	}

	const HandleRemoveCharacteristic = (indexCharacteristic: number) => {
		setRemoveField({ remove: true, index: indexCharacteristic })
		setTimeout(() => {
			RemoveCharacteristic(indexCharacteristic)
			remove(indexCharacteristic)

		}, 100)
	}

	const RemoveCharacteristic = (indexCharacteristic: number) => {
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics.splice(indexCharacteristic, 1)
		setDetailsProduct(prevCharacteristics)
		setProductValue({ ...productValue, specs: { details: prevCharacteristics } })
		setRemoveField({ remove: false, index: NaN })
	}

	const HandleChangeCharacteristic = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const prevCharacteristicsContent = [...detailsProduct]
		const newName = e.currentTarget.value
		prevCharacteristicsContent[index].name = newName
		setDetailsProduct(prevCharacteristicsContent)
		setProductValue({ ...productValue, specs: { details: prevCharacteristicsContent } })
		const prevCharacteristic: IProductCharacteristic = { ...Characteristics[index] }
		prevCharacteristic.name = newName

	}
	const HandleChangeAttribute = (e: ChangeEvent<HTMLInputElement>, indexCharacteristic: number, indexAttribute: number) => {
		const prevCharacteristics = [...detailsProduct]
		const newName = e.currentTarget.value
		const nameField = e.currentTarget.name
		if (nameField === `details.[${indexCharacteristic}].attributes.[${indexAttribute}].name`) {
			prevCharacteristics[indexCharacteristic].attributes[indexAttribute].name = newName
		}
		if (nameField === `details.[${indexCharacteristic}].attributes.[${indexAttribute}].value`) {
			prevCharacteristics[indexCharacteristic].attributes[indexAttribute].value = newName
		}
		setDetailsProduct(prevCharacteristics)
		setProductValue({ ...productValue, specs: { details: prevCharacteristics } })
	}

	return (
		<div className={styles.details} ref={detailsRef} >
			<header className={styles.details_header}>
				<h3 className={styles.details_title}>Details product</h3>
				<Button
					className={styles.details_addFeature}
					buttonProps={{
						onClick: HandleAddCharacteristic,
						text: "Characteristic",
						type: "button",
						typeButton: ButtonType.WhitIcon,
						iconButton: <AddIcon />,
						isSecondary: true,
					}}
					title="Add characteristic"
				/>
			</header>
			{Characteristics?.map((characteristic, indexCharacteristic) => (
				<details open={true}
					key={characteristic.id}
					className={`${styles.details_characteristic} ${removeField.remove && removeField.index === indexCharacteristic && styles.details_characteristicNone} ${errors?.details?.[indexCharacteristic] && styles.details_characteristicError}`}

				>
					<summary className={styles.details_summary}>
						<div className={styles.details_summaryHeader}>
							<h3 className={styles.details_subtitle}>{indexCharacteristic + 1}</h3>
							<h3 className={styles.details_name}>{detailsProduct?.[indexCharacteristic]?.name}</h3>
						</div>
						<div className={styles.details_summaryHeader}>
							{indexCharacteristic > 0 && (
								<button
									className={styles.details_characteristicRemove}
									onClick={() => HandleRemoveCharacteristic(indexCharacteristic)}
									title="Delete characteristic" type="button"
								>
									<DeleteIcon />
								</button>
							)}
							<ArrowDownSolidtIcon className={styles.details_arrow} />
						</div>
					</summary>
					<div className={styles.details_characteristicName}>
						<TextField
							textFieldProps={{
								name: `details.[${indexCharacteristic}].name`,
								label: "Characteristic name:",
								value: detailsProduct?.[indexCharacteristic]?.name,
								error: errors.details?.[indexCharacteristic]?.name?.message,
								controlExt: control,
								onChange: (e) => HandleChangeCharacteristic(e, indexCharacteristic),
								type: TextFieldType.Text,
							}}
						/>
					</div>
					<fieldset className={styles.details_attributes}>
						<legend className={styles.details_attributesTitle}>Attributes</legend>

						{characteristic?.attributes?.map((attribute, indexAttribute) => (
							<div key={attribute.id} className={`${styles.details_attribute} `}>
								<TextField
									textFieldProps={{
										name: `details.[${indexCharacteristic}].attributes.[${indexAttribute}].name`,
										label: "Attribute:",
										value: detailsProduct?.[indexCharacteristic]?.attributes[indexAttribute]?.name,
										controlExt: control,
										error: errors?.details?.[indexCharacteristic]?.attributes?.[indexAttribute]?.name?.message,
										onChange: (e) => HandleChangeAttribute(e, indexCharacteristic, indexAttribute),
										type: TextFieldType.Text,
									}}
								/>
								<TextField
									textFieldProps={{
										name: `details.[${indexCharacteristic}].attributes.[${indexAttribute}].value`,
										label: "Value:",
										value: detailsProduct?.[indexCharacteristic]?.attributes[indexAttribute]?.value,
										controlExt: control,
										error: errors?.details?.[indexCharacteristic]?.attributes?.[indexAttribute]?.value?.message,
										onChange: (e) => HandleChangeAttribute(e, indexCharacteristic, indexAttribute),
										type: TextFieldType.Text,
									}}
								/>
								{indexAttribute > 0 && (
									<button
										className={styles.details_attributeRemove}
										onClick={() => HandleRemoveAttribute(indexCharacteristic, indexAttribute)}
										title="Delete attribute" type="button"
									>
										<RemoveIcon />
									</button>
								)}
							</div>
						))}	<Button
							className={styles.details_addAttribute}
							buttonProps={{
								onClick: () => HandleAddAttribute(indexCharacteristic),
								text: "Attribute",
								type: "button",
								typeButton: ButtonType.WhitIcon,
								iconButton: <AddIcon />,
								isSecondary: true,
							}}
							title="Add attribute"
						/>
					</fieldset>
				</details>
			))}

		</div>
	)
}
