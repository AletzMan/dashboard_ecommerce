import styles from "./createedit.module.scss"
import { Details } from "./Details"
import { Information } from "./Information"
import { BasicInformation } from "./BasicInformation"
import { SaveProductsButton } from "./SaveProductButton"

export default function ProductsPage() {
	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<header className={styles.section_header}>
				<SaveProductsButton />
			</header>
			<article className={styles.article}>
				<div className={`${styles.article_section} ${styles.article_sectionBasic}`}>
					<h3 className={styles.article_sectionTitle}>Basic information</h3>
					<BasicInformation />
				</div>
				<div className={styles.article_section}>
					<h3 className={styles.article_sectionTitle}>Sales Information</h3>
					<Information />
					<Details />
				</div>
			</article>
		</section>
	)
}
