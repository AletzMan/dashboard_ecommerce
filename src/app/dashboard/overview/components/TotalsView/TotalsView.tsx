import { FormattedString } from "@/app/utils/functions"
import styles from "./totalsview.module.scss"
import {
	ArrowDownIcon,
	ArrowDownLineIcon,
	ArrowIcon,
	CartIcon,
	ConversionIcon,
	CustomersIcon,
	OrdersIcon,
	ProductsIcon,
	VisitorsIcon,
} from "@/app/SVG/componentsSVG"
import axios from "axios"
import { TotalSales } from "./TotalSales"
import { TotalOrders } from "./TotalOrders"
import { TotalProducts } from "./Totalproducts"
import { TotalCustomers } from "./TotalCustomers"
import { TotalVisitors } from "./TotalVisitor"
import { ConversionRate } from "./ConversionRate"
import { Suspense } from "react"
import { SkeletonTotalViews } from "../SkeletonTotalViews/SkeletonTotalViews"

export async function TotalsView() {
	return (
		<>
			<div className={styles.section}>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalSales />
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalOrders title="Orders" />
				</Suspense>
			</div>
			<div className={styles.section}>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalProducts />
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalCustomers />
				</Suspense>
			</div>
			<div className={styles.section}>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<TotalVisitors />
				</Suspense>
				<Suspense fallback={<SkeletonTotalViews />}>
					{/* @ts-expect-error Server Component */}
					<ConversionRate />
				</Suspense>
			</div>
		</>
	)
}
