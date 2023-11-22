"use client"
import { useEffect, useState } from "react"
import styles from "./modal.module.scss"
import ReactDOM from "react-dom"
interface Props {
	children: React.ReactNode
	title: string
}

export function Modal(props: Props) {
	const { children, title } = props
	const [domReady, setDomReady] = useState(false)

	useEffect(() => {
		setDomReady(true)
	}, [])
	const modalRoot = document.getElementById("modal_root") as HTMLDivElement

	return (
		domReady &&
		ReactDOM.createPortal(
			<dialog className={styles.dialog}>
				<section className={styles.dialog_section}>
					<h2 className={styles.dialog_title}>{title}</h2>
					{children}
				</section>
			</dialog>,
			modalRoot
		)
	)
}
