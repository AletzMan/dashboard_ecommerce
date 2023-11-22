import axios from "axios"
import styles from "./topproducts.module.scss"
import { IProductData } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"

export async function TopProducts() {
	const response = await axios.get("http://localhost:3000/api/products?sort=profit&quantity=6")
	const products: IProductData[] = response.data.response
	return (
		<div className={`${styles.section} scrollBarStyle`}>
			<article className={styles.article}>
				<ul className={styles.article_header}>
					<li className={styles.article_headerText}>Name</li>
					<li className={styles.article_headerText}>SKU</li>
					<li className={styles.article_headerText}>Price</li>
					<li className={styles.article_headerText}>Sold</li>
					<li className={styles.article_headerText}>Profit</li>
				</ul>
				<section className={styles.products}>
					{products.map((product) => (
						<ul className={styles.product}>
							<li className={styles.product_name}>{product.name}</li>
							<li className={styles.product_sku}>{product.sku}</li>
							<li className={styles.product_price}>{FormattedString(product.price)}</li>
							<li className={styles.product_sold}>{product.piecesSold}</li>
							<li className={styles.product_profit}>{FormattedString(product.quantitySold)}</li>
						</ul>
					))}
				</section>
			</article>
		</div>
	)
}
