"use client"
import { ArrowDownLineIcon, LoadingIcon } from "@/app/SVG/componentsSVG"
import { useState, ChangeEvent, MouseEvent, Dispatch, SetStateAction } from "react"
import styles from "./formcombobox.module.scss"

interface props {
	defaultValue: string
	options: string[]
	name?: string
	error?: boolean
	selectOption: string
	setSelectOption: Dispatch<SetStateAction<string>>
	loading?: boolean
}

export function FormComboBox(props: props) {
	const { defaultValue, options, name, error, selectOption, setSelectOption, loading } = props
	const [viewOptions, setViewOptions] = useState(false)
	//const [selectOption, setSelectOption] = useState('-- Select a colonia --')

	const HandleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setViewOptions(e.target.checked)
	}

	const HandleClickOption = (e: MouseEvent<HTMLOptionElement>) => {
		setSelectOption(e.currentTarget.value)
		setViewOptions(false)
	}

	const HandleOnBlur = () => {
		setTimeout(() => {
			setViewOptions(false)
		}, 50)
	}

	return (
		<div className={`${styles.combobox} ${!options && styles.comboboxDisabled}`} onBlur={HandleOnBlur}>
			<input
				type="text"
				className={`${styles.combobox__input} ${error && styles.combobox__inputError}`}
				name={name}
				placeholder="COMBOBOX"
				value={selectOption}
				onChange={(e) => setSelectOption(selectOption)}
			/>
			<div className={styles.combobox__arrow}>
				<input className={styles.combobox__arrowCheckbox} type="checkbox" checked={viewOptions} onChange={HandleChangeCheckbox} />
				<ArrowDownLineIcon />
			</div>
			{
				<div className={`${styles.combobox__loading} ${!loading && styles.combobox__loadingInactive}`}>
					<LoadingIcon />
				</div>
			}
			<div className={`${styles.combobox__options} ${viewOptions && styles.combobox__optionsActive} scrollBarStyle`}>
				<option
					className={`${styles.combobox__optionsOption} ${selectOption === defaultValue && styles.combobox__optionsOptionSelect}`}
					onClick={HandleClickOption}
				>
					{defaultValue}
				</option>
				{options?.map((option) => (
					<option
						key={option}
						className={`${styles.combobox__optionsOption} ${selectOption === option && styles.combobox__optionsOptionSelect}`}
						onClick={HandleClickOption}
					>
						{option}
					</option>
				))}
			</div>
		</div>
	)
}
