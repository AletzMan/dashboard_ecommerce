import { CheckGreenIcon, InvalidLinkIcon } from "@/app/svg/svgComponents"
import styles from "./success.module.scss"
import { Button } from "@/app/technolife/components/Button/Button"

function SuccessfulPasswordChange() {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>Password Change Successful</h1>
			<CheckGreenIcon className={styles.section__icon} />
			<p className={styles.section__message}>Your password has been successfully changed. You can now log in using your new password.</p>
			<Button title="Go to Login" buttonProps={{ text: "LOGIN", href: "/login" }} />
		</section>
	)
}

export default SuccessfulPasswordChange
