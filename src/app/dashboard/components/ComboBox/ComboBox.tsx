"use client"
import { ArrowDownLineIcon, ArrowIcon, ArrowUpIcon, CheckTwoIcon, LoadingIcon } from "@/app/SVG/componentsSVG"
import { useState, ChangeEvent, MouseEvent, Dispatch, SetStateAction, useRef, useEffect, FC } from "react"
import styles from "./formcombobox.module.scss"

interface Props {
	options: string[]
	label?: string
	name?: string
	error?: boolean
	loading?: boolean
	plaaceholder?: string
	onValueChange: (valor: string) => void
}

export const ComboBox: FC<Props> = ({ options, name, error, loading, plaaceholder, label, onValueChange }) => {
	const [selectOption, setSelectOption] = useState("")
	const [viewOptions, setViewOptions] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const HandleChangeCheckbox = (e: MouseEvent<HTMLButtonElement>) => {
		setTimeout(() => {
			if (viewOptions) {
				setViewOptions(false)
			} else {
				setViewOptions(true)
			}
		}, 50)
	}

	const HandleClickOption = (e: MouseEvent<HTMLButtonElement>) => {
		const option = e.currentTarget
		setSelectOption(option.value)
		setTimeout(() => {
			setViewOptions(false)
		}, 50)
	}

	const HandleOnBlur = () => {
		setTimeout(() => {
			setViewOptions(false)
		}, 50)
	}

	useEffect(() => {
		console.log("CAMBIO")
		onValueChange(selectOption)
	}, [selectOption])

	const HandleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setSelectOption(newValue)
		onValueChange(newValue)
	}

	const calculateDropdownClass = () => {
		const dropdownPosition = viewOptions ? styles.combobox__optionsActive : ""

		// Calculate the position based on the available screen space
		if (viewOptions) {
			const inputElement = inputRef.current
			if (inputElement) {
				const inputRect = inputElement.getBoundingClientRect()
				const spaceBelow = window.innerHeight - (inputRect.top + 300)
				const height = 29.585 * 6 + 31.58
				const heightFixed = 29.585 * options.length + 31.58
				if (spaceBelow < 0) {
					console.log(spaceBelow)
					if (options.length > 5) {
						inputElement.style.cssText = `--height-combo: -${height}px;`
					} else {
						inputElement.style.cssText = `--height-combo: -${heightFixed}px;`
					}
					//inputElement.style.cssText = `--height-combo: -${height}px;`

					return `${styles.combobox__optionsAbove}`
				}
			}
		}

		return dropdownPosition
	}

	return (
		<div className={`${styles.combobox} ${!options && styles.comboboxDisabled} ${viewOptions && styles.combobox_active}`} onBlur={HandleOnBlur}>
			{label && <label className={styles.combobox_label}>{label}</label>}
			<input
				type="text"
				className={`${styles.combobox__input} ${error && styles.combobox__inputError}`}
				name={name}
				placeholder={plaaceholder}
				value={selectOption}
				onChange={(e) => HandleChangeValue(e)}
				//onFocus={() => setViewOptions(true)}
			/>
			<div className={styles.combobox__arrow}>
				<button
					className={`${styles.combobox__arrowCheckbox} ${viewOptions && styles.combobox__arrowCheckboxView}`}
					onClick={(e) => HandleChangeCheckbox(e)}
				/>
				<ArrowUpIcon className="" />
			</div>
			{
				<div className={`${styles.combobox__loading} ${!loading && styles.combobox__loadingInactive}`}>
					<LoadingIcon className="" />
				</div>
			}
			<div className={`${styles.combobox__options} ${viewOptions && calculateDropdownClass()} scrollBarStyle`} ref={inputRef}>
				<div className={`${styles.combobox_container} ${viewOptions && styles.combobox__containerActive}`}>
					{options?.map((option) => (
						<button
							key={option}
							className={`${styles.combobox__optionsOption} ${selectOption === option && styles.combobox__optionsOptionSelect}`}
							onClick={(e) => HandleClickOption(e)}
							value={option}
						>
							{option}
							{selectOption === option && <CheckTwoIcon className={styles.combobox__optionsOptionIcon} />}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
