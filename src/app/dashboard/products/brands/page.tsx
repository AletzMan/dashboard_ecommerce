import axios from "axios"
import styles from "./brands.module.scss"
import { IBrand } from "@/app/Types/types"
import { AddBrands } from "./AddBrand"
import Image from "next/image"
import { OptionsBrand } from "./OptionsBrand"
import { AddBrandButton } from "./AddBrandButton"
import { HeaderBrands } from "./HeaderBrands"
import { SearchBrands } from "./SearchBrand"

const GetBrands = async (sort: string, order: string) => {
	const response = await axios.get("http://localhost:3000/api/brands")
	const brands: IBrand[] = response.data.brands
	if (sort === "id" || sort === "name" || sort === "createdDate" || sort === "lastModified") {
		const newSort = brands.sort((a, b) => {
			if (a[sort] > b[sort]) {
				if (order === "asc") return 1
				else if (order === "desc") return -1
			}
			if (a[sort] < b[sort]) {
				if (order === "asc") return -1
				else if (order === "desc") return 1
			}
			return 0
		})
		return newSort
	}
	return brands
}

const OptionsDate: Intl.DateTimeFormatOptions = {
	timeZone: "America/Mexico_City",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: true, // Para usar el formato de 12 horas (AM/PM)
}

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	const sort = searchParams.sort
	const order = searchParams.order
	const search = searchParams.search
	let brands = await GetBrands(sort, order)

	if (search) {
		const searchBrands = brands.filter((brand) => brand.name.toLowerCase().includes(search))
		brands = searchBrands
	}

	return (
		<section className={`${styles.section} `}>
			<header className={styles.section_header}>
				<SearchBrands />
				<AddBrandButton />

				<div className={styles.section_search}>
					Found
					<span className={styles.section_searchResults}>{`${brands.length}`}</span> {search ? "results for" : " brands in the database"}
					<span className={styles.section_searchResult}>{`${search || ""}`}</span>
				</div>
			</header>
			<article className={`${styles.article} scrollBarStyleX`}>
				<HeaderBrands sort={sort} order={order} search={search} />
				<div className={`${styles.container} scrollBarStyle`}>
					<div className={`${styles.brands}`}>
						{brands.map((brand) => (
							<ul key={brand.id} className={styles.brand}>
								<li className={`${styles.brand_item} ${styles.brand_id}`}>{brand.id}</li>
								<li className={`${styles.brand_item} ${styles.brand_name}`}>{brand.name}</li>
								<li className={`${styles.brand_item} ${styles.brand_image}`}>
									<Image className={styles.brand_imageImg} src={brand.logo} width={65} height={65} alt={`Logo de ${brand.name}`} />
								</li>
								<li className={`${styles.brand_item} ${styles.brand_dateCreated}`}>
									{new Date(brand.createdDate).toLocaleString("es-MX", OptionsDate)}
								</li>
								<li className={`${styles.brand_item} ${styles.brand_dateCreated}`}>
									{new Date(brand.lastModified).toLocaleString("es-MX", OptionsDate)}
								</li>
								<li className={`${styles.brand_item} ${styles.brand_delete}`}>
									<OptionsBrand brand={brand} />
								</li>
							</ul>
						))}
					</div>
				</div>
			</article>
			<AddBrands />
		</section>
	)
}
