"use client"

import styles from "./menudashboard.module.scss"
import { usePathname } from "next/navigation"
import { MouseEvent, useState } from "react"
import { MenuOption } from "../MenuOption/MenuOption"
import { IActiveSections } from "@/app/Types/types"
import { MenuOptions } from "@/app/Constants/constants"
import { Logo } from "@/app/SVG/componentsSVG"

export function MenuDashboard() {
	const pathname = usePathname()
	const [activeSection, setActiveSection] = useState<IActiveSections>({
		dashboard: true,
		sales: false,
		inventory: false,
		products: false,
		customers: false,
		orders: false,
		marketing: false,
		security: false,
		settings: false,
	})
	const routeSection = pathname.split(/\/([^/]+)$/)[1]
	//const [currentSection, setCurrentSection] = useState("overview")

	const HandleActiveSection = (e: MouseEvent<HTMLButtonElement>) => {
		const nameSection = e.currentTarget.name
		//setCurrentSection(nameSection)
		const isCurrentSectionActive = Object.entries(activeSection).filter((section) => section[0] === nameSection)[0][1]
		const updatedActiveSection: IActiveSections = {
			dashboard: false,
			sales: false,
			inventory: false,
			products: false,
			customers: false,
			orders: false,
			marketing: false,
			security: false,
			settings: false,
		}
		// Establecer en true solo el nombre que coincida
		setActiveSection({ ...updatedActiveSection, [nameSection]: !isCurrentSectionActive })
	}

	return (
		<aside className={styles.aside}>
			<Logo type="light" />
			<span className={styles.aside__title}>ADMIN PANEL</span>
			<nav className={`${styles.aside__nav} scrollBarStyle`}>
				{MenuOptions.map((option) => (
					<MenuOption
						key={option.section}
						currentSection={activeSection[option.section]}
						options={option}
						handleActiveSections={(e) => HandleActiveSection(e)}
					/>
				))}
			</nav>
			{/*<>
			<button
				className={`${styles.nav__link} ${activeSection["overview"] && styles.nav__linkActive}`}
				title="go to section products"
				name="overview"
				onClick={(e) => HandleActiveSection(e)}
			>
				Overview
			</button>
			
			<button
				className={`${styles.nav__link} ${activeSection["sales"] && styles.nav__linkActive}`}
				title="go to section products"
				name="sales"
				onClick={(e) => HandleActiveSection(e)}
			>
				Sales
			</button>
			<button
				className={`${styles.nav__link} ${activeSection["inventory"] && styles.nav__linkActive}`}
				title="go to section products"
				name="inventory"
				onClick={(e) => HandleActiveSection(e)}
			>
				Inventory
			</button>
			<button
				className={`${styles.nav__link} ${activeSection["products"] && styles.nav__linkActive}`}
				title="go to section products"
				name="products"
				onClick={(e) => HandleActiveSection(e)}
			>
				Products
			</button>
			<div className={`${styles.nav__linkOption} ${activeSection.products && styles.nav__linkOptionActive}`}>
				<Link
					className={`${styles.nav__sublink} ${routeSection === "products-management" && styles.nav__sublinkActive}`}
					href="/dashboard/products/top-products"
					title="go to section products"
				>
					<PointIcon />
					Top products
				</Link>
				<Link
					className={`${styles.nav__sublink} ${routeSection === "products-management" && styles.nav__sublinkActive}`}
					href="/dashboard/products/products-management"
					title="go to section products"
				>
					<PointIcon />
					Products Management
				</Link>
			</div>
			<button
				className={`${styles.nav__link} ${activeSection["customers"] && styles.nav__linkActive}`}
				title="go to section products"
				name="customers"
				onClick={(e) => HandleActiveSection(e)}
			>
				Customers
			</button>
			<div className={`${styles.nav__linkOption} ${activeSection.customers && styles.nav__linkOptionActive}`}>
				<Link
					className={`${styles.nav__sublink} ${routeSection === "products-management" && styles.nav__sublinkActive}`}
					href="/dashboard/customers/top-products"
					title="go to section products"
				>
					<PointIcon />
					List customers
				</Link>
				<Link
					className={`${styles.nav__sublink} ${routeSection === "products-management" && styles.nav__sublinkActive}`}
					href="/dashboard/products/products-management"
					title="go to section products"
				>
					<PointIcon />
					Account Management
				</Link>
				<Link
					className={`${styles.nav__sublink} ${routeSection === "products-management" && styles.nav__sublinkActive}`}
					href="/dashboard/products/products-management"
					title="go to section products"
				>
					<PointIcon />
					Password reset.
				</Link>
			</div>
			<button
				className={`${styles.nav__link} ${activeSection["orders"] && styles.nav__linkActive}`}
				title="go to section products"
				name="orders"
				onClick={(e) => HandleActiveSection(e)}
			>
				Orders
			</button>
			<button
				className={`${styles.nav__link} ${activeSection["marketing"] && styles.nav__linkActive}`}
				title="go to section products"
				name="marketing"
				onClick={(e) => HandleActiveSection(e)}
			>
				Marketing and Promotion
			</button>
			<button
				className={`${styles.nav__link} ${activeSection["security"] && styles.nav__linkActive}`}
				title="go to section products"
				name="security"
				onClick={(e) => HandleActiveSection(e)}
			>
				Security
			</button>
			<button
				className={`${styles.nav__link} ${activeSection["settings"] && styles.nav__linkActive}`}
				title="go to section products"
				name="settings"
				onClick={(e) => HandleActiveSection(e)}
			>
				Settings
			</button></>*/}
		</aside>
	)
}
