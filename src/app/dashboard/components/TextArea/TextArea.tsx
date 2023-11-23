import { ChangeEvent, ChangeEventHandler } from "react"
import styles from "./textarea.module.scss"

interface Props {
	name: string
	label?: string
	value: string
	onChange: ChangeEventHandler<HTMLTextAreaElement>
	error?: boolean
	isRequired?: boolean
}

export function TextArea(props: Props) {
	const { name, label, value, onChange, error, isRequired } = props

	return (
		<div className={styles.area}>
			<label className={styles.area_label}>{label}</label>
			<textarea
				name={name}
				className={`${styles.area_text} ${isRequired && error && styles.area_textError} scrollBarStyle`}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	)
}
