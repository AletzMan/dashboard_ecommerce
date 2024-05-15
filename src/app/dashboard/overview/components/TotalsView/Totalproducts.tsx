
import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ProductsIcon } from "@/app/SVG/componentsSVG"
import { URL_API } from "@/app/Constants/constants"

interface Props {
	count?: number
}

const GetTotalProducts = async () => {
	try {
		const response = await fetch(`${URL_API}products`, { next: { revalidate: 10000, tags: ["totalproducts"] } })
		const responseProducts = await response.json()
		return responseProducts.response.totalResults
	} catch (error) {
		console.error(error)
		return 0
	}

}


export async function TotalProducts({ count }: Props) {
	let products = count
	if (!count) {
		products = await GetTotalProducts()
	}

	return (
		<article className={styles.article}>
			<header className={styles.article_header}>
				<span className={styles.article_number}>{products}</span>
				<h4 className={styles.article_title}>Products</h4>
			</header>
			<div className={`${styles.article_products} ${styles.article_image}`}>
				<ProductsIcon className={styles.article_icon} />
			</div>
			<span className={styles.article_balance}>
				<ArrowIcon className={styles.article_balanceIcon} />
				{`${20}%`}
				<span className={styles.article_balanceText}> this week</span>
			</span>
		</article>
	)
}
