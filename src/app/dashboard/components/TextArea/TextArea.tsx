import { ChangeEvent, ChangeEventHandler } from "react"
import styles from "./textarea.module.scss"
import { Control, Controller, useForm } from "react-hook-form"

interface Props {
	name: string
	label?: string
	value?: string
	controlExt?: Control<any>
	onChange: ChangeEventHandler<HTMLTextAreaElement>
	error?: string
	isRequired?: boolean
}

export function TextArea(props: Props) {
	const { name, label, value, onChange, controlExt, error, isRequired } = props
	const { control } = useForm()
	return (
		<div className={styles.area}>
			<label className={styles.area_label}>{label}</label>
			<Controller
				name={name}
				control={controlExt || control}
				render={({ field: { onChange, name } }) => (
					<textarea
						name={name}
						className={`${styles.area_text} ${isRequired && error && styles.area_textError} scrollBarStyle`}
						value={value}
						onChange={onChange}
					></textarea>
				)}
			/>
			{error && <span className={styles.area_error}>{error}</span>}
		</div>
	)
}
