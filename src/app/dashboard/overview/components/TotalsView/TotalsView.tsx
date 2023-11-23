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

export async function TotalsView() {
	return (
		<>
			<div className={styles.section}>
				<TotalSales />
				<TotalOrders title="Orders" />
			</div>
			<div className={styles.section}>
				<TotalProducts />
				<TotalCustomers />
			</div>
			<div className={styles.section}>
				<TotalVisitors />
				<ConversionRate />
			</div>
		</>
	)
}
