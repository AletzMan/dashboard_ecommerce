import styles from "./createedit.module.scss"
import axios from "axios"
import { ProductType } from "@/app/Types/types"
import { FormProduct } from "./FormProduct"
import { URL_API } from "@/app/Constants/constants"
import { IProduct } from "@/app/interfaces/product"

const GetProduct = async (id: string) => {
	try {
		const response = await fetch(`${URL_API}products/${id}`)
		if (response.status === 200) {
			const responseProduct = await response.json()
			const product: IProduct = responseProduct.response
			return product
		}
	} catch (error) {
		console.error(error)
	}
}

export default async function ProductsPage({ searchParams }: { searchParams: string }) {
	const params = Object.entries(searchParams)

	let productSelect: IProduct | undefined = undefined

	if (params.length > 0) {
		const idFind = params.filter((param) => param[0] === "id")
		if (idFind.length > 0) {
			const id = idFind[0][1]
			if (id) {
				productSelect = await GetProduct(id)
			}
		}
	}

	return (
		<section className={`${styles.section} `}>
			<FormProduct productSelect={productSelect} />
		</section>
	)
}
