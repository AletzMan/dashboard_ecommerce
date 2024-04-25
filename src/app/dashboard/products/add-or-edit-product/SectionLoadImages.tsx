"use client"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"
import styles from "./createedit.module.scss"
import { TextField } from "../../components/TextField/TextField"
import { IImage, TextFieldType } from "@/app/Types/types"
import { ChangeEvent, useEffect, useState } from "react"
import { useImagesProduct, useProductInformation } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import { GetHeightAndWidthFromImageURL } from "@/app/utils/functions"
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { IInputs } from "./FormProduct"
import { IProduct } from "@/app/interfaces/product"

interface Props {
	errors: FieldErrors<IInputs>
	control: Control<IInputs>
	setValue: UseFormSetValue<IInputs>
	productSelect?: IProduct
}

export function SectionLoadImages({ errors, control, setValue, productSelect }: Props) {
	const { productValue, setProductValue, errorEmpty, setErrorEmpty, loadInformation } = useProductInformation()
	const { coverImage, setCoverImage, productImages, setProductImages } = useImagesProduct()
	const [loadImage, setLoadImage] = useState(true)

	useEffect(() => {
		if (productSelect) {
			const newCoverImages: IImage[] = [{ file: null, url: productSelect.image }]
			const newProductImages: IImage[] = []
			productSelect.slide_images.map(image => {
				const prevImage: IImage = { file: null, url: image }
				newProductImages.push(prevImage)
			})
			setCoverImage(newCoverImages)
			setProductImages(newProductImages)
			setValue("image", productSelect.image)
			setValue("slide_images", JSON.stringify(productSelect.slide_images))
		} else {
			setProductImages([])
			setCoverImage([])
		}
	}, [loadInformation])

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

	return (
		<div className={styles.fields}>
			{loadImage && (
				<LoadImageProvider images={coverImage || []} width={190} height={190}>
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
			<LoadImageProvider images={productImages || []} width={130} height={150}>
				<TextField
					textFieldProps={{
						name: "slide_images",
						label: "Slider Images:",
						error: errors.slide_images?.message,
						controlExt: control,
						isRequired: true,
						onChange: (e) => HandleUploadSlideImage(e),
						type: TextFieldType.File,
						multipleFile: true,
						help: `Estas imágenes proporcionan más información sobre el producto. Pueden mostrar diferentes ángulos del producto, sus dimensiones, sus características o cómo se utiliza.\nLas imágenes detalladas deben ser imágenes de alta calidad que muestren el producto de manera precisa. Deben tener un tamaño mínimo de 500 x 500 píxeles y un formato de archivo JPG, PNG o WEBP.`,
					}}
				/>
			</LoadImageProvider>


		</div>
	)
}
