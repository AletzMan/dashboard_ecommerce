import axios from "axios"
import styles from "./coupons.module.scss"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import { SearchSection } from "../../components/SearchSection/SearchSection"
import { ButtonAddCoupon } from "./ButtonAddCoupon"
import { URL_API } from "@/app/Constants/constants"
import { HeaderSection } from "../../components/HeaderSection/HeaderSection"
import { AddCoupon } from "./AddCoupon"

interface ICoupon {
	id: number
	code: string
	description: string
	discount: number
	limits: number
	uses: number
	start_date: string
	end_date: string
}

interface IPagination {
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
	results: ICoupon[]
}

const GetCoupons = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	const response = await fetch(`${URL_API}coupons${paramsString}`, { next: { revalidate: 7200, tags: ["coupons"] } })
	const data = await response.json()
	return data.response
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const data: IPagination = await GetCoupons(params)

	return (
		<section className={`${styles.section} `}>
			{/*<header className={styles.header}>
				<SearchSection total={data.total} placeholder="Search by code or description" />
				<ButtonAddCoupon />
	</header>*/}
			<HeaderSection results={data.totalResults} title="Add Coupon">
				<AddCoupon />
			</HeaderSection>
			<DataGrid
				rows={data.results}
				columns={[
					{ field: "id", headerName: "ID", role: "text", width: 70 },
					{ field: "code", headerName: "Code", role: "text", width: 130 },
					{ field: "description", headerName: "Description", role: "text", width: "1fr" },
					{ field: "discount", headerName: "Discount", role: "text", width: 100 },
					{ field: "limits", headerName: "Limits", role: "text", width: 70 },
					{ field: "uses", headerName: "Uses", role: "text", width: 70 },
					{ field: "start_date", headerName: "Start Date", role: "date", width: 130 },
					{ field: "end_date", headerName: "End Date", role: "date", width: 130 },
					{ field: "actions", headerName: "Actions", role: "actions", width: 50 }
				]}
				paginacion={{
					currentPage: data.currentPage,
					totalPages: data.totalPages,
				}}
				actions={["delete"]}
				databaseName="coupons"
				detailsView={<></>}

			/>
		</section>
	)
}
