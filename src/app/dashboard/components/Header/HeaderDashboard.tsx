"use client"
import { ArrowDownIcon, Logo, LogoutIcon, NotificationIcon, UserIcon } from "@/app/SVG/componentsSVG"
import styles from "./headerdashboard.module.scss"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MenuOptions } from "@/app/Constants/constants"
import FormTextField from "../FormTextField/FormTextField"
import { TextFieldType } from "@/app/Types/types"
import { FloatingMenu } from "../FloatingMenu/FloatingMenu"

export function HeaderDashboard() {
	const { data: session, update } = useSession()
	const [viewMenu, setViewMenu] = useState<boolean>(false)
	const [viewNotifications, setViewNotifications] = useState<boolean>(false)
	const pathname = usePathname()
	const currentPage = pathname.split("/")[2] || usePathname().split("/")[1]

	// Polling the session every 1 hour
	useEffect(() => {
		// TIP: You can also use `navigator.onLine` and some extra event handlers
		// to check if the user is online and only update the session if they are.
		// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
		const interval = setInterval(() => document.visibilityState === "visible" && update({ name: session?.user?.name }), 1000 * 60 * 50)
		return () => clearInterval(interval)
	}, [update])

	// Listen for when the page is visible, if the user switches tabs
	// and makes our tab visible again, re-fetch the session
	useEffect(() => {
		const visibilityHandler = () => document.visibilityState === "visible" && update({ name: session?.user?.name })
		window.addEventListener("visibilitychange", visibilityHandler, false)
		return () => window.removeEventListener("visibilitychange", visibilityHandler, false)
	}, [update])

	const HandleViewMenu = () => {
		setViewMenu((prev) => !prev)
	}
	const HandleViewNotifications = () => {
		setViewNotifications((prev) => !prev)
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.header__title}>
				{MenuOptions.find((menu) => menu.section === currentPage)?.icon}
				{currentPage}
			</h1>
			<nav className={styles.header_nav}>
				<div className={styles.notifications} onBlur={() => setViewNotifications(false)}>
					<button className={styles.notifications_button} onClick={HandleViewNotifications}>
						<NotificationIcon className={styles.notifications_icon} />
					</button>
					<FloatingMenu isActive={viewNotifications}>
						<span className={styles.notifications_title}>Notifications</span>
						<span className={styles.notifications_option}>You don't have notifications</span>
					</FloatingMenu>
				</div>
				<div className={styles.header_profile} onBlur={() => setViewMenu(false)}>
					<button className={styles.header_profileButton} onClick={HandleViewMenu}>
						<div className={styles.header_profileUser}>
							<span className={styles.header_profileName}>{session?.user?.name}</span>
							<span className={styles.header_profileEmail}>{"Administrador"}</span>
						</div>
						<picture className={styles.header_profilePicture}>
							<img className={styles.header_profileImage} src={session?.user?.image || ""} alt={`Profile photo`} />
						</picture>
						<ArrowDownIcon />
					</button>
					<FloatingMenu isActive={viewMenu}>
						<Link className={styles.header_profileMenuLink} href={`/myaccount`} title="Go to my account settings">
							<UserIcon />
							My Account
						</Link>
						<button className={styles.header_profileMenuLink} onClick={() => signOut()} title="Logout account">
							<LogoutIcon />
							LogOut
						</button>
					</FloatingMenu>
				</div>
			</nav>
		</header>
	)
}
