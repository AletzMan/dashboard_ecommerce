import { Logo } from "../SVG/componentsSVG"
import styles from "./dashboard.module.scss"

export default async function DashboardPage() {
	return (
		<section className={styles.section}>
			<h2 className={styles.section_title}>Welcome</h2>
			<Logo type="light" />
			<p className={styles.section_p}>We are pleased to have you here. This is your command center, where you can access all the tools and resources you need to manage your projects efficiently. </p>
			<p className={styles.section_p}> Navigate through the different sections to get detailed reports, monitor the progress of your tasks, and stay updated with all the important updates. If you have any questions or need assistance, don't hesitate to contact our support team.</p>
		</section>
	)
}
