"use client"
import { useEffect, useState } from "react"
import styles from "./modal.module.scss"
import { createPortal } from "react-dom"
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
		domReady ?
			createPortal(
				<dialog className={styles.dialog}>
					<section className={styles.dialog_section}>
						{title && <h2 className={styles.dialog_title}>{title}</h2>}
						<div className={styles.dialog_content}>
							{children}
						</div>
					</section>
				</dialog>,
				modalRoot
			) : null
	)
}
