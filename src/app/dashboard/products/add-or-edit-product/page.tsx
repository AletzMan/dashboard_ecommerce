import styles from "./createedit.module.scss"
import axios from "axios"
import { ProductType } from "@/app/Types/types"
import { FormProduct } from "./FormProdtc"

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
		const idFind = params.filter((param) => param[0] === "id")
		if (idFind.length > 0) {
			const id = idFind[0][1]
			productSelect = await GetProduct(id)
		}
	}

	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<FormProduct productSelect={productSelect} />
		</section>
	)
}
