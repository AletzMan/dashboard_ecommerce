import { DeliveryIcon, PickupIcon } from "@/app/SVG/componentsSVG"
import styles from "./deliveryandpickup.module.scss"

function DeliveryAndPickUp() {
	return (
		<>
			<div className={styles.delivery}>
				<span className={styles.delivery_mark}></span>
				<span className={styles.delivery_text}>Same Delivery Day</span>
				<DeliveryIcon className={styles.delivery_icon} />
			</div>
			<div className={styles.pickup}>
				<span className={styles.pickup_mark}></span>
				<span className={styles.pickup_text}>Store Pickup</span>
				<PickupIcon className={styles.pickup_icon} />
			</div>
		</>
	)
}

export default DeliveryAndPickUp
