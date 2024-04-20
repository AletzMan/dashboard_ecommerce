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
import { IInputs } from "./FormProdtc"
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
	const { coverImage, setCoverImage, productImages, setProductImages } = useImagesProduct()
	const [loadImage, setLoadImage] = useState(true)
	const [categories, setCategories] = useState<ICategory[]>()
	const [subCategories, setSubCategories] = useState<ICategory[]>()
	const [brands, setBrands] = useState<IBrand[]>()
	const [selectSubAndCategory, setSelectSubAndCategory] = useState({
		category: "-- Select a category --",
		subCategory: "-- Select a subcategory --",
		brand: "-- Select a brand --",
	})

	useEffect(() => {
		setProductImages([])
		setCoverImage([])
		setCategories([])
		setSubCategories([])
		setBrands([])
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
			const response = await fetch(`${URL_API}categories`, { next: { revalidate: 7200 } })
			const responseCategories = await response.json()
			if (response.status === 200) {
				const selectCategories: ICategory[] = responseCategories.response as ICategory[]
				setCategories(selectCategories)
			}
		} catch (error) {
			console.error(error)
		}
	}
	const GetBrands = async () => {
		try {
			const response = await axios.get("/api/brands")
			if (response.status === 200) {
				const responseBrands: IBrand[] = response.data.data.brands
				setBrands(responseBrands)
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

			if (selectSubAndCategory.category !== "-- Select a category --") {
				const idCategory = categories?.find((category) => category.name === selectSubAndCategory.category)?.id

				const response = await fetch(`${URL_API}subcategories?category_id=${idCategory}`, { next: { revalidate: 7200 } })
				const responseSubCategories = await response.json()

				if (response.status === 200) {
					const selectSubCategories: ICategory[] = responseSubCategories.response
					setSubCategories(selectSubCategories)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		//setProductValue({ ...productValue, [e.target.name]: e.target.value })
		//setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}

	const HandleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files) {
			const file = e.target.files[0]
			const url: string = URL.createObjectURL(file)
			const response = await GetHeightAndWidthFromImageURL(url)
			if (!file.type.includes("image/")) {
				enqueueSnackbar("The image format must be PNG", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 100)
				return
			}
			if (response.width > 650 || response.height > 500) {
				enqueueSnackbar("The image cannot be larger than 600px x 500px", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 100)
				return
			}
			if (file.size > 65000) {
				enqueueSnackbar("The image must be less than 65 Kbytes", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 100)
				return
			}

			const newImage: IImage[] = [{ file: file, url: url }]
			setCoverImage(newImage)
			//Almacenar la ruta previa, antes de subirla, solo para validar si no esta vacio
			setProductValue({ ...productValue, image: newImage[0].url })
			setErrorEmpty({ ...errorEmpty, image: false })
		}
	}

	const HandleUploadSlideImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let ArrayImages: IImage[] = []
		if (e?.target?.files) {
			const files = e.target.files
			for (let index = 0; index < files.length; index++) {
				const file = e.target.files[index]
				const url: string = URL.createObjectURL(file)
				const response = await GetHeightAndWidthFromImageURL(url)
				if (!file.type.includes("image/")) {
					enqueueSnackbar("The image format must be PNG", { variant: "info" })
					setLoadImage(false)
					setTimeout(() => {
						setLoadImage(true)
					}, 100)
					return
				}
				if (response.width > 800 || response.height > 800) {
					enqueueSnackbar("The image cannot be larger than 600px x 500px", { variant: "info" })
					setLoadImage(false)
					setTimeout(() => {
						setLoadImage(true)
					}, 100)
					return
				}
				if (file.size > 380000) {
					enqueueSnackbar("The image must be less than 65 Kbytes", { variant: "info" })
					setLoadImage(false)
					setTimeout(() => {
						setLoadImage(true)
					}, 100)
					return
				}

				ArrayImages.push({ file, url: URL.createObjectURL(file) })
			}
			setProductImages(ArrayImages)
			//Almacenar la ruta previa, antes de subirla, solo para validar si no esta vacio
			setProductValue({ ...productValue, slide_images: [ArrayImages[0].url] })
			setErrorEmpty({ ...errorEmpty, slideImages: false })
		}
	}

	const HandleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setProductValue({ ...productValue, category: value })
		setSelectSubAndCategory({ ...selectSubAndCategory, category: value })
		setErrorEmpty({ ...errorEmpty, category: false })
	}
	const HandleSelectSubCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		const category = categories?.find((category) => category.name === selectSubAndCategory.category)
		const subcategory = subCategories?.find((subcategory) => subcategory.name === value)
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
					label: "Title:",
					error: errors.title?.message,
					isRequired: true,
					value: productValue.title,
					controlExt: control,
					onChange: (e) => HandleChangeValue(e),
					type: TextFieldType.Text,
				}}
			/>
			{loadImage && (
				<LoadImageProvider images={coverImage || []} width={210} height={210}>
					<TextField
						textFieldProps={{
							name: "image",
							label: "Product Image:",
							error: errors.image?.message,
							controlExt: control,
							isRequired: true,
							onChange: (e) => HandleUploadImage(e),
							type: TextFieldType.File,
							help: `Esta imagen es la imagen principal del producto y se utiliza para representarlo en el sitio web. Se muestra en la página de detalles del producto, en los resultados de búsqueda y en otros lugares.\nLa imagen de portada debe ser una imagen de alta calidad que represente el producto de manera precisa. Debe tener un tamaño mínimo de 400 x 400 píxeles y un formato de archivo JPG, PNG o WEBP`,
						}}
					/>
				</LoadImageProvider>
			)}
			<LoadImageProvider images={productImages || []} width={130} height={130}>
				<TextField
					textFieldProps={{
						name: "slideImages",
						label: "Slider Images:",
						error: errors.slideImages?.message,
						controlExt: control,
						isRequired: true,
						onChange: (e) => HandleUploadSlideImage(e),
						type: TextFieldType.File,
						multipleFile: true,
						help: `Estas imágenes proporcionan más información sobre el producto. Pueden mostrar diferentes ángulos del producto, sus dimensiones, sus características o cómo se utiliza.\nLas imágenes detalladas deben ser imágenes de alta calidad que muestren el producto de manera precisa. Deben tener un tamaño mínimo de 500 x 500 píxeles y un formato de archivo JPG, PNG o WEBP.`,
					}}
				/>
			</LoadImageProvider>
			<TextArea
				name="description"
				label="Description:"
				error={errors.description?.message}
				controlExt={control}
				value={productValue.description}
				isRequired
				onChange={(e) => HandleChangeValue(e)}
			/>
			<ComboBox
				name="category"
				label="Category:"
				options={categories?.map((category) => category.name) || []}
				error={errors.category?.message}
				value={productValue.category}
				controlExt={control}
				onValueChange={HandleSelectCategory}
				plaaceholder="-- Select a category --"
			/>
			<ComboBox
				name="subcategory"
				label="SubCategory:"
				options={subCategories?.map((subcategory) => subcategory.name) || []}
				error={errors.subcategory?.message}
				value={productValue.subcategory}
				controlExt={control}
				onValueChange={HandleSelectSubCategory}
				plaaceholder="-- Select a subcategory --"
			/>
			<TextField
				textFieldProps={{
					name: "brand",
					label: "Brand",
					error: errors.brand?.message,
					isRequired: true,
					value: productValue.brand,
					controlExt: control,
					onChange: (e) => HandleChangeValue(e),
					type: TextFieldType.Text,
				}}
			/>
		</div>
	)
}
