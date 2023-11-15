import styles from "./mexicomap.module.scss"
import { IOrderByState } from "@/app/Types/types"
import { Map } from "./components/Map"

interface Props {
	orders: IOrderByState[] | undefined
}

export function MexicoMap(props: Props) {
	const { orders } = props
	return <section className={styles.section}>{orders && <Map orders={orders} />}</section>
}
