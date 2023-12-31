import { OptionsDateLocal } from "@/app/Constants/constants"
import { ICustomer, IOrder } from "@/app/Types/types"
import axios from "axios"
import { headers } from "next/headers"
import Image from "next/image"
import { Suspense } from "react"
import { DataGrid } from "../components/DataGrid/DataGrid"
import styles from "./orders.module.scss"
import { SkeletonTotalViews } from "../overview/components/SkeletonTotalViews/SkeletonTotalViews"
import { TotalOrders } from "../overview/components/TotalsView/TotalOrders"
import { TotalOrderCompleted } from "../overview/components/TotalsView/TotalOrdersCompleted"
import { TotalOrderCancelled } from "../overview/components/TotalsView/TotalOrdersCancelled"

const GetOrders = async (id: string) => {
	try {
		const response = await axios.get(`http://localhost:3000/api/orders`)
		const orders: IPagination = response.data.data
		return orders
	} catch (error) {}
}

interface IPagination {
	orders: IOrder[]
	totalOrders: number
	totalPages: number
	currentPage: number
	pageSize: number
}

export default async function PageOrders() {
	const headersList = headers()
	const pathname = headersList.get("next-url")
	let orders: IPagination | undefined = undefined
	const id = pathname?.split("/")[3] || ""

	//if (pathname) {
	//customer = await GetCustomer(id)
	orders = await GetOrders(id)

	//}
	return (
		<section className={`${styles.section} scrollBarStyle`}>
			<article className={styles.totals}>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalOrders id={id} title="Total Orders" />
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					<TotalOrderCompleted id={id} title="Orders Completed" />
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					<TotalOrderCancelled id={id} title="Orders Cancelled" />
				</Suspense>
			</article>
			<div className={styles.section_id}>
				<article className={styles.orders}>
					<h2 className={styles.orders_title}> All Orders</h2>
					<Suspense fallback={<SkeletonTotalViews />}>
						{orders && orders?.orders.length > 0 && (
							<DataGrid
								rows={orders.orders}
								columns={[
									{ field: "id", headerName: "ID", role: "text", width: 70 },
									{ field: "order_id", headerName: "Order ID", role: "text", width: "1fr" },
									{ field: "name", headerName: "Name", role: "text", width: "1fr" },
									{ field: "lastname", headerName: "Last Name", role: "text", width: "1fr" },
									{ field: "creation_date", headerName: "Creation Date", role: "date", width: "1fr" },
									{ field: "total_price", headerName: "Amount", role: "price", width: 120 },
									{ field: "state", headerName: "Status", role: "status", width: 120 },
									{ field: "", headerName: "", role: "actions", width: 120 },
								]}
								paginacion={{ currentPage: orders.currentPage, totalPages: orders.totalPages }}
								statusOptions={{
									statusArray: ["On the way", "Delivered", "Pending", "Cancelled"],
									colors: ["#2196F3", "#0cd315", "#cebc19", "#FF5722"],
								}}
								actions={["view"]}
								linkEdit={"/dashboard/orders"}
							/>
						)}
					</Suspense>
				</article>
			</div>
		</section>
	)
}
