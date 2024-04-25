
import { IProduct } from "@/app/interfaces/product"
import StatusTag from "./StatusTag"
import styles from "./itemtags.module.scss"

export enum Status {
	New = "NEW",
	FreeShipping = "FREE SHIPPING",
	Clearance = "CLEARANCE",
	Sale = "SALE",
}

function ItemTags({ item }: { item: IProduct }) {
	return (
		<>
			{item?.is_new && <StatusTag statusType={{ type: Status.New }} />}
			{item?.is_sale && <StatusTag statusType={{ type: Status.Sale }} />}
			{item?.is_clearance && <StatusTag statusType={{ type: Status.Clearance }} />}
			{item?.is_freeShipping && <StatusTag statusType={{ type: Status.FreeShipping }} />}
		</>
	)
}

export default ItemTags
