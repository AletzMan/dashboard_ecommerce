import { ICustomer } from "@/app/Types/types"
import axios from "axios"
import { DataGrid } from "../components/DataGrid/DataGrid"
import { TotalCustomers } from "../overview/components/TotalsView/TotalCustomers"
import styles from "./customers.module.scss"

interface ICustomersPagination {
	users: ICustomer[]
	totalUsers: number
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
		const response = await axios.get(`http://localhost:3000/api/customers${paramsString}`)
		const data: ICustomersPagination = response.data.data
		return data
	} catch (error) {}
}

export default async function CustomersPage({ searchParams }: { searchParams: string }) {
	const params = Object.entries(searchParams)
	const search = params.filter((param) => param[0] === "search")[0]
	const data = await GetCustomers(params)

	return (
		<section className={styles.section}>
			<TotalCustomers />
			{data && (
				<DataGrid
					rows={data?.users}
					columns={[
						{ field: "id", headerName: "ID", role: "text", width: 70 },
						{ field: "name", headerName: "Name", role: "text", width: 130 },
						{ field: "lastname", headerName: "Last Name", role: "text", width: 150 },
						{ field: "email", headerName: "E-mail", role: "text", width: "1fr" },
						{ field: "phonenumber", headerName: "Phone Number", role: "text", width: "1fr" },
						{ field: "", headerName: "", role: "actions", width: "1fr" },
					]}
					paginacion={{ currentPage: data.currentPage, totalPages: data.totalPages }}
					linkEdit={"/dashboard/customers"}
					actions={["view"]}
				/>
			)}
		</section>
	)
}
