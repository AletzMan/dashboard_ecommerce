import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ProductsIcon } from "@/app/SVG/componentsSVG"

export async function TotalProducts() {
	const responseProducts = await axios.get("http://localhost:3000/api/products/count")
	const products: number = responseProducts.data.response
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
