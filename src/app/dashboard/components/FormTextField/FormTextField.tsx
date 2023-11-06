import { TextFieldType } from "@/app/Types/types"
import styles from "./formtext.module.scss"
import { ChangeEventHandler, MouseEvent, useState } from "react"
import { ViewOffIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"

type TextFieldProps = {
	onChange: ChangeEventHandler<HTMLInputElement>
	value?: string
	placeholder?: string
	type?: TextFieldType
	name?: string
	label: string
	isRequired?: boolean
	error: boolean
	disabled?: boolean
	multipleFile?: boolean
}

function FormTextField({ textFieldProps }: { textFieldProps: TextFieldProps }) {
	const [viewPassword, setViewPassword] = useState(false)
	const { onChange, value, placeholder, type, name, label, error, isRequired, disabled, multipleFile } = textFieldProps

	const inputType = type === "password" ? (viewPassword ? "text" : "password") : type

	const HandleSwitchPassword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setViewPassword((prev) => !prev)
	}

	return (
		<div className={`${styles.textfield} ${disabled && styles.textfield__disabled}`}>
			<input
				className={`${styles.textfield__input} ${isRequired && error && styles.textfield__inputError}`}
				type={inputType}
				value={value}
				onChange={onChange}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				multiple={multipleFile}
			/>
			<label
				className={`${styles.textfield__label} ${value !== "" && styles.textfield__labelFill}  ${isRequired && error && styles.textfield__labelError} `}
			>
				{label}
			</label>
			{type === "password" && value !== "" && (
				<button className={styles.textfield__view} onClick={(e) => HandleSwitchPassword(e)}>
					{!viewPassword && <ViewOffIcon />}
					{viewPassword && <ViewOnIcon />}
				</button>
			)}
		</div>
	)
}

export default FormTextField
