"use client"
import { AddIcon } from "@/app/SVG/componentsSVG"
import { ButtonType, ProductType } from "@/app/Types/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { Button } from "../components/Button/Button"
import { SearchSection } from "../components/SearchSection/SearchSection"
import styles from "./productcatalog.module.scss"

interface Props {
	products: ProductType[]
	totalResults: number
	searchText: string
}

export function ProductHeader(props: Props) {
	const { products, searchText, totalResults } = props



	return (
		<>
			<div className={styles.header_search}>
				<div className={styles.header_searchFields}>
					<SearchSection total={totalResults} placeholder="SKU, Brand, category, subcategory" />
				</div>
				<div className={styles.header_container}>
					<Button
						className={styles.header_searchFieldsNew}
						title="New Product"
						buttonProps={{
							text: "New Product",
							iconButton: <AddIcon />,
							type: "button",
							typeButton: ButtonType.WhitIcon,
							onClick() { },
							href: "/dashboard/products/add-or-edit-product",
						}}
					/>
				</div>
			</div>
		</>
	)
}
