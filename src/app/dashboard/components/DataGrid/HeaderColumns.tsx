import { ArrowDownSolidtIcon, ArrowUpIcon } from "@/app/SVG/componentsSVG"
import styles from "./datagrid.module.scss"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { IColumnHeader } from "./DataGrid"
import { useEffect, useState } from "react"

interface Props {
	headerColumns: IColumnHeader[]
}

export function HeaderColumns(props: Props) {
	const { headerColumns } = props
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [sort, setSort] = useState(searchParams.get("order") || headerColumns[0]?.name)
	const [search, setSearch] = useState(searchParams.get("search") || "")

	useEffect(() => {
		const newSort = searchParams.get("sort") == "asc" ? "desc" : "asc"
		const newSearch = searchParams.get("search") || ""
		setSort(newSort)
		setSearch(newSearch)
	}, [searchParams])

	return (
		<div className={styles.header}>
			<ul className={styles.header_container}>
				{headerColumns.map((column) => (
					<li key={column.id} className={styles.header_title}>
						<Link
							className={`${styles.header_link} ${column.role === "image" && styles.header_linkInactive}`}
							title="Order by ID"
							//href={`/dashboard/products/brands?order=id&sort=${newSort}${search ? "&search=" : ""}${search || ""}`}
							href={`${pathname}?order=${column.name}&sort=${sort}${search && "&search=" + search}`}
						>
							{column.headerName}
							{column.role !== "image" && (
								<div className={`${styles.header_titleArrows}  `}>
									<ArrowDownSolidtIcon className={`${styles.header_titleArrow}  ${styles.header_titleArrowUp}  `} />
									<ArrowDownSolidtIcon className={`${styles.header_titleArrow} }`} />
								</div>
							)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
