import styles from "./createedit.module.scss"
import { Details } from "./Details"
import { Information } from "./Information"
import { BasicInformation } from "./BasicInformation"
import { SaveProductsButton } from "./SaveProductButton"
import axios from "axios"
import { ProductType } from "@/app/Types/types"

const GetProduct = async (id: string) => {
	try {
		const response = await axios.get(`http://localhost:3000/api/products/${id}`)
		if (response.status === 200) {
			const product: ProductType = response.data.product[0]
			return product
		}

	} catch (error) {
		console.error(error)
	}

}

export default async function ProductsPage({ searchParams }: { searchParams: string }) {
	const params = Object.entries(searchParams)
	console.log(params)
	let productSelect: ProductType | undefined = undefined

	if (params.length > 0) {
		const idFind = params.filter(param => param[0] === "id")
		if (idFind.length > 0) {
			const id = idFind[0][1]
			productSelect = await GetProduct(id)
		}
	}

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
					<Details productSelect={productSelect} />
				</div>
			</article>
		</section>
	)
}
