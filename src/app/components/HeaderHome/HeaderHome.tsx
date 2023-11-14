import { Logo } from "@/app/SVG/componentsSVG"
import styles from "./header.module.scss"

function HeaderHome() {
	return (
		<header className={styles.header}>
			<Logo type="light" />
			<h1 className={styles.header__title}>e-Commerce Dashboard</h1>
			<div className={styles.header__band}></div>
		</header>
	)
}

export default HeaderHome
