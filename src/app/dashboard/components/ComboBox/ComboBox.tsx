"use client"
import { ArrowDownLineIcon, ArrowIcon, ArrowUpIcon, CheckTwoIcon, ErrorIcon, LoadingIcon } from "@/app/SVG/componentsSVG"
import { useState, ChangeEvent, MouseEvent, Dispatch, SetStateAction, useRef, useEffect, FC, ChangeEventHandler } from "react"
import styles from "./formcombobox.module.scss"
import { Control, Controller, useForm } from "react-hook-form"

interface Props {
	value: string
	options: string[]
	label?: string
	name: string
	controlExt?: Control<any>
	error?: string | undefined
	loading?: boolean
	plaaceholder?: string
	onValueChange: ChangeEventHandler<HTMLSelectElement>
}

export const ComboBox: FC<Props> = ({ options, name, controlExt, error, loading, plaaceholder, label, onValueChange, value }) => {
	const [selectOption, setSelectOption] = useState(value)
	const { control } = useForm()
	const HandleChangeValue = (e: ChangeEvent<HTMLSelectElement>, event: (...event: any[]) => void) => {
		const newValue = e.currentTarget.value
		event(newValue)
		onValueChange(e)
		setSelectOption(newValue)
	}

	useEffect(() => {
		setSelectOption(value)
	}, [value])

	console.log(selectOption, value)

	return (
		<div className={`${styles.combobox} ${!options && styles.comboboxDisabled}`}>
			{label && <label className={styles.combobox_label}>{label}</label>}
			<Controller
				name={name}
				control={controlExt || control}
				render={({ field: { value, onChange, name } }) => (
					<select
						className={`${styles.combobox__input} ${error && styles.combobox__inputError}`}
						name={name}
						onChange={(e) => HandleChangeValue(e, onChange)}
						defaultValue={selectOption || plaaceholder}
					>
						{
							<option className={styles.combobox_default} value={selectOption || plaaceholder} disabled>
								{selectOption || plaaceholder}
							</option>
						}
						{options?.map((option) => (
							<option
								key={option}
								className={`${styles.combobox__optionsOption} ${selectOption === option && styles.combobox__optionsOptionSelected}`}
								value={option}
							>
								{option}
							</option>
						))}
					</select>
				)}
			/>
			{error && (
				<>
					<span className={styles.combobox_labelError}>{error}</span>
					<ErrorIcon className={styles.combobox_iconError} />
				</>
			)}
			{
				<div className={`${styles.combobox__loading} ${!loading && styles.combobox__loadingInactive}`}>
					<LoadingIcon className="" />
				</div>
			}
		</div>
	)
}
