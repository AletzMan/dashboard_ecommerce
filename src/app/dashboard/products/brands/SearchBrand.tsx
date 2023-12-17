"use client"
import { ButtonType, TextFieldType } from "@/app/Types/types"
import { TextField } from "../../components/TextField/TextField"
import styles from "./brands.module.scss"
import { ChangeEvent, useState } from "react"
import { Button } from "../../components/Button/Button"
import { SearchIcon } from "@/app/SVG/componentsSVG"
import { usePathname, useSearchParams } from "next/navigation"

interface Props {
	total: number
	placeholder?: string
}

export const SearchBrands = ({ total, placeholder }: Props) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const paramSearch = searchParams.get("search") || ""
	const [search, setSearch] = useState(paramSearch)

	const HandleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const textSearch = e.currentTarget.value
		setSearch(textSearch)
	}

	console.log("search", search)

	return (
		<div className={styles.search}>
			<div className={styles.search_input}>
				<TextField
					textFieldProps={{
						label: "",
						error: "",
						onChange: HandleChangeName,
						name: "name",
						type: TextFieldType.Search,
						value: search,
						placeholder: placeholder,
					}}
				/>
				<Button
					title="Search"
					buttonProps={{
						onClick() {},
						text: "",
						typeButton: ButtonType.OnlyIcon,
						type: "button",
						iconButton: <SearchIcon />,
						isSecondary: false,
						href: `${pathname}?search=${search}`,
						disabled: search.length === 0,
					}}
				/>
			</div>
			{
				<div className={styles.section_search}>
					Found
					<span className={styles.section_searchResults}>{`${total}`}</span> {paramSearch ? "results for" : " result in the database"}
					<span className={styles.section_searchResult}>{`${paramSearch || ""}`}</span>
				</div>
			}
		</div>
	)
}
