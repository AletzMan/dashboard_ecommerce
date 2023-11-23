import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import styles from "./toggleswitch.module.scss"

interface Props {
	label?: string
	active: boolean
	setActive: Dispatch<SetStateAction<boolean>>
}

export function ToggleSwitch(props: Props) {
	const { label, active, setActive } = props

	const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.currentTarget.checked
		setActive(checked)
	}
	return (
		<div className={styles.switch}>
			<label className={styles.switch_label}>{label}</label>
			<div className={styles.switch_container}>
				<input className={styles.switch_input} type="checkbox" checked={active} onChange={HandleChange} />
				<div className={`${styles.switch_base} ${active && styles.switch_baseActive}`}>
					<div className={`${styles.switch_button} ${active && styles.switch_buttonActive}`}></div>
				</div>
			</div>
		</div>
	)
}
