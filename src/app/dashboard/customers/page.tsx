import { ICustomer } from "@/app/Types/types"
import axios from "axios"
import { DataGrid } from "../components/DataGrid/DataGrid"
import { SearchSection } from "../components/SearchSection/SearchSection"
import { TotalCustomers } from "../overview/components/TotalsView/TotalCustomers"
import styles from "./customers.module.scss"
import { URL_API } from "@/app/Constants/constants"

interface ICustomersPagination {
	results: ICustomer[]
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
}

const GetCustomers = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	try {
		const response = await fetch(`${URL_API}customers${paramsString}`, { next: { revalidate: 1, tags: ["customers"] } })
		const data = await response.json()
		console.log(data)
		const customers: ICustomersPagination = data.response
		return customers
	} catch (error) { }
}

export default async function CustomersPage({ searchParams }: { searchParams: string }) {
	const params = Object.entries(searchParams)
	const search = params.filter((param) => param[0] === "search")[0]
	const data = await GetCustomers(params)

	return (
		<section className={styles.section}>
			<header className={styles.section_header}>
				<TotalCustomers />
				<SearchSection total={data?.totalResults || 0} />
			</header>
			{data && (
				<DataGrid
					rows={data?.results}
					columns={[
						{ field: "id", headerName: "ID", role: "text", width: 70 },
						{ field: "name", headerName: "Name", role: "text", width: 130 },
						{ field: "lastname", headerName: "Last Name", role: "text", width: 150 },
						{ field: "email", headerName: "E-mail", role: "text", width: "1fr" },
						{ field: "phonenumber", headerName: "Phone Number", role: "text", width: "1fr" },
						{ field: "", headerName: "", role: "actions", width: "1fr" },
					]}
					paginacion={{ currentPage: data.currentPage, totalPages: data.totalPages }}
					linkView="/dashboard/customers"
					databaseName="customers"
					actions={["view"]}
					detailsView={<></>}
				/>
			)}
		</section>
	)
}
