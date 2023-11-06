import Link from "next/link"
import styles from "./button.module.scss"
import { ButtonProps, ButtonType } from "@/app/Types/types"

export function Button({ buttonProps, className, title }: { buttonProps: ButtonProps; className?: string; title: string }) {
	const { typeButton, text, iconButton, href, name, disabled, onClick, isSecondary, type } = buttonProps

	return (
		<div className={`${className} ${styles.container} ${disabled && styles.container__disabled}`}>
			{href !== undefined && (
				<Link className={`${styles.button}`} href={href} title={title}>
					{typeButton === ButtonType.WhitOutIcon || (ButtonType.OnlyIcon && iconButton)}
					{typeButton !== ButtonType.OnlyIcon && text}
				</Link>
			)}
			{href === undefined && (
				<button
					disabled={false}
					className={`${styles.button} ${isSecondary && styles.button__secondary}`}
					onClick={() => onClick()}
					title={title}
					name={name}
					type={type}
				>
					{typeButton === ButtonType.WhitOutIcon || (ButtonType.OnlyIcon && iconButton)}
					{typeButton !== ButtonType.OnlyIcon && text}
				</button>
			)}
		</div>
	)
}
