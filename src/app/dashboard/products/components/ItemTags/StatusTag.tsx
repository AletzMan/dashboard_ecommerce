
import { Status } from "./ItemTags"
import styles from "./itemtags.module.scss"

export type StatusType = {
	type: Status | false
}

function StatusTag({ statusType }: { statusType: StatusType }) {
	return (
		<span
			className={`${styles.tagStatus} 
        ${statusType.type === Status.New && styles.tagStatus__new} 
        ${statusType.type === Status.Clearance && styles.tagStatus__clearance} 
        ${statusType.type === Status.Sale && styles.tagStatus__sale} 
        ${statusType.type === Status.FreeShipping && styles.tagStatus__freeShipping}`}
		>
			{statusType.type.toString()}
		</span>
	)
}

export default StatusTag
