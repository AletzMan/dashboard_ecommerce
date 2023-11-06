import { HeaderDashboard } from "./components/Header/HeaderDashboard"
import { MenuDashboard } from "./components/MenuDashboard/MenuDashboard"
import styles from "./dashboard.module.scss"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className={styles.main}>
			<HeaderDashboard />
			<MenuDashboard />
			{children}
		</main>
	)
}
