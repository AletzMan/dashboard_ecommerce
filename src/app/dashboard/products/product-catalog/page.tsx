import stylesGeneral from "../../dashboard.module.scss"
import styles from "../products.module.scss"

export default function ProductCatalogPage() {
	return (
		<section className={stylesGeneral.section}>
			<h2 className={stylesGeneral.section__title}>PRODUCT CATALOG</h2>
			<article className={styles.article}></article>
		</section>
	)
}
