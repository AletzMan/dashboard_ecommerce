"use client"
import { AddIcon, CloseIcon } from "@/app/SVG/componentsSVG"
import { Button } from "../../components/Button/Button"
import styles from "./brands.module.scss"
import { useViewModal } from "@/app/utils/store"

export function AddBrandButton() {
	const { setViewModal, setBrandSelect, setTypeModal } = useViewModal()
	function HandleOpenDialog(): void {
		setTypeModal("Add")
		setViewModal(true)
		setBrandSelect({ id: 0, name: "", logo: "", name_logo: "", createdDate: "", lastModified: "" })
	}

	return (
		<div className={styles.buttonAddBrand}>
			<Button
				title="Add brands"
				buttonProps={{
					onClick: () => HandleOpenDialog(),
					text: "Add brand",
					type: "button",
					iconButton: <AddIcon />,
					isSecondary: true,
				}}
			/>
		</div>
	)
}
