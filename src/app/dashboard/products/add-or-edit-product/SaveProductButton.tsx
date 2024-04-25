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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { URL_API } from "@/app/Constants/constants"
import { Revailidate } from "@/app/services/actions"

interface Props {
	isValid: boolean
	setStep: Dispatch<SetStateAction<number>>
}

export function SaveProductsButton({ isValid, setStep }: Props) {
	const { setProductValue, productValue, setErrorEmpty, errorEmpty, EmptyProduct, setLoadInformation, setIsEdit } = useProductInformation()
	const { coverImage, productImages } = useImagesProduct()
	const [uploading, setUploading] = useState(false)
	const [uploadReady, setUploadReady] = useState(false)

	const HandleSaveProduct = () => {
		if (isValid) {
			setUploading(true)
			UploadImages()
		} else {
			enqueueSnackbar("Fill in all fields correctly", { variant: "error", anchorOrigin: { horizontal: "center", vertical: "top" } })
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
		setProductValue({ ...prevProduct, image: coverImageURL, slide_images: ArrayImages })
		setUploadReady(true)
	}

	useEffect(() => {
		if (uploadReady) {
			CreateProduct()
		}
	}, [uploadReady])

	const CreateProduct = async () => {
		try {
			const response = await axios.post(`${URL_API}products`, {
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
				Revailidate("productsPage")
				setStep(5)
				setIsEdit(false)

				setTimeout(() => {
					setLoadInformation(true)
				}, 5)
			}
		} catch (error) {
			setUploading(false)
			setUploadReady(false)
			console.error(error)
		}
	}

	return (
		<>
			{uploading && (
				<Modal title="" viewModal={uploading}>
					<LoadingIcon className={styles.modal_icon} />
					<p className={styles.modal_text}>Creating product... </p>
					<p className={styles.modal_text}>Please wait a moment.</p>
				</Modal>
			)}
			<Button
				className={styles.details_addFeature}
				buttonProps={{
					onClick: HandleSaveProduct,
					text: "Save",
					type: "submit",
					typeButton: ButtonType.WhitIcon,
					iconButton: <SaveIcon />,
					isSecondary: false,
				}}
				title="Save Product"
			/>
		</>
	)
}
