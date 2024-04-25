"use client"

import { LoadingIcon, SaveIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import styles from "./brands.module.scss"
import { TextField } from "../../components/TextField/TextField"
import { IBrand, IImage, TextFieldType } from "@/app/Types/types"
import { ChangeEvent, useEffect, useState } from "react"
import { LoadImageProvider } from "@/app/components/LoadImageProvider/LoadImageProvider"
import { enqueueSnackbar } from "notistack"
import axios from "axios"
import { UploadFile } from "@/Firebase/firebase"
import { GetHeightAndWidthFromImageURL } from "@/app/utils/functions"
import { useRouter } from "next/navigation"
import { useViewID, useViewModal } from "@/app/utils/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { brandSchema } from "@/app/validations/productSchema"
import { URL_API } from "@/app/Constants/constants"
import { Revailidate } from "@/app/services/actions"

type IBrandFileds = {
	name: string
	logo: string
}

interface Props {

}

export function AddBrands() {
	const { viewID } = useViewID()
	const router = useRouter()
	const [brand, setBrand] = useState<IBrand | undefined>(undefined)
	const [loadImage, setLoadImage] = useState(true)
	const [loading, setLoading] = useState(false)
	const [logo, setLogo] = useState<IImage[]>([{ file: null, url: "" }])
	const [nameBrand, setNameBrand] = useState<string>("")
	const { handleSubmit, formState, control, reset, setValue } = useForm<IBrandFileds>({
		resolver: zodResolver(brandSchema),
		defaultValues: {
			name: "",
			logo: "",
		},
		mode: "all"
	})
	const { errors, isValid } = formState

	useEffect(() => {
		if (viewID) {
			GetBrand()
			setLoadImage(true)
		}
	}, [viewID])

	const GetBrand = async () => {
		try {
			const response = await fetch(`${URL_API}brands/${viewID}`, { next: { revalidate: 3600 }, cache: "force-cache" })
			const data = await response.json()
			if (response.status === 200) {
				const newLogo: IImage[] = [{ file: null, url: "" }]
				const editBrand: IBrand = data.response
				newLogo[0].url = editBrand.logo
				setValue("name", editBrand.name)
				setValue("logo", editBrand.logo)
				setBrand(editBrand)
				setLogo(newLogo)
				setNameBrand(editBrand.name)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			return undefined
		}
	}

	const HandleAddBrand = () => {
		setLoading(true)
		if (viewID) {
			EditBrand()
		} else {
			InsertBrand()
		}
	}

	const InsertBrand = async () => {
		try {
			let result: string = logo[0].url
			if (logo[0].file && nameBrand !== "" && nameBrand.length > 1) {
				result = await UploadFile(logo[0].file as File, "logosBrands", nameBrand)
			}

			const response = await axios.post(`${URL_API}brands`, { name: nameBrand, logo: result })
			if (response.status === 201) {
				enqueueSnackbar("Brand added successfully", { variant: "success" })
				setNameBrand("")
				setLogo([{ file: null, url: "" }])
				await Revailidate("getbrands")
				router.refresh()
				setLoading(false)
				setLoadImage(false)
				setValue("name", "")
				setValue("logo", "")
				setTimeout(() => {
					setLoadImage(true)
				}, 5);
				return
			}
		} catch (error) {
			console.error(error)
			if (axios.isAxiosError(error) && error.response) {
				enqueueSnackbar(error.response?.data.message, { variant: "error" })
			}
			setLoading(false)
		}
	}

	const EditBrand = async () => {
		try {
			let result: string | undefined = brand?.logo
			let name_logo = nameBrand
			if (logo[0].file && nameBrand !== "" && nameBrand.length > 1) {
				result = await UploadFile(logo[0].file as File, "logosBrands", nameBrand)
			}
			const response = await axios.put(`${URL_API}brands/${brand?.id}`, { name: name_logo, logo: result })

			if (response.status === 200) {
				enqueueSnackbar("Successfully edited brand", { variant: "success" })
				setNameBrand("")
				setBrand(undefined)
				setLogo([{ file: null, url: "" }])
				await Revailidate("getbrands")
				router.refresh()
				setLoading(false)
				return
			}
		} catch (error) {
			setLoading(false)
			console.error(error)
			if (axios.isAxiosError(error) && error.response) {
				enqueueSnackbar(error.response?.data.message, { variant: "error" })
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
		//setViewModal(false)
		reset()
	}

	const HandleOnSubmit = (data: IBrandFileds) => {
		HandleAddBrand()
	}

	return (
		<>
			<form onSubmit={handleSubmit(HandleOnSubmit)} className={styles.addBrands}>
				{loadImage && (<>
					<TextField
						textFieldProps={{
							label: "Name",
							error: errors.name?.message,
							controlExt: control,
							onChange: HandleChangeName,
							name: "name",
							type: TextFieldType.Text,
							value: nameBrand,
							disabled: false,
						}}
					/>
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
				</>
				)}
				<div className={styles.addBrands_buttons}>
					<Button
						className={styles.addBrands_button}
						title="Add brands"
						buttonProps={{
							onClick() { },
							text: loading ? "Loading" : "Save brand",
							type: "submit",
							iconButton: loading ? <LoadingIcon /> : <SaveIcon />,
							disabled: loading
						}}
					/>
				</div>
			</form>

		</>
	)
}
