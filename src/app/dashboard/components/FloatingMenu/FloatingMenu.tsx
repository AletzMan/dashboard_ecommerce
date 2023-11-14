import styles from "./floatingmenu.module.scss"

interface Props {
	children: React.ReactNode
	isActive: boolean
}

export function FloatingMenu(props: Props) {
	const { children, isActive } = props
	return (
		<div className={`${styles.menu} ${isActive && styles.menu_active}`}>
			<div className={styles.menu_tag}>
				<div className={styles.menu_triangle}></div>
			</div>
			{children}
		</div>
	)
}
