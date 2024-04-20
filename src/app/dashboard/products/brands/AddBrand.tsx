"use client"

import { CancelIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import styles from "./brands.module.scss"
import { TextField } from "../../components/TextField/TextField"
import { ButtonType, IImage, TextFieldType } from "@/app/Types/types"
import { ChangeEvent, useEffect, useState } from "react"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"
import { enqueueSnackbar } from "notistack"
import axios from "axios"
import { UploadFile } from "@/Firebase/firebase"
import { GetHeightAndWidthFromImageURL } from "@/app/utils/functions"
import { useRouter } from "next/navigation"
import { useViewModal } from "@/app/utils/store"
import { Modal } from "@/app/components/Modal/Modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { brandSchema } from "@/app/validations/productSchema"
import { URL_API } from "@/app/Constants/constants"

interface IErrorFields {
	name: boolean
	logo: boolean
}

type IBrandFileds = {
	name: string
	logo: string
}

export function AddBrands() {
	const router = useRouter()
	const { viewModal, setViewModal, brandSelect, typeModal } = useViewModal()
	const [loadImage, setLoadImage] = useState(true)
	const [logo, setLogo] = useState<IImage[]>([{ file: null, url: brandSelect.logo }])
	const [nameBrand, setNameBrand] = useState<string>(brandSelect.name)
	const { handleSubmit, formState, control, reset } = useForm<IBrandFileds>({
		resolver: zodResolver(brandSchema),
		defaultValues: {
			name: "",
			logo: "",
		},
	})
	const { errors, isValid } = formState

	useEffect(() => {
		const newLogo: IImage[] = [{ file: null, url: brandSelect.logo }]
		setLogo(newLogo)
		setNameBrand(brandSelect.name)
		setLoadImage(true)
	}, [brandSelect])

	const HandleAddBrand = () => {
		if (typeModal === "Add") {
			InsertBrand()
		} else {
			EditBrand()
		}
	}

	const InsertBrand = async () => {
		try {
			let result: string = logo[0].url
			if (logo[0].file && nameBrand !== "" && nameBrand.length > 1) {
				result = await UploadFile(logo[0].file as File, "logosBrands", nameBrand)
			}

			const response = await axios.post(`${URL_API}brands`, { nameBrand, name_logo: nameBrand, logo: result })
			if (response.status === 201) {
				enqueueSnackbar("Brand added successfully", { variant: "success" })
				router.refresh()
				setNameBrand("")
				setLogo([{ file: null, url: "" }])
				setLoadImage(false)
				setViewModal(false)
				return
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				enqueueSnackbar(error.response?.data.message, { variant: "error" })
				console.error(error)
			} else {
				console.error(error)
			}
		}
	}

	const EditBrand = async () => {
		try {
			let result: string = brandSelect.logo
			let name_logo = nameBrand
			if (logo[0].file && nameBrand !== "" && nameBrand.length > 1) {
				result = await UploadFile(logo[0].file as File, "logosBrands", nameBrand)
			}
			const response = await axios.put(`${URL_API}brands/${brandSelect.id}`, { nameBrand, name_logo, logo: result })
			if (response.status === 200) {
				enqueueSnackbar("Successfully edited brand", { variant: "success" })
				setNameBrand("")
				setLogo([{ file: null, url: "" }])
				setLoadImage(false)
				setViewModal(false)
				router.refresh()
				return
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				enqueueSnackbar(error.response?.data.message, { variant: "error" })
				console.error(error)
			} else {
				console.error(error)
			}
		}
	}

	const HandleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
		const name = event.currentTarget.value
		setNameBrand(name)
	}

	const HandleUploadSlideImage = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files) {
			const file = e.target.files[0]

			const url: string = URL.createObjectURL(file)
			const response = await GetHeightAndWidthFromImageURL(url)
			if (file.type !== "image/png") {
				enqueueSnackbar("The image format must be PNG", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 1)
				return
			}
			if (response.width !== 128 || response.height !== 128) {
				enqueueSnackbar("The image cannot be larger than 128px x 128px", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 1)
				return
			}
			if (file.size > 15000) {
				enqueueSnackbar("The image must be less than 15 Kbytes", { variant: "info" })
				setLoadImage(false)
				setTimeout(() => {
					setLoadImage(true)
				}, 1)
				return
			}

			const newImage: IImage[] = [{ file: file, url: url }]
			setLogo(newImage)
		}
	}

	const HandleOpenDialog = () => {
		setViewModal(false)
		reset()
	}

	const HandleOnSubmit = (data: IBrandFileds) => {
		if (isValid) {
			HandleAddBrand()
		}
	}

	return (
		<>
			{viewModal && (
				<Modal title={typeModal === "Edit" ? "Edit brand" : "Add brand"}>
					<form onSubmit={handleSubmit(HandleOnSubmit)} className={styles.addBrands}>
						<TextField
							textFieldProps={{
								label: "Name",
								error: errors.name?.message,
								controlExt: control,
								onChange: HandleChangeName,
								name: "name",
								type: TextFieldType.Text,
								value: nameBrand,
								disabled: typeModal === "Edit",
							}}
						/>
						{loadImage && (
							<LoadImageProvider images={logo || []} width={250} height={250}>
								<TextField
									textFieldProps={{
										label: "Logo",
										error: errors.logo?.message,
										controlExt: control,
										onChange: (e) => HandleUploadSlideImage(e),
										name: "logo",
										type: TextFieldType.File,
										help: "",
									}}
								/>
							</LoadImageProvider>
						)}
						<div className={styles.addBrands_buttons}>
							<Button
								title="Add brands"
								buttonProps={{
									onClick() { },
									text: "Save brand",
									type: "submit",
									iconButton: <SaveIcon />,
								}}
							/>
							<Button
								title="Close"
								buttonProps={{
									onClick: () => HandleOpenDialog(),
									text: "Cancel",
									type: "button",
									iconButton: <CancelIcon />,
									isSecondary: true,
								}}
							/>
						</div>
					</form>
				</Modal>
			)}
		</>
	)
}
