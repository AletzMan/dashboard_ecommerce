"use client"
import { ButtonType, TextFieldType } from "@/app/Types/types"
import { TextField } from "../TextField/TextField"
import styles from "./search.module.scss"
import { ChangeEvent, useState } from "react"
import { Button } from "../Button/Button"
import { SearchIcon } from "@/app/SVG/componentsSVG"
import { usePathname, useSearchParams } from "next/navigation"
import { SnackbarProvider } from "notistack"

interface Props {
	total: number
	placeholder?: string
	hasButton?: boolean
}

export const SearchSection = ({ total, placeholder }: Props) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const paramSearch = searchParams.get("search") || ""
	const [search, setSearch] = useState(paramSearch)

	const HandleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const textSearch = e.currentTarget.value
		setSearch(textSearch)
	}

	return (
		<section className={styles.section}>
			<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
			<div className={styles.section_input}>
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
						onClick() { },
						text: "",
						typeButton: ButtonType.WhitIcon,
						type: "button",
						iconButton: <SearchIcon />,
						isSecondary: true,
						href: `${pathname}?search=${search}`,
						disabled: search.length === 0,
					}}
				/>
			</div>
			{
				<div className={styles.section_search}>
					Found
					<span className={styles.section_searchResults}>{`${total}`}</span>
					<span className={styles.section_searchResultsText}>{paramSearch ? " results for " : " result in the database"}
						<span className={styles.section_searchResult}>{`${paramSearch || ""}`}</span></span>
				</div>
			}
		</section>
	)
}
