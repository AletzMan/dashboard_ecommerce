import { URL_API } from "@/app/Constants/constants"
import { IOrder } from "@/app/Types/types"
import { Suspense } from "react"
import { DataGrid } from "../components/DataGrid/DataGrid"
import styles from "./orders.module.scss"
import { SkeletonTotalViews } from "../overview/components/SkeletonTotalViews/SkeletonTotalViews"
import { TotalOrders } from "../overview/components/TotalsView/TotalOrders"
import { TotalOrderByState } from "../overview/components/TotalsView/TotalOrdersByState"
import { SearchSection } from "../components/SearchSection/SearchSection"

const GetOrders = async (params: [string, string][]) => {
	let paramsString: string = ""
	params.forEach((param, index) => {
		if (index === 0) paramsString += `?${param[0]}=${param[1]}`
		else paramsString += `&${param[0]}=${param[1]}`
	})
	try {
		const response = await fetch(`${URL_API}orders${paramsString}`, { next: { revalidate: 10000, tags: ["orderspage"] } })
		const data = await response.json()

		const orders: IPagination = data.response
		return orders
	} catch (error) { }
}

interface IPagination {
	results: IOrder[]
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
	on_the_way: number
	pending: number
	delivered: number
	cancelled: number
}

export default async function PageOrders({ searchParams }: { searchParams: { [key: string]: string } }) {

	const params = Object.entries(searchParams)

	let orders: IPagination | undefined = undefined
	orders = await GetOrders(params)

	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<article className={styles.totals}>
				<Suspense fallback={<SkeletonTotalViews />}>
					{<TotalOrderByState count={orders?.totalResults || 0} title="Total Orders" type="Total" />}
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{<TotalOrderByState count={orders?.delivered || 0} title="Orders Delivered" type="Delivered" />}
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{<TotalOrderByState count={orders?.pending || 0} title="Orders Pending" type="Pending" />}
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{<TotalOrderByState count={orders?.on_the_way || 0} title="Orders On the Way" type="On the Way" />}
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{<TotalOrderByState count={orders?.cancelled || 0} title="Orders Cancelled" type="Cancelled" />}
				</Suspense>
			</article>
			<div className={styles.section_id}>
				<article className={styles.orders}>
					<h2 className={styles.orders_title}> All Orders</h2>
					<SearchSection total={orders?.totalResults || 0} placeholder="Search by Order ID or id" />
					<Suspense fallback={<SkeletonTotalViews />}>
						{orders && orders?.totalResults > 0 && (
							<div className={styles.datagrid}>
								<DataGrid
									rows={orders.results}
									columns={[
										{ field: "id", headerName: "ID", role: "text", width: 70 },
										{ field: "order_id", headerName: "Order ID", role: "text", width: 150 },
										{ field: "name", headerName: "Name", role: "text", width: 160 },
										{ field: "creation_date", headerName: "Creation Date", role: "date", width: 150 },
										{ field: "total_price", headerName: "Amount", role: "price", width: 120 },
										{ field: "state", headerName: "Status", role: "status", width: 120 },
										{ field: "", headerName: "", role: "actions", width: 120 },
									]}
									paginacion={{ currentPage: orders.currentPage, totalPages: orders.totalPages }}
									statusOptions={{
										statusArray: ["ON THE WAY", "DELIVERED", "PENDING", "CANCELLED"],
										colors: ["#2196F3", "#0cd315", "#cebc19", "#FF5722", "#17b341"],
									}}
									actions={["view"]}
									linkView="/dashboard/orders"
									detailsView={<></>}
								/>
							</div>
						)}
					</Suspense>
				</article>
			</div>
		</section>
	)
}
