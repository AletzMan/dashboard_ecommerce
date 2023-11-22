import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react"
import styles from "./textarea.module.scss"

interface Props {
	label?: string
	value: string
	onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export function TextArea(props: Props) {
	const { label, value, onChange } = props

	return (
		<div className={styles.area}>
			<label className={styles.area_label}>{label}</label>
			<textarea className={`${styles.area_text} scrollBarStyle`} value={value} onChange={onChange}></textarea>
		</div>
	)
}
