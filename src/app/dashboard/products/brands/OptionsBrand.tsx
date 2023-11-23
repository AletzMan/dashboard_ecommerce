"use client"
import { AcceptIcon, CancelIcon, DeleteIcon, EditIcon } from "@/app/SVG/componentsSVG"
import styles from "./brands.module.scss"
import { IBrand } from "@/app/Types/types"
import { DeleteFile } from "@/Firebase/firebase"
import axios from "axios"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import { useViewModal } from "@/app/utils/store"
import { Modal } from "@/app/components/Modal/Modal"
import { useState } from "react"
import { Button } from "../../components/Button/Button"

interface Props {
	brand: IBrand
}

export function OptionsBrand(props: Props) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const { setViewModal, setBrandSelect, setTypeModal } = useViewModal()
	const { brand } = props

	const HandleEditBrand = async () => {
		setTypeModal("Edit")
		setBrandSelect(brand)
		setViewModal(true)
	}

	const HandleDeletetBrand = async () => {
		try {
			await DeleteFile("logosBrands", brand.name)
			const response = await axios.delete(`/api/brands/${brand.id}`)

			if (response.status === 200) {
				enqueueSnackbar("Record successfully deleted", { variant: "success" })
				router.refresh()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<div className={styles.options}>
				<button className={styles.options_button} onClick={HandleEditBrand}>
					<EditIcon className={styles.options_buttonIcon} />
				</button>
				<button className={`${styles.options_button} ${styles.options_buttonDelete}`} onClick={() => setOpen(true)}>
					<DeleteIcon className={styles.options_buttonIcon} />
				</button>
			</div>
			{open && (
				<Modal title="Delete brand">
					<div className={styles.options_message}>
						Are you sure you want to delete the brand<span className={styles.options_messageMark}>{` ${brand.name} `}</span> with ID{" "}
						<span className={styles.options_messageMark}>{` ${brand.id} `}</span>?
					</div>
					<div className={styles.options_buttons}>
						<Button
							title="Delete"
							buttonProps={{
								onClick: HandleDeletetBrand,
								text: "Accept",
								type: "button",
								iconButton: <AcceptIcon />,
							}}
						/>
						<Button
							title="Cancel"
							buttonProps={{
								onClick: () => setOpen(false),
								text: "Cancel",
								type: "button",
								iconButton: <CancelIcon />,
								isSecondary: true,
							}}
						/>
					</div>
				</Modal>
			)}
		</>
	)
}
