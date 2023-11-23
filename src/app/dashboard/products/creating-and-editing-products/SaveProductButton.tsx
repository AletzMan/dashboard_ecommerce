"use client"
import { ButtonType } from "@/app/Types/types"
import { Button } from "../../components/Button/Button"
import styles from "./createedit.module.scss"
import { AddIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { useImagesProduct, useProductInformation } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import axios from "axios"
import { GetURLFile, UploadFile } from "@/Firebase/firebase"
import { GetNameImage } from "@/app/utils/functions"

export function SaveProductsButton() {
	const { setProductValue, productValue, setErrorEmpty, errorEmpty } = useProductInformation()
	const { coverImage, productImages } = useImagesProduct()

	const ValidateFields = () => {
		if (
			!productValue.title ||
			!productValue.description ||
			!productValue.image ||
			productValue.slideImages.length === 0 ||
			!productValue.category ||
			!productValue.subcategory ||
			!productValue.brand ||
			productValue.price === 0 ||
			productValue.inventoryQuantity === 0
		) {
			setErrorEmpty({
				...errorEmpty,
				title: !productValue.title,
				description: !productValue.description,
				image: !productValue.image,
				slideImages: productValue.slideImages.length === 0,
				category: !productValue.category,
				subcategory: !productValue.subcategory,
				brand: !productValue.brand,
				price: productValue.price === 0,
				inventoryQuantity: productValue.inventoryQuantity === 0,
			})
			enqueueSnackbar("The request is missing a required field. Please make sure all required fields are provided", {
				variant: "error",
				anchorOrigin: { horizontal: "center", vertical: "top" },
				style: { backgroundColor: "darkred" },
			})
			return false
		} else {
			return true
		}
	}
	const HandleSaveProduct = () => {
		const isValidate = ValidateFields()
		if (isValidate) {
			UploadImages()
			console.log(productValue)
		}
	}

	const UploadImages = async () => {
		const nameImageCover = GetNameImage("Cover")
		await UploadFile(coverImage[0].file as File, "coverProducts", nameImageCover)
		//
		console.log(coverImage)
		//
		let NameImages: string[] = []
		for (let index = 0; index < productImages.length; index++) {
			const nameImage = GetNameImage("Product")
			NameImages.push(nameImage)
			await UploadFile(productImages[index].file as File, "productImage", nameImage)
		}
		//
		const prevProduct = { ...productValue }
		const coverImageURL = await GetURLFile("coverProducts", nameImageCover)
		prevProduct.image = coverImageURL
		//
		let ArrayImages: string[] = []
		for (let index = 0; index < productImages.length; index++) {
			const productImageURL = await GetURLFile("productImage", NameImages[index])
			ArrayImages.push(productImageURL)
		}
		prevProduct.slideImages = ArrayImages
		setProductValue(prevProduct)
		CreateProduct()
	}

	const CreateProduct = async () => {
		const response = await axios.post("/api/products", {
			productValue,
		})
		console.log(response)
	}

	console.log(productValue)
	return (
		<Button
			className={styles.details_addFeature}
			buttonProps={{
				onClick: HandleSaveProduct,
				text: "Save Product",
				type: "button",
				typeButton: ButtonType.WhitIcon,
				iconButton: <SaveIcon />,
				isSecondary: false,
			}}
			title="Save Product"
		/>
	)
}
