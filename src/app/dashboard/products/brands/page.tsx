import styles from "./brands.module.scss"
import { IBrand } from "@/app/Types/types"
import { AddBrands } from "./AddBrand"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import { URL_API } from "@/app/Constants/constants"
import { HeaderSection } from "../../components/HeaderSection/HeaderSection"

const GetBrands = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})

	try {
		const response = await fetch(`${URL_API}brands${paramsString}`, { next: { revalidate: 10000, tags: ["getbrands"] } })
		const responseBrands = await response.json()

		const data = responseBrands.response

		return data
	} catch (error) {
		console.error(error)
	}

}

const OptionsDate: Intl.DateTimeFormatOptions = {
	timeZone: "America/Mexico_City",
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
}

interface IPagination {
	results: IBrand[]
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
}

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const response = await GetBrands(params)
	const data: IPagination = response as IPagination

	return (
		<section className={`${styles.section} `}>
			<HeaderSection results={data?.totalResults} title="Add brand" ><AddBrands /></HeaderSection>
			<div className={styles.table}>
				<DataGrid
					columns={[
						{ field: "id", headerName: "ID", width: 50, role: "text" },
						{ field: "name", headerName: "Name", width: "1fr", role: "text" },
						{ field: "logo", headerName: "Logo", width: 80, role: "image" },
						{ field: "created_date", headerName: "Created Date", width: "1fr", role: "date" },
						{ field: "last_modified", headerName: "Last Modified", width: "1fr", role: "date" },
						{ field: "", headerName: "", width: "1fr", role: "actions" },
					]}
					rows={data?.results}
					paginacion={{ currentPage: data?.currentPage, totalPages: data?.totalPages }}
					actions={["edit", "delete"]}
					detailsView={<>VISTA DETALLADA</>}
					editView={<AddBrands></AddBrands>}
					databaseName="brands"
				/>
			</div>
		</section>
	)
}
