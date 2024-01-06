import axios from "axios"
import styles from "./topproducts.module.scss"
import { IProductData, IProductInventory } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
import { DataGrid } from "@/app/dashboard/components/DataGrid/DataGrid"

export async function TopProducts() {
	const response = await axios.get("http://localhost:3000/api/products/top?quantity=7")
	const products: IProductInventory[] = response.data.products
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
							<li className={styles.product_price}>{FormattedString(Number(product.price))}</li>
							<li className={styles.product_sold}>{product.soldQuantity}</li>
							<li className={styles.product_profit}>{FormattedString(product.price * product.soldQuantity)}</li>
						</ul>
					))}
				</section>
			</article>
		</div>
	)
}
