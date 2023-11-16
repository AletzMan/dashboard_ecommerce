"use client"
import { ProductType, TextFieldType } from "@/app/Types/types"
import FormTextField from "../../components/FormTextField/FormTextField"
import { useState, ChangeEvent } from "react"
import stylesGeneral from "../../dashboard.module.scss"
import styles from "../products.module.scss"
import { UploadFile } from "@/Firebase/firebase"
import { FormComboBox } from "../../components/ComboBox/ComboBox"

const EmptyProduct = {
	sku: "",
	title: "",
	specs: {},
	image: "",
	slideImages: [],
	brand: "",
	brandLogo: "",
	category: "",
	subcategory: "",
	sameDayDelivery: false,
	storePickUp: false,
	price: 0,
	isDiscounted: false,
	discount: 0,
	isNew: false,
	isSale: false,
	isFreeShipping: false,
	isClearance: false,
	inventoryQuantity: 0,
	soldQuantity: 0,
}

export default function ProductsPage() {
	const [fieldValue, setFieldValue] = useState<ProductType>(EmptyProduct)
	const [selectSubAndCategory, setSelectSubAndCategory] = useState({ category: "-- Select a category --", subCategory: "-- Select a subcategory --" })

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setFieldValue({ ...fieldValue, [e.target.name]: e.target.value })
	}

	const HandleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files) {
			const resultURL = await UploadFile(e.target.files[0])
			setFieldValue({ ...fieldValue, image: resultURL })
		}
	}

	const HandleUploadSlideImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let ArrayImages: string[] = []
		if (e?.target?.files) {
			//console.log(e.target.files.length)
			for (let index = 0; index < e.target.files.length; index++) {
				const result = await UploadFile(e.target.files[index])
				ArrayImages.push(result)
			}
			console.log(ArrayImages)
			//const result = await UploadFile(e.target.files[0])
			//console.log(result)
		}
	}

	return (
		<section className={stylesGeneral.section}>
			<h2 className={stylesGeneral.section__title}>CREATING AND EDITING PRODUCTS</h2>
			<article className={styles.article}>
				<FormTextField
					textFieldProps={{
						name: "sku",
						label: "SKU:",
						value: fieldValue.sku,
						error: false,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Text,
					}}
				/>
				<FormTextField
					textFieldProps={{
						name: "title",
						label: "Title:",
						value: fieldValue.sku,
						error: false,
						onChange: (e) => HandleChangeValue(e),
						type: TextFieldType.Text,
					}}
				/>
				<FormTextField
					textFieldProps={{
						name: "image",
						label: "Product Image:",
						error: false,
						onChange: (e) => HandleUploadImage(e),
						type: TextFieldType.File,
					}}
				/>
				<FormTextField
					textFieldProps={{
						name: "image",
						label: "Slider Images:",
						error: false,
						onChange: (e) => HandleUploadImage(e),
						type: TextFieldType.File,
						multipleFile: true,
					}}
				/>
				<FormComboBox
					defaultValue="-- Select a category --"
					name="category"
					options={["ALE", "VAL"]}
					selectOption={selectSubAndCategory.category}
					setSelectOption={() => setSelectSubAndCategory({ ...selectSubAndCategory, category: "" })}
					error={false}
				/>
				<FormComboBox
					defaultValue="-- Select a subcategory --"
					name="subcategory"
					options={["GON", "DOR"]}
					selectOption={selectSubAndCategory.subCategory}
					setSelectOption={() => setSelectSubAndCategory({ ...selectSubAndCategory, subCategory: "" })}
					error={false}
				/>
			</article>
		</section>
	)
}
