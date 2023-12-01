import { TextFieldType } from "@/app/Types/types"
import styles from "./text.module.scss"
import { ChangeEventHandler, LegacyRef, MouseEvent, MutableRefObject, useState } from "react"
import { HelpIcon, UploadIcon, ViewOffIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"

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
	help?: string
	ref?: LegacyRef<HTMLDivElement> | null
}

export function TextField({ textFieldProps, className }: { textFieldProps: TextFieldProps; className?: string }) {
	const [viewPassword, setViewPassword] = useState(false)
	const [viewHelp, setViewHelp] = useState(false)
	const { onChange, value, placeholder, type, name, label, error, isRequired, disabled, multipleFile, help, ref } = textFieldProps

	const inputType = type === "password" ? (viewPassword ? "text" : "password") : type

	const HandleSwitchPassword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setViewPassword((prev) => !prev)
	}

	const HandleViewHelp = () => {
		setViewHelp((prev) => !prev)
	}

	return (
		<div
			className={`${styles.textfield} ${label !== "" && styles.textfieldHasLabel} ${disabled && styles.textfield__disabled} ${className} ${type === TextFieldType.File && styles.textfield_isFile} ${type === TextFieldType.File && isRequired && error && styles.textfield_isFileError
				}`}
			onBlur={() => setViewHelp(false)}
			ref={ref}
		>
			{type === TextFieldType.File && (
				<div className={styles.content} title="No se ha seleccionado ningún archivo">
					<UploadIcon className={styles.content_icon} />
					<span className={styles.content_text}>{multipleFile ? "Choose files..." : "Choose a file..."}</span>
					<span className={styles.content_textTwo}>Or drag and frop here</span>
				</div>
			)}
			<input
				className={`${styles.textfield__input} ${isRequired && error && styles.textfield_isFileError} ${type === "file" && styles.textfield_isFileInput}`}
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
			{help && (
				<>
					<button className={styles.help} title={help} onClick={HandleViewHelp}>
						<HelpIcon className={styles.help_icon} />
					</button>
					{viewHelp && <label className={`${styles.help_label} ${viewHelp && styles.help_labelActive}`}>{help}</label>}
				</>
			)}
			{type === "password" && value !== "" && (
				<button className={styles.textfield__view} onClick={(e) => HandleSwitchPassword(e)}>
					{!viewPassword && <ViewOffIcon />}
					{viewPassword && <ViewOnIcon />}
				</button>
			)}
		</div>
	)
}
