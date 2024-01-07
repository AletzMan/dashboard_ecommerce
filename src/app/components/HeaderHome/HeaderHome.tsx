import { Logo } from "@/app/SVG/componentsSVG"
import styles from "./header.module.scss"

interface Props {
	title: string
}

function HeaderHome({ title }: Props) {
	return (
		<header className={styles.header}>
			<Logo type="light" />
			<h1 className={styles.header__title}>{title}</h1>
			<div className={styles.header__band}></div>
		</header>
	)
}

export default HeaderHome
