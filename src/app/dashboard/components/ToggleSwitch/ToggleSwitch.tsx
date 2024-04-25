import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import styles from "./toggleswitch.module.scss"
import { Control, Controller, useForm } from "react-hook-form"

interface Props {
	name: string
	label?: string
	active: boolean
	controlExt?: Control<any>
	onChanges: ChangeEventHandler<HTMLInputElement>
}

export function ToggleSwitch({ label, active, onChanges, name, controlExt }: Props) {
	const { control } = useForm()

	const HandleOnChange = (e: ChangeEvent<HTMLInputElement>, event: (...event: any[]) => void) => {
		event(e.target.checked)
		onChanges(e)
	}
	return (
		<div className={styles.switch}>
			<div className={`${styles.switch_shadow}  `}></div>
			<label className={styles.switch_label}>{label}</label>
			<div className={styles.switch_container}>
				<Controller
					name={name}
					control={controlExt || control}
					render={({ field: { name, onChange } }) => (
						<input name={name} className={styles.switch_input} type="checkbox" checked={active} onChange={(e) => HandleOnChange(e, onChange)} />
					)}
				/>
				<div className={`${styles.switch_base} ${active && styles.switch_baseActive}`}>
					<div className={`${styles.switch_button} ${active && styles.switch_buttonActive}`}></div>
				</div>
			</div>
		</div>
	)
}
