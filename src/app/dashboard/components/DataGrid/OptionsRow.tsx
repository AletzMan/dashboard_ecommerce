"use client"
import { AcceptIcon, CancelIcon, DeleteIcon, EditIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"
import styles from "./datagrid.module.scss"
import { IBrand } from "@/app/Types/types"
import { DeleteFile } from "@/Firebase/firebase"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import { useViewModal } from "@/app/utils/store"
import { Modal } from "@/app/components/Modal/Modal"
import { useCallback, useState } from "react"
import { Button } from "../Button/Button"
import { ICell } from "./DataGrid"

interface Props {
	brand: ICell[]
}

export function OptionsRow(props: Props) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	const section = pathname.split("/")[3] || pathname.split("/")[2]
	//const { setViewModal, setBrandSelect, setTypeModal } = useViewModal()
	const { brand } = props

	const HandleEditBrand = async () => {
		//setTypeModal("Edit")
		//setBrandSelect(brand)
		//setViewModal(true)
	}

	const HandleDeletetBrand = async () => {
		try {
			await DeleteFile("logosBrands", brand[0].value)
			const response = await axios.delete(`/api/${section}/${brand[0].value}`)

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
				<button className={`${styles.options_button} ${styles.options_buttonView}`} onClick={() => HandleEditBrand()}>
					<ViewOnIcon className={styles.options_buttonIcon} />
				</button>
				<button className={`${styles.options_button} ${styles.options_buttonEdit}`} onClick={() => HandleEditBrand()}>
					<EditIcon className={styles.options_buttonIcon} />
				</button>
				<button className={`${styles.options_button} ${styles.options_buttonDelete}`} onClick={() => setOpen(true)}>
					<DeleteIcon className={styles.options_buttonIcon} />
				</button>
			</div>
			{open && (
				<Modal title={"Delete"}>
					<div className={styles.options_message}>
						Are you sure you want to delete the item with ID<br />
						<span className={styles.options_messageMark}>{` ${brand[0].value} `}</span>?
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
