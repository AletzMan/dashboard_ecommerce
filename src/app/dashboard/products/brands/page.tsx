import axios from "axios"
import styles from "./brands.module.scss"
import { IBrand } from "@/app/Types/types"
import { AddBrands } from "./AddBrand"
import { AddBrandButton } from "./AddBrandButton"
import { SearchSection } from "../../components/SearchSection/SearchSection"
import { DataGrid } from "../../components/DataGrid/DataGrid"

const GetBrands = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	const response = await axios.get(`http://localhost:3000/api/brands/${paramsString}`)
	const data = response.data.data

	return data
}

const OptionsDate: Intl.DateTimeFormatOptions = {
	timeZone: "America/Mexico_City",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	//hour: "2-digit",
	//minute: "2-digit",
	//second: "2-digit",
	//hour12: true, // Para usar el formato de 12 horas (AM/PM)
}

interface IPagination {
	brands: IBrand[]
	totalBrands: number
	totalPages: number
	currentPage: number
	pageSize: number
}

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const search = searchParams.search
	const response = await GetBrands(params)
	const data: IPagination = response as IPagination

	return (
		<section className={`${styles.section} `}>
			<header className={styles.section_header}>
				<SearchSection total={data.totalBrands} placeholder="AMD, Intel, samsung, etc..." />
				<AddBrandButton />
			</header>
			<div className={styles.table}>
				<DataGrid
					columns={[
						{ field: "id", headerName: "ID", width: 50, role: "text" },
						{ field: "name", headerName: "Name", width: "1fr", role: "text" },
						{ field: "logo", headerName: "Logo", width: 80, role: "image" },
						{ field: "createdDate", headerName: "Created Date", width: "1fr", role: "date" },
						{ field: "lastModified", headerName: "Last Modified", width: "1fr", role: "date" },
						{ field: "", headerName: "", width: "1fr", role: "actions" },
					]}
					rows={data.brands}
					paginacion={{ currentPage: data.currentPage, totalPages: data.totalPages }}
					actions={["view", "edit", "delete"]}
				/>
			</div>
			<AddBrands />
		</section>
	)
}
