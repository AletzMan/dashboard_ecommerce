"use client"
import { ArrowDownIcon, Logo } from "@/app/SVG/componentsSVG"
import styles from "./headerdashboard.module.scss"
import { signOut, useSession } from "next-auth/react"

export function HeaderDashboard() {
	const session = useSession()
	console.log(session.data?.user)
	return (
		<header className={styles.header}>
			<h1 className={styles.header__title}>DASHBOARD</h1>
			<button className={styles.menu__accountLink} onClick={() => signOut()} title="Go to login">
				LOGOUT
			</button>
			<nav className={styles.header_nav}>
				<div className={styles.header_profile}>
					<div className={styles.header_profileUser}>
						<span className={styles.header_profileName}>{session.data?.user?.name}</span>
						<span className={styles.header_profileEmail}>{"Administrador"}</span>
					</div>
					<picture className={styles.header_profilePicture}>
						<img className={styles.header_profileImage} src={session.data?.user?.image || ""} alt={`Profile photo`} />
					</picture>
					<ArrowDownIcon />
				</div>
			</nav>
		</header>
	)
}
