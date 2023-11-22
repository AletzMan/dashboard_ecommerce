"use client"
import { ButtonType, IAttribute, ICategory, ICharacteristicProduct, IImage, ProductType, TextFieldType } from "@/app/Types/types"
import { useState, ChangeEvent, useEffect } from "react"
import stylesGeneral from "../../dashboard.module.scss"
import styles from "./createedit.module.scss"
import { UploadFile } from "@/Firebase/firebase"
import { TextField } from "../../components/TextField/TextField"
import { ComboBox } from "../../components/ComboBox/ComboBox"
import Image from "next/image"
import axios from "axios"
import { ToggleSwitch } from "../../components/ToggleSwitch/ToggleSwitch"
import { TextArea } from "../../components/TextArea/TextArea"
import { AddIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"

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
	description: "",
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
	const [detailsProduct, setDetailsProduct] = useState<ICharacteristicProduct[]>([{ name: "0", attributes: [{ name: "0", value: "0" }] }])
	const [coverImage, setCoverImage] = useState<IImage[]>()
	const [productImages, setProductImages] = useState<IImage[]>()
	const [categories, setCategories] = useState<ICategory[]>()
	const [subCategories, setSubCategories] = useState<ICategory[]>()
	const [selectSubAndCategory, setSelectSubAndCategory] = useState({ category: "-- Select a category --", subCategory: "-- Select a subcategory --" })

	useEffect(() => {
		//GetCategories()
	}, [])

	const GetCategories = async () => {
		const response = await axios.get("/api/categories")
		if (response.status === 200) {
			const responseCategories: ICategory[] = response.data.categories
			setCategories(responseCategories)
		}
	}
	useEffect(() => {
		//GetSubCategories()
	}, [selectSubAndCategory])

	const GetSubCategories = async () => {
		if (selectSubAndCategory.category !== "-- Select a category --") {
			const idCategory = categories?.find((category) => category.name === selectSubAndCategory.category)?.id
			console.log(idCategory, selectSubAndCategory.category)
			const response = await axios.get(`/api/categories/${idCategory}/subcategories`)
			if (response.status === 200) {
				const responseSubCategories: ICategory[] = response.data.subCategories
				setSubCategories(responseSubCategories)
			}
		}
	}

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setFieldValue({ ...fieldValue, [e.target.name]: e.target.value })
	}

	const HandleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files) {
			const file = e.target.files[0]
			setCoverImage([{ file, url: URL.createObjectURL(file) }])
			//const resultURL = await UploadFile(e.target.files[0])
			//setFieldValue({ ...fieldValue, image: resultURL })
		}
	}

	const HandleUploadSlideImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let ArrayImages: IImage[] = []
		if (e?.target?.files) {
			const files = e.target.files
			for (let index = 0; index < files.length; index++) {
				const file = e.target.files[index]
				ArrayImages.push({ file, url: URL.createObjectURL(file) })
			}

			setProductImages(ArrayImages)

			//console.log(e.target.files.length)
			/*for (let index = 0; index < e.target.files.length; index++) {
				const result = await UploadFile(e.target.files[index])
				ArrayImages.push(result)
			}*/
		}
	}

	const HandleAddAttribute = (index: number) => {
		const indexAttribute: string = detailsProduct[index]?.attributes.length.toString()
		const newAttribute: IAttribute = { name: indexAttribute, value: indexAttribute }
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics[index].attributes.push(newAttribute)
		setDetailsProduct(prevCharacteristics)
	}

	const HandleAddCharacteristic = () => {
		const indexAttribute: number = detailsProduct[detailsProduct.length]?.attributes ? detailsProduct[detailsProduct.length].attributes?.length : 0
		const indexCharacteristic: string = detailsProduct.length.toString()
		const newCharacteristic: ICharacteristicProduct = { name: indexCharacteristic, attributes: [{ name: `${indexAttribute}`, value: `${indexAttribute}` }] }
		const prevCharacteristics = [...detailsProduct]
		prevCharacteristics.push(newCharacteristic)
		setDetailsProduct(prevCharacteristics)
	}

	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<h2 className={styles.section_title}>CREATING AND EDITING PRODUCTS</h2>
			<article className={styles.article}>
				<div className={styles.article_section}>
					<h3 className={styles.article_sectionTitle}>Basic information</h3>
					<TextField
						textFieldProps={{
							name: "title",
							label: "Title:",
							value: fieldValue.sku,
							error: false,
							onChange: (e) => HandleChangeValue(e),
							type: TextFieldType.Text,
						}}
					/>
					<LoadImageProvider images={coverImage || []} width={220} height={220}>
						<TextField
							textFieldProps={{
								name: "image",
								label: "Product Image:",
								error: false,
								onChange: (e) => HandleUploadImage(e),
								type: TextFieldType.File,
								help: `Esta imagen es la imagen principal del producto y se utiliza para representarlo en el sitio web. Se muestra en la página de detalles del producto, en los resultados de búsqueda y en otros lugares.\nLa imagen de portada debe ser una imagen de alta calidad que represente el producto de manera precisa. Debe tener un tamaño mínimo de 400 x 400 píxeles y un formato de archivo JPG, PNG o WEBP`,
							}}
						/>
					</LoadImageProvider>
					<LoadImageProvider images={productImages || []} width={160} height={160}>
						<TextField
							className={styles.article_sliderInput}
							textFieldProps={{
								name: "image",
								label: "Slider Images:",
								error: false,
								onChange: (e) => HandleUploadSlideImage(e),
								type: TextFieldType.File,
								multipleFile: true,
								help: `Estas imágenes proporcionan más información sobre el producto. Pueden mostrar diferentes ángulos del producto, sus dimensiones, sus características o cómo se utiliza.\nLas imágenes detalladas deben ser imágenes de alta calidad que muestren el producto de manera precisa. Deben tener un tamaño mínimo de 500 x 500 píxeles y un formato de archivo JPG, PNG o WEBP.`,
							}}
						/>
					</LoadImageProvider>
					<TextArea
						label="Description:"
						value={fieldValue.description}
						onChange={(e) => setFieldValue({ ...fieldValue, description: e.currentTarget.value })}
					/>
					<ComboBox
						name="category"
						label="Category:"
						options={categories?.map((category) => category.name) || []}
						selectOption={selectSubAndCategory.category}
						setSelectOption={(e) => setSelectSubAndCategory({ ...selectSubAndCategory, category: e.toString() })}
						error={false}
					/>
					<ComboBox
						name="subcategory"
						label="SubCategory:"
						options={subCategories?.map((subcategory) => subcategory.name) || []}
						selectOption={selectSubAndCategory.subCategory}
						setSelectOption={(e) => setSelectSubAndCategory({ ...selectSubAndCategory, subCategory: e.toString() })}
						error={false}
					/>
					<ComboBox
						name="brand"
						label="Brand:"
						options={subCategories?.map((subcategory) => subcategory.name) || []}
						selectOption={selectSubAndCategory.subCategory}
						setSelectOption={(e) => setSelectSubAndCategory({ ...selectSubAndCategory, subCategory: e.toString() })}
						error={false}
					/>
				</div>
				<div className={styles.article_section}>
					<h3 className={styles.article_sectionTitle}>Sales Information</h3>
					<div className={styles.salesInformation}>
						<div className={styles.article_price}>
							<h4 className={styles.article_deliveryTitle}>Pricing options</h4>
							<TextField
								textFieldProps={{
									name: "price",
									label: "Price:",
									value: fieldValue.price.toString(),
									error: false,
									onChange: (e) => HandleChangeValue(e),
									type: TextFieldType.Number,
								}}
							/>
							<ToggleSwitch
								label="Is Discounted"
								active={fieldValue.isDiscounted}
								setActive={(e) => setFieldValue({ ...fieldValue, isDiscounted: e.valueOf() as boolean })}
							/>
							<TextField
								textFieldProps={{
									name: "discount",
									label: "Discount:",
									value: fieldValue.discount.toString(),
									error: false,
									onChange: (e) => HandleChangeValue(e),
									type: TextFieldType.Number,
									disabled: !fieldValue.isDiscounted,
								}}
							/>
						</div>
						<div className={styles.article_delivery}>
							<h4 className={styles.article_deliveryTitle}>Shipping and pickup</h4>
							<ToggleSwitch
								label="Same day delivery"
								active={fieldValue.sameDayDelivery}
								setActive={(e) => setFieldValue({ ...fieldValue, sameDayDelivery: e.valueOf() as boolean })}
							/>
							<ToggleSwitch
								label="Store PickUp"
								active={fieldValue.storePickUp}
								setActive={(e) => setFieldValue({ ...fieldValue, storePickUp: e.valueOf() as boolean })}
							/>
						</div>
						<div className={styles.article_delivery}>
							<h4 className={styles.article_deliveryTitle}>Status</h4>
							<TextField
								textFieldProps={{
									name: "inventoryQuantity",
									label: "Inventory Quantity:",
									value: fieldValue.inventoryQuantity.toString(),
									error: false,
									onChange: (e) => HandleChangeValue(e),
									type: TextFieldType.Number,
								}}
							/>
							<ToggleSwitch
								label="Is New"
								active={fieldValue.isNew}
								setActive={(e) => setFieldValue({ ...fieldValue, isNew: e.valueOf() as boolean })}
							/>
							<ToggleSwitch
								label="Is Free Shipping"
								active={fieldValue.isFreeShipping}
								setActive={(e) => setFieldValue({ ...fieldValue, isFreeShipping: e.valueOf() as boolean })}
							/>
							<ToggleSwitch
								label="Is Clearance"
								active={fieldValue.isClearance}
								setActive={(e) => setFieldValue({ ...fieldValue, isClearance: e.valueOf() as boolean })}
							/>
							<ToggleSwitch
								label="Is Sale"
								active={fieldValue.isSale}
								setActive={(e) => setFieldValue({ ...fieldValue, isSale: e.valueOf() as boolean })}
							/>
						</div>
					</div>
					<div className={styles.details}>
						<h3 className={styles.article_sectionTitle}>Details product</h3>

						<div className={styles.details_characteristics}>
							<h3 className={styles.details_title}>Characteristics</h3>
							{detailsProduct.map((characteristic, index) => (
								<div key={characteristic.name} className={styles.details_characteristic}>
									<TextField
										textFieldProps={{
											name: "title",
											label: "Characteristic name:",
											value: detailsProduct[index].name,
											error: false,
											onChange: (e) => HandleChangeValue(e),
											type: TextFieldType.Text,
										}}
									/>
									<div className={styles.details_attributes}>
										<h4 className={styles.details_attributesTitle}>Attributes</h4>
										<Button
											className={styles.details_addAttribute}
											buttonProps={{
												onClick: () => HandleAddAttribute(index),
												text: "Add Attribute",
												type: "button",
												typeButton: ButtonType.WhitIcon,
												iconButton: <AddIcon />,
												isSecondary: true,
											}}
											title="Add characteristic"
										/>

										{characteristic.attributes.map((attribute, indexAttribute) => (
											<div key={attribute.name} className={styles.details_attribute}>
												<TextField
													textFieldProps={{
														name: "name",
														label: "Attribute:",
														value: detailsProduct[index].attributes[indexAttribute].name,
														error: false,
														onChange: (e) => HandleChangeValue(e),
														type: TextFieldType.Text,
													}}
												/>
												<TextField
													textFieldProps={{
														name: "description",
														label: "Value:",
														value: detailsProduct[index].attributes[indexAttribute].value,
														error: false,
														onChange: (e) => HandleChangeValue(e),
														type: TextFieldType.Text,
													}}
												/>
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
				</div>
			</article>
		</section>
	)
}
