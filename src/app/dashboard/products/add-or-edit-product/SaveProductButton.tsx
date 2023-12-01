"use client"
import { ButtonType } from "@/app/Types/types"
import { Button } from "../../components/Button/Button"
import styles from "./createedit.module.scss"
import { LoadingIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { useImagesProduct, useProductInformation } from "@/app/utils/store"
import { enqueueSnackbar } from "notistack"
import axios from "axios"
import { GetURLFile, UploadFile } from "@/Firebase/firebase"
import { GetNameImage } from "@/app/utils/functions"
import { Modal } from "@/app/components/Modal/Modal"
import { useEffect, useState } from "react"

export function SaveProductsButton() {
	const { setProductValue, productValue, setErrorEmpty, errorEmpty, EmptyProduct, setLoadInformation } = useProductInformation()
	const { coverImage, productImages } = useImagesProduct()
	const [uploading, setUploading] = useState(false)
	const [uploadReady, setUploadReady] = useState(false)

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
			productValue.price.toString() === "" ||
			productValue.inventoryQuantity === 0 ||
			!Number.isInteger(productValue.inventoryQuantity) ||
			productValue.minimuninventoryQuantity === 0
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
				price: productValue.price === 0 || productValue.price.toString() === "",
				inventoryQuantity: productValue.inventoryQuantity === 0 || !Number.isInteger(productValue.inventoryQuantity),
				minimuninventoryQuantity: productValue.minimuninventoryQuantity === 0,
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
			setUploading(true)
			UploadImages()
		}
	}

	const UploadImages = async () => {
		const nameImageCover = GetNameImage("Cover")
		await UploadFile(coverImage[0].file as File, "coverProducts", nameImageCover)
		//

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
		//
		let ArrayImages: string[] = []
		for (let index = 0; index < productImages.length; index++) {
			const productImageURL = await GetURLFile("productImage", NameImages[index])
			ArrayImages.push(productImageURL)
		}
		console.log(productValue.slideImages)
		console.log(ArrayImages)
		setProductValue({ ...prevProduct, image: coverImageURL, slideImages: ArrayImages })
		setUploadReady(true)
	}

	useEffect(() => {
		if (uploadReady) {
			CreateProduct()
		}

	}, [uploadReady])

	const CreateProduct = async () => {

		try {
			const response = await axios.post("/api/products", {
				productValue,
			})
			if (response.status === 201) {
				enqueueSnackbar("Product successfully created", {
					variant: "success",
					anchorOrigin: { horizontal: "center", vertical: "top" },
					style: { backgroundColor: "darkgreen" },
				})
				setProductValue(EmptyProduct)
				setLoadInformation(false)
				setUploading(false)
				setUploadReady(false)

				setTimeout(() => {
					setLoadInformation(true)
				}, 5);
			}
		} catch (error) {
			setUploading(false)
			setUploadReady(false)
			console.error(error)
		}


	}

	return (
		<>
			{uploading && <Modal title="" >
				<LoadingIcon className={styles.modal_icon} />
				<p className={styles.modal_text}>Creating product... </p>
				<p className={styles.modal_text}>Please wait a moment.</p>
			</Modal>}
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
		</>
	)
}
