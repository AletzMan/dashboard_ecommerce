import { ArrowUpIcon } from "@/app/SVG/componentsSVG"
import styles from "./brands.module.scss"
import Link from "next/link"

interface Props {
	sort: string
	order: string
	search: string
}

export function HeaderBrands(props: Props) {
	const { sort, order, search } = props
	const newOrder = order === "asc" ? "desc" : "asc"

	return (
		<div className={styles.brands_headerContainer}>
			<ul className={styles.brands_header}>
				<li className={styles.brands_headerTitle}>
					<Link
						className={styles.brands_headerLink}
						title="Order by ID"
						href={`/dashboard/products/brands?sort=id&order=${newOrder}${search ? "&search=" : ""}${search || ""}`}
					>
						ID
						{(sort === "id" || !sort) && (
							<ArrowUpIcon className={`${styles.brands_headerTitleArrow} ${order === "desc" && styles.brands_headerTitleArrowDesc}`} />
						)}
					</Link>
				</li>
				<li className={styles.brands_headerTitle}>
					<Link
						className={styles.brands_headerLink}
						title="Order by name"
						href={`/dashboard/products/brands?sort=name&order=${newOrder}${search ? "&search=" : ""}${search || ""}`}
					>
						Name
						{sort === "name" && <ArrowUpIcon className={`${styles.brands_headerTitleArrow}`} />}
					</Link>
				</li>
				<li className={styles.brands_headerTitle}>Logo</li>
				<li className={`${styles.brands_headerTitle} ${styles.brands_headerTitleDate}`}>
					<Link
						className={styles.brands_headerLink}
						title="Order by created date"
						href={`/dashboard/products/brands?sort=createdDate&order=${newOrder}${search ? "&search=" : ""}${search || ""}`}
					>
						Created Date
						{sort === "createdDate" && <ArrowUpIcon className={`${styles.brands_headerTitleArrow}`} />}
					</Link>
				</li>
				<li className={`${styles.brands_headerTitle} ${styles.brands_headerTitleDate}`}>
					<Link
						className={styles.brands_headerLink}
						title="Order by las modified"
						href={`/dashboard/products/brands?sort=lastModified&order=${newOrder}${search ? "&search=" : ""}${search || ""}`}
					>
						Last Modified
						{sort === "lastModified" && <ArrowUpIcon className={`${styles.brands_headerTitleArrow}`} />}
					</Link>
				</li>
				<li className={styles.brands_headerTitle}></li>
			</ul>
		</div>
	)
}
