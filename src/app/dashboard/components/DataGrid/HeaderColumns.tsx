import { ArrowDownSolidtIcon, ArrowUpIcon } from "@/app/SVG/componentsSVG"
import styles from "./datagrid.module.scss"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IColumnHeader } from "./hooks/useGetColumnsAndRows"
import { set } from "firebase/database"

interface Props {
	headerColumns: IColumnHeader[]
	isSearchClient?: (order: string, sort: 'asc' | 'desc') => void
	widthCells: string
	disableOrder?: boolean
}

export function HeaderColumns({ headerColumns, isSearchClient, widthCells, disableOrder }: Props) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const [sort, setSort] = useState("asc")
	const [order, setOrder] = useState("")

	useEffect(() => {
		const order = searchParams.get("order")
		const newSort = searchParams.get("sort") as "asc" | "desc"
		if (order) {
			setOrder(order)
			setSort(newSort)
		} else {
			setOrder("")
			setSort("asc")
		}
	}, [searchParams])



	const HandleOnClickHeader = (order: string,) => {
		if (isSearchClient) {
			isSearchClient(order, sort === "asc" ? "desc" : "asc")
			setSort(sort === "asc" ? "desc" : "asc")
		} else {
			if (disableOrder) return
			const newSort = sort === "asc" ? "desc" : "asc"
			let newRouteParams = new URLSearchParams(searchParams.toString())
			newRouteParams.set("order", order)
			newRouteParams.set("sort", newSort)
			router.push(`${pathname}?${newRouteParams.toString()}`)
		}
	}

	return (
		<div className={styles.header}>
			<ul className={styles.header_container} style={{ gridTemplateColumns: widthCells }}>
				{headerColumns.map((column) => (
					<li key={column.id} className={styles.header_title}>
						{
							<button className={`${styles.header_link} ${order === column.name && styles.header_linkActive}  ${column.role === "image" && styles.header_linkInactive}`} onClick={() => HandleOnClickHeader(column.name)}>
								{column.headerName}
								{column.role !== "image" && (
									<>
										{!disableOrder &&
											<div className={`${styles.header_titleArrows} `}>
												<ArrowDownSolidtIcon className={`${styles.header_titleArrow}  ${styles.header_titleArrowUp}  ${order === column.name && sort == "desc" && styles.header_titleArrowActive} `} />
												<ArrowDownSolidtIcon className={`${styles.header_titleArrow} }  ${order === column.name && sort == "asc" && styles.header_titleArrowActive}`} />
											</div>}
									</>
								)}
							</button>
						}
					</li>
				))}
			</ul>
		</div>
	)
}
