"use client"

import styles from "./menudashboard.module.scss"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { MenuOption } from "../MenuOption/MenuOption"
import { MenuOptions } from "@/app/Constants/constants"
import { CloseIcon, Logo } from "@/app/SVG/componentsSVG"
import { useViewMenu } from "@/app/utils/store"

export function MenuDashboard() {
	const { viewMenuDashboard, setViewMenuDashboard } = useViewMenu()
	const router = useRouter()
	const HandleActiveSection = (e: MouseEvent<HTMLButtonElement>) => {
		const nameSection = e.currentTarget.name
		setViewMenuDashboard(false)
		// Establecer en true solo el nombre que coincida
		const params = MenuOptions.filter((option) => option.section === nameSection)[0].links
		const year = new Date().getFullYear()

		router.push(`/dashboard/${nameSection}${params}${params && year}`)
	}

	const HandleCloseMenu = () => {
		setViewMenuDashboard(false)
	}

	return (
		<aside className={`${styles.aside} ${viewMenuDashboard && styles.aside_view}`} >
			<Logo className={styles.aside_logo} type="light" />
			<button className={styles.aside_button} onClick={HandleCloseMenu} >
				<CloseIcon />
			</button>
			<span className={styles.aside__title}>ADMIN PANEL</span>
			<nav className={`${styles.aside__nav} scrollBarStyle`}>
				{MenuOptions.map((option) => (
					<MenuOption key={option.section} options={option} handleActiveSections={(e) => HandleActiveSection(e)} />
				))}
			</nav>
		</aside>
	)
}
