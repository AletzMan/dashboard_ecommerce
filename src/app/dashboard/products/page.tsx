import { ProductType } from "@/app/Types/types"
import axios from "axios"
import { Suspense } from "react"
import { DataGrid } from "../components/DataGrid/DataGrid"
import { PieChartG } from "../components/PieChart/PieChart"
import { SkeletonDataGrid } from "../overview/components/SkeletonDataGrid/SkeletonDataGrid"
import { SkeletonTotalViews } from "../overview/components/SkeletonTotalViews/SkeletonTotalViews"
import { BestProduct } from "../overview/components/TotalsView/BestProduct"
import { TotalProducts } from "../overview/components/TotalsView/Totalproducts"
import styles from "./productcatalog.module.scss"
import { ProductHeader } from "./ProductHeader"

interface PaginationProducts {
	products: ProductType[]
	totalProducts: number
	totalPages: number
	currentPage: number
	pageSize: number
}

const GetProducts = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	try {
		const response = await axios.get(`http://localhost:3000/api/products/${paramsString}`)
		const products: PaginationProducts = response.data.data
		//const products: ProductType[] = []
		console.log(response.data.data)
		return products
	} catch (error) {
		console.log(error)
	}
}

export default async function Products({ searchParams }: { searchParams: string }) {
	const params = Object.entries(searchParams)
	const search = params.filter((param) => param[0] === "search")[0]
	const response = await GetProducts(params)
	const data: PaginationProducts = response as PaginationProducts
	//const products: ProductType[] = []

	return (
		<Suspense fallback={<SkeletonDataGrid />}>
			<section className={`${styles.section} scrollBarStyle`}>
				<header className={styles.header}>
					<div className={styles.header_top}>
						<Suspense fallback={<SkeletonTotalViews />}>
							<TotalProducts />
						</Suspense>
						<Suspense fallback={<SkeletonTotalViews />}>
							<BestProduct />
						</Suspense>
					</div>
					<ProductHeader products={data.products} totalResults={data?.totalProducts || 0} searchText={search ? search[1] : ""} />
				</header>

				<div className={styles.articles}>
					<DataGrid
						rows={data.products}
						columns={[
							{ field: "id", headerName: "ID", role: "text", width: 60 },
							{ field: "sku", headerName: "SKU", role: "text", width: "1fr" },
							{ field: "image", headerName: "Image", role: "image", width: 70 },
							{ field: "brand", headerName: "Brand", role: "text", width: 130 },
							{ field: "subcategory", headerName: "Subcategory", role: "text", width: "1fr" },
							{ field: "price", headerName: "Price", role: "price", width: 110 },
							{ field: "status", headerName: "Status", role: "status", width: "1fr" },
							{ field: "", headerName: "", role: "actions", width: "1fr" },
						]}
						paginacion={{ currentPage: data.currentPage, totalPages: data.totalPages }}
						actions={["view", "edit", "delete"]}
						statusOptions={{
							statusArray: ["active", "out-of-stock", "inactive"],
							colors: ["#0cd315", "#cebc19", "#FF5722"],
						}}
						linkEdit={"/dashboard/products/add-or-edit-product"}
					/>

					<article className={styles.graph}>
						<PieChartG />
					</article>
				</div>
			</section>
		</Suspense>
	)
}
