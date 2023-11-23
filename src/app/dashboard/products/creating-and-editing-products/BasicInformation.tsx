"use client"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"
import styles from "./createedit.module.scss"
import { TextField } from "../../components/TextField/TextField"
import { IBrand, ICategory, IImage, TextFieldType } from "@/app/Types/types"
import { TextArea } from "../../components/TextArea/TextArea"
import { ComboBox } from "../../components/ComboBox/ComboBox"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useImagesProduct, useProductInformation } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import { GetHeightAndWidthFromImageURL } from "@/app/utils/functions"

export function BasicInformation() {
	const { productValue, setProductValue, errorEmpty, setErrorEmpty } = useProductInformation()
	const { coverImage, setCoverImage, productImages, setProductImages } = useImagesProduct()
	const [loadImage, setLoadImage] = useState(true)
	const [categories, setCategories] = useState<ICategory[]>()
	const [subCategories, setSubCategories] = useState<ICategory[]>()
	const [brands, setBrands] = useState<IBrand[]>()
	const [brandSelected, setBrandsSelected] = useState<IBrand>()
	const [selectSubAndCategory, setSelectSubAndCategory] = useState({
		category: "-- Select a category --",
		subCategory: "-- Select a subcategory --",
		brand: "-- Select a brand --",
	})

	useEffect(() => {
		GetCategories()
		GetBrands()
	}, [])

	const GetCategories = async () => {
		const response = await axios.get("/api/categories")
		if (response.status === 200) {
			const responseCategories: ICategory[] = response.data.categories
			setCategories(responseCategories)
		}
	}
	const GetBrands = async () => {
		const response = await axios.get("/api/brands")
		console.log(response)
		if (response.status === 200) {
			const responseBrands: IBrand[] = response.data.brands
			setBrands(responseBrands)
		}
	}
	useEffect(() => {
		GetSubCategories()
	}, [selectSubAndCategory])

	const GetSubCategories = async () => {
		if (selectSubAndCategory.category !== "-- Select a category --") {
			const idCategory = categories?.find((category) => category.name === selectSubAndCategory.category)?.id

			const response = await axios.get(`/api/categories/${idCategory}/subcategories`)
			if (response.status === 200) {
				const responseSubCategories: ICategory[] = response.data.subCategories
				setSubCategories(responseSubCategories)
			}
		}
	}

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setProductValue({ ...productValue, [e.target.name]: e.target.value })
		setErrorEmpty({ ...errorEmpty, [e.target.name]: false })
	}

	const HandleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files) {
			const file = e.target.files[0]
			//setCoverImage([{ file, url: URL.createObjectURL(file) }])
			//const resultURL = await UploadFile(e.target.files[0])
			//setProductValue({ ...productValue, image: resultURL })
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
				if (file.size > 80000) {
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
			setProductValue({ ...productValue, slideImages: [ArrayImages[0].url] })
			setErrorEmpty({ ...errorEmpty, slideImages: false })

			//setProductImages(ArrayImages)

			//console.log(e.target.files.length)
			/*for (let index = 0; index < e.target.files.length; index++) {
				const result = await UploadFile(e.target.files[index])
				ArrayImages.push(result)
			}*/
		}
	}

	const HandleSelectCategory = (value: string) => {
		setProductValue({ ...productValue, category: value })
		setSelectSubAndCategory({ ...selectSubAndCategory, category: value })
		setErrorEmpty({ ...errorEmpty, category: false })
	}
	const HandleSelectSubCategory = (value: string) => {
		const category = categories?.find((category) => category.name === selectSubAndCategory.category)
		const subcategory = subCategories?.find((subcategory) => subcategory.name === value)
		if (category) {
			setProductValue({ ...productValue, subcategory: value, sku: `${category.name_abbr}${subcategory?.name_abbr}` })
			setErrorEmpty({ ...errorEmpty, subcategory: false })
		}
	}

	const HandleSelectBrand = (value: string) => {
		const brand = brands?.find((brand) => brand.name === value)
		setBrandsSelected(brand)
		if (brand) {
			setProductValue({ ...productValue, brand: value, brandLogo: brand?.logo })
			setErrorEmpty({ ...errorEmpty, brand: false })
		}
	}

	return (
		<div className={styles.fields}>
			<TextField
				textFieldProps={{
					name: "title",
					label: "Title:",
					value: productValue.title,
					error: errorEmpty.title,
					isRequired: true,
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
							error: errorEmpty.image,
							isRequired: true,
							onChange: (e) => HandleUploadImage(e),
							type: TextFieldType.File,
							help: `Esta imagen es la imagen principal del producto y se utiliza para representarlo en el sitio web. Se muestra en la página de detalles del producto, en los resultados de búsqueda y en otros lugares.\nLa imagen de portada debe ser una imagen de alta calidad que represente el producto de manera precisa. Debe tener un tamaño mínimo de 400 x 400 píxeles y un formato de archivo JPG, PNG o WEBP`,
						}}
					/>
				</LoadImageProvider>
			)}
			<LoadImageProvider images={productImages || []} width={160} height={160}>
				<TextField
					className={styles.article_sliderInput}
					textFieldProps={{
						name: "slideImage",
						label: "Slider Images:",
						error: errorEmpty.slideImages,
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
				value={productValue.description}
				error={errorEmpty.description}
				isRequired
				onChange={(e) => HandleChangeValue(e)}
			/>
			<ComboBox
				name="category"
				label="Category:"
				options={categories?.map((category) => category.name) || []}
				error={errorEmpty.category}
				onValueChange={HandleSelectCategory}
			/>
			<ComboBox
				name="subcategory"
				label="SubCategory:"
				options={subCategories?.map((subcategory) => subcategory.name) || []}
				error={errorEmpty.subcategory}
				onValueChange={HandleSelectSubCategory}
			/>
			<ComboBox name="brand" label="Brand:" options={brands?.map((brand) => brand.name) || []} error={errorEmpty.brand} onValueChange={HandleSelectBrand} />
		</div>
	)
}
