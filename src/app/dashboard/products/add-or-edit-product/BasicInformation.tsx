"use client"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"
import styles from "./createedit.module.scss"
import { TextField } from "../../components/TextField/TextField"
import { IBrand, ICategory, IImage, TextFieldType } from "@/app/Types/types"
import { TextArea } from "../../components/TextArea/TextArea"
import { ComboBox } from "../../components/ComboBox/ComboBox"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { useImagesProduct, useProductInformation } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import { GetHeightAndWidthFromImageURL } from "@/app/utils/functions"
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { IInputs } from "./FormProduct"
import { set } from "zod"
import { URL_API } from "@/app/Constants/constants"

interface Props {
	errors: FieldErrors<IInputs>
	control: Control<IInputs>
	setValue: UseFormSetValue<IInputs>
}

export function BasicInformation(props: Props) {
	const { errors, control, setValue } = props
	const { productValue, setProductValue, errorEmpty, setErrorEmpty, loadInformation } = useProductInformation()
	const [categories, setCategories] = useState<ICategory[]>()
	const [subCategories, setSubCategories] = useState<ICategory[]>([])
	const [brands, setBrands] = useState<IBrand[]>()
	const [selectSubAndCategory, setSelectSubAndCategory] = useState({
		category: "",
		subCategory: "",
		brand: "",
	})


	useEffect(() => {
		setCategories([])
		setSubCategories([])
		setBrands([])
		const newCategory: ICategory = { id: 0, name: "-- Select an option --", name_abbr: "" }
		const newSub: ICategory[] | undefined = [...subCategories]
		newSub.unshift(newCategory)
		setSubCategories(newSub)
	}, [loadInformation])

	useEffect(() => {
		GetCategories()
		GetBrands()
	}, [loadInformation])

	useEffect(() => {
		setValue("title", productValue.title)
		setValue("description", productValue.description)
		setValue("category", productValue.category)
		setValue("subcategory", productValue.subcategory)
		setValue("brand", productValue.brand)
		setSelectSubAndCategory({ ...selectSubAndCategory, category: productValue.category, subCategory: productValue.subcategory })
	}, [productValue])

	const GetCategories = async () => {
		try {
			const response = await fetch(`${URL_API}categories`, { next: { revalidate: 7200 }, cache: "force-cache" })
			const responseCategories = await response.json()
			if (response.status === 200) {
				const selectCategories: ICategory[] = responseCategories.response as ICategory[]
				const newCategory: ICategory = { id: 0, name: "-- Select an option --", name_abbr: "" }
				selectCategories.unshift(newCategory)
				setCategories(selectCategories)
			}
		} catch (error) {
			console.error(error)
		}
	}
	const GetBrands = async () => {
		try {
			const response = await fetch(`${URL_API}brands/count/all`, { next: { revalidate: 7200 }, cache: "force-cache" })
			const responseBrands = await response.json()

			if (response.status === 200) {
				const resultBrands: IBrand[] = responseBrands.response
				const newBrand: IBrand = { id: 0, name: "-- Select an option --", logo: "", created_date: "", last_modified: "" }
				resultBrands.unshift(newBrand)
				setBrands(resultBrands)
			}
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		if (categories && categories?.length > 0) {
			GetSubCategories()
		}
	}, [selectSubAndCategory.category, categories])

	const GetSubCategories = async () => {
		try {

			if (selectSubAndCategory.category !== "-- Select a category --" && selectSubAndCategory.category !== "") {
				const idCategory = selectSubAndCategory.category

				const response = await fetch(`${URL_API}subcategories?category_id=${idCategory}`, { next: { revalidate: 7200 }, cache: "force-cache" })
				const responseSubCategories = await response.json()

				if (response.status === 200) {
					const selectSubCategories: ICategory[] = responseSubCategories.response
					const newCategory: ICategory = { id: 0, name: "-- Select an option --", name_abbr: "" }
					selectSubCategories.unshift(newCategory)
					setSubCategories(selectSubCategories)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setProductValue({ ...productValue, [e.target.name]: e.target.value })
		setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}

	const HandleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setProductValue({ ...productValue, category: value })
		setSelectSubAndCategory({ ...selectSubAndCategory, category: value })
		setErrorEmpty({ ...errorEmpty, category: false })
	}
	const HandleSelectSubCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		const category = categories?.find((category) => category.id.toString() === selectSubAndCategory.category)
		const subcategory = subCategories?.find((subcategory) => subcategory.id.toString() === value)
		if (category) {
			setProductValue({ ...productValue, subcategory: value, sku: `${category.name_abbr}${subcategory?.name_abbr}` })
			setErrorEmpty({ ...errorEmpty, subcategory: false })
		}
	}

	const HandleSelectBrand = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		const brand = brands?.find((brand) => brand.name === value)
		if (brand) {
			setProductValue({ ...productValue, brand: value, brand_logo: brand?.logo })
			setErrorEmpty({ ...errorEmpty, brand: false })
		}
	}

	return (
		<div className={styles.fields}>
			<TextField
				textFieldProps={{
					name: "title",
					label: "Title",
					error: errors.title?.message,
					isRequired: true,
					value: productValue.title,
					controlExt: control,
					onChange: (e) => HandleChangeValue(e),
					type: TextFieldType.Text,
				}}
			/>
			<TextArea
				name="description"
				label="Description"
				error={errors.description?.message}
				controlExt={control}
				value={productValue.description}
				isRequired
				onChange={(e) => HandleChangeValue(e)}
			/>
			<ComboBox
				name="category"
				label="Category"
				options={categories?.map((category) => [category.id?.toString(), category.name]) || []}
				error={errors.category?.message}
				value={productValue.category}
				controlExt={control}
				onValueChange={HandleSelectCategory}
				plaaceholder="-- Select a category --"
			/>
			{<ComboBox
				name="subcategory"
				label="SubCategory"
				options={subCategories?.map((subcategory) => [subcategory.id?.toString(), subcategory.name]) || []}
				error={errors.subcategory?.message}
				value={productValue.subcategory}
				controlExt={control}
				onValueChange={HandleSelectSubCategory}
				plaaceholder="-- Select a subcategory --"
			/>}
			{<ComboBox
				name="brand"
				label="Brand"
				options={brands?.map((brand) => [brand.name, brand.name]) || []}
				error={errors.brand?.message}
				value={productValue.brand}
				controlExt={control}
				onValueChange={HandleSelectBrand}
				plaaceholder="-- Select a brand --"
			/>}

		</div>
	)
}
