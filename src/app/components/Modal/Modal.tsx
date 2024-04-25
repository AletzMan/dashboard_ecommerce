"use client"
import { MouseEvent, useEffect, useState, KeyboardEvent, use, useRef } from "react"
import styles from "./modal.module.scss"
import { createPortal } from "react-dom"
import { CloseIcon } from "@/app/SVG/componentsSVG"
interface Props {
	children: React.ReactNode
	title: string
	icon?: React.ReactNode
	onClick?: () => void
	viewModal: boolean
}

export function Modal(props: Props) {
	const { children, title, onClick, icon, viewModal } = props
	const [domReady, setDomReady] = useState(false)
	let modalRootRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

	useEffect(() => {
		setDomReady(true)
	}, [])
	if (domReady)
		modalRootRef.current = document.getElementById("modal_root") as HTMLDivElement

	const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
		if (e.key === "Escape" && onClick) {
			onClick()
		}
	}

	return (
		domReady && viewModal ?
			createPortal(
				<dialog className={`${styles.dialog} `} id="dialogModal" onKeyDown={handleKeyDown} autoFocus={true}>
					<section className={`${styles.dialog_section} `} id="sectionModal">
						<header className={styles.dialog_header}>
							<div className={styles.dialog_icon}>
								{icon}
							</div>
							{<h2 className={styles.dialog_title}>{title}</h2>}
							<button className={styles.dialog_close} onClick={onClick}>
								<CloseIcon className={styles.dialog_closeIcon} />
							</button>
						</header>
						<div className={styles.dialog_content}>
							{children}
						</div>
					</section>
				</dialog>,
				modalRootRef.current as Element
			) : null
	)
}
