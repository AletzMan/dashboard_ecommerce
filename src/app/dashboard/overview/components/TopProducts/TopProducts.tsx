
import styles from "./topproducts.module.scss"
import { IProductInventory } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
import { URL_API } from "@/app/Constants/constants"

const GetProducts = async () => {
	try {
		const response = await fetch(`${URL_API}products?order=sold_quantity&limit=7`, { next: { revalidate: 10000 } })
		const responseTop = await response.json()

		return responseTop.response.results as IProductInventory[]
	} catch (error) {
		console.error(error)
		return []
	}
}

export async function TopProducts() {
	const products = await GetProducts()
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
						<ul key={product.sku} className={styles.product}>
							<li className={styles.product_name}>{product.title}</li>
							<li className={styles.product_sku}>{product.sku}</li>
							<li className={styles.product_price}>{FormattedString(Number(product.price))}</li>
							<li className={styles.product_sold}>{product.sold_quantity || 0}</li>
							<li className={styles.product_profit}>{FormattedString(product.price * product.sold_quantity)}</li>
						</ul>
					))}
				</section>
			</article>
		</div>
	)
}
