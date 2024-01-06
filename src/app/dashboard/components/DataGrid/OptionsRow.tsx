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
import { ReactNode, useCallback, useState } from "react"
import { Button } from "../Button/Button"
import { ICell } from "./DataGrid"
import Link from "next/link"

interface Props {
	row: ICell[]
	linkEdit?: string
	actions?: ["view"] | ["edit"] | ["delete"] | ["view", "edit"] | ["view", "delete"] | ["edit", "delete"] | ["view", "edit", "delete"]
	databaseName?: string
}

export function OptionsRow(props: Props) {
	const { row, linkEdit, actions, databaseName } = props
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	const section = pathname.split("/")[3] || pathname.split("/")[2]
	//const { setViewModal, setBrandSelect, setTypeModal } = useViewModal()

	const HandleEditBrand = async () => {
		//setTypeModal("Edit")
		//setBrandSelect(brand)
		//setViewModal(true)
	}

	const HandleDeletetBrand = async () => {
		try {
			//await DeleteFile("logosBrands", row[0].value)
			const response = await axios.delete(`/api/${databaseName}/${row[0].value}`)

			if (response.status === 200) {
				enqueueSnackbar("Record successfully deleted", { variant: "success" })
				router.refresh()
				setOpen(false)
			}
		} catch (error) {
			console.error(error)
			enqueueSnackbar("Error deleting record", { variant: "error" })
			setOpen(false)
		}
	}

	const ButtonsOptions = useCallback(() => {
		let buttons: ReactNode[] = []

		actions?.forEach((action) => {
			if (action === "view") {
				buttons.push(
					<Link
						href={`${linkEdit}/${row[0].value}` || ""}
						className={`${styles.options_button} ${styles.options_buttonView}`}
						onClick={() => HandleEditBrand()}
					>
						<ViewOnIcon className={styles.options_buttonIcon} />
					</Link>
				)
			}
			if (action === "edit") {
				buttons.push(
					<Link
						href={`${linkEdit}?id=${row[0].value}` || ""}
						className={`${styles.options_button} ${styles.options_buttonEdit}`}
						onClick={() => HandleEditBrand()}
					>
						<EditIcon className={styles.options_buttonIcon} />
					</Link>
				)
			}
			if (action === "delete") {
				buttons.push(
					<button className={`${styles.options_button} ${styles.options_buttonDelete}`} onClick={() => setOpen(true)}>
						<DeleteIcon className={styles.options_buttonIcon} />
					</button>
				)
			}
		})

		return buttons
	}, [])

	return (
		<>
			<div className={styles.options}>
				{ButtonsOptions().map((button, index) => (
					<div key={index}>{button}</div>
				))}
			</div>
			{open && (
				<Modal title={"Delete"}>
					<div className={styles.options_message}>
						Are you sure you want to delete the item with ID
						<br />
						<span className={styles.options_messageMark}>{` ${row[0].value} `}</span>?
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
