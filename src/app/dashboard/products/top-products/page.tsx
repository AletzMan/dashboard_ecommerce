import stylesGeneral from "../../dashboard.module.scss"
import styles from "../products.module.scss"

export default function ProductsPage() {
	return (
		<section className={stylesGeneral.section}>
			<h2 className={stylesGeneral.section__title}>TOP PRODUCTS</h2>
			<article className={styles.article}></article>
		</section>
	)
}
