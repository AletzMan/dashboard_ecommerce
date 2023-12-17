import axios from "axios"
import styles from "./coupons.module.scss"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import { SearchBrands } from "../../products/brands/SearchBrand"

interface ICoupon {
	id: number
	code: string
	description: string
	discount: number
	uses: number
	start_date: string
	end_date: string
}

interface IPagination {
	total: number
	totalPages: number
	currentPage: number
	pageSize: number
	coupons: ICoupon[]
}

const GetCoupons = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	const response = await axios(`http://localhost:3000/api/coupons${paramsString}`)
	const data = await response.data
	return data
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const data: IPagination = await GetCoupons(params)
	console.log(data)
	return (
		<section className={styles.section}>
			<SearchBrands total={data.total} placeholder="AMD, Intel, samsung, etc..." />
			<DataGrid
				rows={data.coupons}
				columns={[
					{ field: "id", headerName: "ID", role: "text", width: 70 },
					{ field: "code", headerName: "Code", role: "text", width: 130 },
					{ field: "description", headerName: "Description", role: "text", width: "1fr" },
					{ field: "discount", headerName: "Discount", role: "text", width: 130 },
					{ field: "uses", headerName: "Uses", role: "text", width: 130 },
					{ field: "start_date", headerName: "Start Date", role: "date", width: 130 },
					{ field: "end_date", headerName: "End Date", role: "date", width: 130 },
				]}
				paginacion={{
					currentPage: data.currentPage,
					totalPages: data.totalPages,
				}}
			/>
		</section>
	)
}
