"use client"
import { AddIcon, CloseIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import styles from "./brands.module.scss"
import { useViewID, useViewModal } from "@/app/utils/store"

export function AddBrandButton() {
	const { setViewModal, setBrandSelect, setTypeModal } = useViewModal()

	function HandleOpenDialog(): void {
		setTypeModal("Add")
		setViewModal(true)
		setBrandSelect({ id: 0, name: "", logo: "", created_date: "", last_modified: "" })

	}

	return (
		<div className={styles.buttonAddBrand}>
			<Button
				className={styles.buttonAddBrand}
				title="New brands"
				buttonProps={{
					onClick: () => HandleOpenDialog(),
					text: "New brand",
					type: "button",
					iconButton: <AddIcon />,
					isSecondary: false,
				}}
			/>
		</div>
	)
}
