"use client"
import { ButtonType, TextFieldType } from "@/app/Types/types"
import { TextField } from "../../components/TextField/TextField"
import styles from "./brands.module.scss"
import { ChangeEvent, useState } from "react"
import { Button } from "../../components/Button/Button"
import { SearchIcon } from "@/app/SVG/componentsSVG"
import { useSearchParams } from "next/navigation"
export function SearchBrands() {
	const searchParams = useSearchParams()
	const paramSearch = searchParams.get("search") || ""
	const [search, setSearch] = useState(paramSearch)

	const HandleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const textSearch = e.currentTarget.value
		setSearch(textSearch)
	}

	return (
		<div className={styles.search}>
			<TextField
				textFieldProps={{
					label: "",
					error: false,
					onChange: HandleChangeName,
					name: "name",
					type: TextFieldType.Search,
					value: search,
					placeholder: "AMD, Intel, samsung, etc...",
				}}
			/>
			<Button
				title="Search"
				buttonProps={{
					onClick() { },
					text: "",
					typeButton: ButtonType.OnlyIcon,
					type: "button",
					iconButton: <SearchIcon />,
					isSecondary: false,
					href: `/dashboard/products/brands?search=${search}`,
					disabled: search.length === 0,
				}}
			/>
		</div>
	)
}
