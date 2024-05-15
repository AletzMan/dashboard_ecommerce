import { Pagination } from '@/app/components/Pagination/Pagination'
import { IAlertInventory, IProductInventory } from '@/app/Types/types'
import { SearchSection } from '../components/SearchSection/SearchSection'
import HeaderInventory from './components/HeaderInventory/HeaderInventory'
import ItemCard from './components/ItemCard'
import styles from './inventory.module.scss'
import { URL_API } from '@/app/Constants/constants'

const GetProducts = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	const response = await fetch(`${URL_API}products${paramsString}`, { next: { revalidate: 10000, tags: ["inventoryPage"] } })
	const products = await response.json()

	return products.response
}

const GetAlerts = async () => {
	try {
		const response = await fetch(`${URL_API}products/statistics/alerts`, { next: { revalidate: 10000, tags: ["alerts"] } })
		const data = await response.json()
		if (response.status === 200) {
			return data.response
		}
	} catch (error) {
		console.error(error)
	}

}

interface IProducts {
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
	results: IProductInventory[]
}

export default async function InventoryPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const response = await GetProducts(params)
	const alerts: IAlertInventory[] = await GetAlerts()

	const data: IProducts = response

	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<HeaderInventory alerts={alerts} />
				<SearchSection total={data.totalResults} placeholder="Search by name or SKU" />
			</header>
			{data &&
				<section className={`${styles.products} scrollBarStyle`}>
					{data.results?.map(product => (
						<ItemCard key={product.id} product={product} alerts={alerts} />
					))}
				</section>}
			<footer className={styles.footer}>
				<Pagination currentPage={data.currentPage} totalPages={data.totalPages} pathname="/dashboard/inventory" />
			</footer>
		</section>
	)
}
