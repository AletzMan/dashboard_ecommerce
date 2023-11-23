"use client"

import styles from "./menudashboard.module.scss"
import { usePathname, useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { MenuOption } from "../MenuOption/MenuOption"
import { IActiveSections } from "@/app/Types/types"
import { MenuOptions } from "@/app/Constants/constants"
import { Logo } from "@/app/SVG/componentsSVG"

export function MenuDashboard() {
	const router = useRouter()
	const HandleActiveSection = (e: MouseEvent<HTMLButtonElement>) => {
		const nameSection = e.currentTarget.name

		// Establecer en true solo el nombre que coincida
		const params = MenuOptions.filter((option) => option.section === nameSection)[0].links
		const year = new Date().getFullYear()

		router.push(`/dashboard/${nameSection}${params}${params && year}`)
	}

	return (
		<aside className={styles.aside}>
			<Logo type="light" />
			<span className={styles.aside__title}>ADMIN PANEL</span>
			<nav className={`${styles.aside__nav} scrollBarStyle`}>
				{MenuOptions.map((option) => (
					<MenuOption key={option.section} options={option} handleActiveSections={(e) => HandleActiveSection(e)} />
				))}
			</nav>
		</aside>
	)
}
