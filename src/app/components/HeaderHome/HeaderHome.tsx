import { Logo } from "@/app/SVG/componentsSVG"
import styles from "./header.module.scss"

function HeaderHome() {
	return (
		<header className={styles.header}>
			<Logo type="light" />
			<div className={styles.header__band}></div>
		</header>
	)
}

export default HeaderHome
