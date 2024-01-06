import { Pagination } from '@/app/components/Pagination/Pagination'
import { IAlertInventory, IProductInventory } from '@/app/Types/types'
import axios from 'axios'
import { ComboBox } from '../components/ComboBox/ComboBox'
import { SearchSection } from '../components/SearchSection/SearchSection'
import HeaderInventory from './components/HeaderInventory/HeaderInventory'
import ItemCard from './components/ItemCard'
import styles from './inventory.module.scss'

const GetProducts = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	const response = await axios.get(`http://localhost:3000/api/products${paramsString}`)
	const products = response.data.data
	return products
}

const GetAlerts = async () => {
	try {
		const response = await axios.get(`http://localhost:3000/api/products/alerts`)
		if (response.status === 200) {
			const alerts = response.data.alerts
			return alerts
		}
	} catch (error) {
		console.error(error)
	}

}

interface IProducts {
	totalProducts: number
	totalPages: number
	currentPage: number
	pageSize: number
	products: IProductInventory[]
}

export default async function InventoryPage({ searchParams }: { searchParams: { [key: string]: string } }) {
	const params = Object.entries(searchParams)
	const response = await GetProducts(params)
	const alerts: IAlertInventory[] = await GetAlerts()
	console.log(alerts[0])

	const data: IProducts = response

	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<HeaderInventory alerts={alerts} />
				<SearchSection total={data.totalProducts} placeholder="Search by name or SKU" />
			</header>
			{data &&
				<section className={styles.products}>
					{data.products?.map(product => (
						<ItemCard key={product.id} product={product} alerts={alerts} />
					))}
				</section>}
			<footer className={styles.footer}>
				<Pagination currentPage={data.currentPage} totalPages={data.totalPages} pathname="/dashboard/inventory" />
			</footer>
		</section>
	)
}
