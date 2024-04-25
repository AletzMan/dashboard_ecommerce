import { TextFieldType } from "@/app/Types/types"
import styles from "./text.module.scss"
import { ChangeEvent, ChangeEventHandler, MouseEvent, useState } from "react"
import { ErrorIcon, HelpIcon, UploadIcon, ViewOffIcon, ViewOnIcon } from "@/app/SVG/componentsSVG"
import { Control, UseFormRegister } from "react-hook-form/dist/types"
import { Controller, useForm } from "react-hook-form"
import { KeyboardEvent } from "react"

type TextFieldProps = {
	placeholder?: string
	type?: TextFieldType
	name: string
	controlExt?: Control<any>
	label: string
	isRequired?: boolean
	error: string | undefined
	disabled?: boolean
	multipleFile?: boolean
	help?: string
	step?: string
	value?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	onKeyDown?: () => void
	//register: UseFormRegister<any>
}

export function TextField({ textFieldProps, className }: { textFieldProps: TextFieldProps; className?: string }) {
	const [viewPassword, setViewPassword] = useState(false)
	const [viewHelp, setViewHelp] = useState(false)
	const { control } = useForm()
	const { controlExt, placeholder, value, type, name, step, label, error, isRequired, disabled, multipleFile, help, onChange, onKeyDown } = textFieldProps

	const inputType = type === "password" ? (viewPassword ? "text" : "password") : type

	const HandleSwitchPassword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setViewPassword((prev) => !prev)
	}

	const HandleViewHelp = () => {
		setViewHelp((prev) => !prev)
	}

	const HandleOnChange = (e: ChangeEvent<HTMLInputElement>, event: (...event: any[]) => void) => {
		event(e.target.value)
		onChange(e)
	}

	const HandleMouseEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key
		if (key === "Enter") {
			e.preventDefault()
			if (onKeyDown) {
				onKeyDown()
			}
		}
	}

	return (
		<div
			className={`${styles.textfield} ${label !== "" && styles.textfieldHasLabel} ${disabled && styles.textfield_disabled} ${className} ${type === TextFieldType.File && styles.textfield_isFile
				} ${type === TextFieldType.File && isRequired && error && styles.textfield_isFileError} ${error && styles.textfield_isError}`}
			onBlur={() => setViewHelp(false)}
		>
			<label className={`${styles.textfield_label}    `}>{label}</label>
			{type === TextFieldType.File && (
				<div className={styles.content} title="No se ha seleccionado ningún archivo">
					<UploadIcon className={styles.content_icon} />
					<span className={styles.content_text}>{multipleFile ? "Choose files..." : "Choose a file..."}</span>
					<span className={styles.content_textTwo}>Or drag and frop here</span>
				</div>
			)}
			<Controller
				name={name}
				control={controlExt || control}
				render={({ field: { onChange: change, name } }) => (
					<input
						className={`${styles.textfield_input} ${isRequired && error && styles.textfield_isFileError} ${type === "file" && styles.textfield_isFileInput
							} ${error && styles.textfield_inputError}`}
						onChange={(e) => HandleOnChange(e, change)}
						onKeyDown={HandleMouseEnter}
						type={inputType}
						placeholder={placeholder}
						disabled={disabled}
						multiple={multipleFile}
						name={name}
						step={step}
						defaultValue={value}
					/>
				)}
			/>
			{help && (
				<>
					<button type="button" className={styles.help} title={help} onClick={HandleViewHelp}>
						<HelpIcon className={styles.help_icon} />
					</button>
					{viewHelp && <label className={`${styles.help_label} ${viewHelp && styles.help_labelActive}`}>{help}</label>}
				</>
			)}
			{type === "password" && (
				<button type="button" className={styles.textfield_view} onClick={(e) => HandleSwitchPassword(e)}>
					{!viewPassword && <ViewOffIcon />}
					{viewPassword && <ViewOnIcon />}
				</button>
			)}
			{error && (
				<>
					<p className={styles.textfield_error}>{error}</p>
					{(type !== TextFieldType.Date && type !== TextFieldType.DateTime) && <ErrorIcon className={styles.textfield_iconError} />}
				</>
			)}
		</div>
	)
}
