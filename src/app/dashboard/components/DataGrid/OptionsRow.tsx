"use client"
import { AcceptIcon, CancelIcon, DeleteIcon, EditIcon, SaveIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"
import styles from "./datagrid.module.scss"
import axios from "axios"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import { Modal } from "@/app/components/Modal/Modal"
import React, { ReactNode, useCallback, useState } from "react"
import { Button } from "../Button/Button"
import { ICell } from "./DataGrid"
import { useViewID } from "@/app/utils/store"
import { URL_API } from "@/app/Constants/constants"
import { Revailidate } from "@/app/services/actions"

interface Props {
	row: ICell[]
	linkEdit?: string
	linkView?: string
	actions?: ["view"] | ["edit"] | ["delete"] | ["view", "edit"] | ["view", "delete"] | ["edit", "delete"] | ["view", "edit", "delete"]
	databaseName?: string
	detailsView: React.JSX.Element
	editView?: React.JSX.Element
}

export function OptionsRow({ row, linkEdit, actions, databaseName, detailsView, editView, linkView }: Props) {
	const { setViewID } = useViewID()
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [typeModal, setTypeModal] = useState<"Edit" | "Delete" | "View">("View")

	const HandleEdit = async () => {
		if (linkEdit) {
			router.push(`${linkEdit}?id=${row[0].value}`)
		} else {
			setTypeModal("Edit")
			setViewID(row[0].value)
			setOpen(true)
		}
	}

	const DeleteItem = async () => {
		try {
			const response = await fetch(`${URL_API}${databaseName}/${row[0].value}`, { method: "DELETE" })

			if (response.status === 200) {
				enqueueSnackbar("Registro eliminado correctamente", { variant: "success" })
				Revailidate(`get${databaseName}`)
				router.refresh()
				setOpen(false)
			}
		} catch (error) {
			console.error(error)
			enqueueSnackbar("Error al borrar registro", { variant: "error" })
			setOpen(false)
		}
	}

	const HandleView = async () => {
		if (linkView) {
			router.push(`${linkView}/details?id=${row[0].value}`)
		} else {
			setViewID(row[0].value)
			setTypeModal("View")
			setOpen(true)
		}
	}

	const HandleDelete = async () => {
		setTypeModal("Delete")
		setOpen(true)
	}

	const ButtonsOptions = useCallback(() => {
		let buttons: ReactNode[] = []

		actions?.forEach((action) => {
			if (action === "view") {
				buttons.push(
					<button
						className={`${styles.options_button} ${styles.options_buttonView}`}
						onClick={() => HandleView()}
						title="View details"
					>
						<ViewOnIcon className={styles.options_buttonIcon} />
					</button>
				)
			}
			if (action === "edit") {
				buttons.push(
					<button
						className={`${styles.options_button} ${styles.options_buttonEdit}`}
						onClick={() => HandleEdit()}
					>
						<EditIcon className={styles.options_buttonIcon} />
					</button>
				)
			}
			if (action === "delete") {
				buttons.push(
					<button className={`${styles.options_button} ${styles.options_buttonDelete}`} onClick={HandleDelete}>
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
			{(
				<Modal title={typeModal}
					icon={typeModal === "View" ? <ViewOnIcon /> : typeModal === "Delete" ? <DeleteIcon /> : <EditIcon />}
					onClick={() => setOpen(false)}
					viewModal={open}
				>
					<div className={styles.options_content}>
						{typeModal === "Delete" &&
							<div className={styles.options_message}>
								¿Está seguro de que desea eliminar el elemento?
								<br />
								<span className={styles.options_messageMark}>{` ${row[1].value} `}</span>
							</div>
						}
						{typeModal === "View" &&
							<>
								{detailsView}
							</>
						}
						{typeModal === "Edit" &&
							<>
								{editView}
							</>
						}
						{typeModal === "Delete" &&
							<div className={styles.options_buttons}>
								<Button
									title="Cancel"
									buttonProps={{
										onClick: () => setOpen(false),
										text: "Cancel",
										iconButton: <CancelIcon />,
										type: "button",
										isSecondary: true,
									}}
								/>
								<Button
									title={typeModal === "Delete" ? "Delete" : "Save"}
									buttonProps={{
										onClick: DeleteItem,
										text: typeModal === "Delete" ? "Delete" : "Save",
										type: "button",
										iconButton: typeModal === "Delete" ? <AcceptIcon /> : <SaveIcon />,
									}}
								/>
							</div>
						}
					</div>

				</Modal>
			)}
		</>
	)
}
