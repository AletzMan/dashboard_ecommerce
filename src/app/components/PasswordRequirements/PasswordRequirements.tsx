import styles from "./passwordrequirements.module.scss"

function PasswordRequirements({ password, confirmPassword }: { password: string; confirmPassword: string }) {
	//Validar los requisitos para la contrasena induvudualmente
	const regexAnUppercase = /^(?=.*[A-Z]).+$/.test(password) && /^(?=.*[A-Z]).+$/.test(confirmPassword)
	const regexAnLowercase = /^(?=.*[a-z]).+$/.test(password) && /^(?=.*[a-z]).+$/.test(confirmPassword)
	const regexAnNumber = /^(?=.*[0-9]).+$/.test(password) && /^(?=.*[0-9]).+$/.test(confirmPassword)
	const regexAnSymbol = /^(?=.*[@$!%*?&_-]).+$/.test(password) && /^(?=.*[@$!%*?&_-]).+$/.test(confirmPassword)

	return (
		<>
			<div className={styles.rulesPassword}>
				<span className={`${styles.rulesPasswordOne} `}>Including at least 1 of each:</span>
				<span className={`${styles.rulesPasswordTwo} ${styles.rulesPasswordTag} ${regexAnUppercase && styles.rulesPasswordTagOK}`}>
					ABC
				</span>
				<span className={`${styles.rulesPasswordThree} ${styles.rulesPasswordTag} ${regexAnLowercase && styles.rulesPasswordTagOK}`}>
					abc
				</span>
				<span className={`${styles.rulesPasswordFour} ${styles.rulesPasswordTag} ${regexAnNumber && styles.rulesPasswordTagOK}`}>
					123
				</span>
				<span className={`${styles.rulesPasswordFive} ${styles.rulesPasswordTag} ${regexAnSymbol && styles.rulesPasswordTagOK}`}>
					@$#_-
				</span>
				<span className={`${styles.rulesPasswordSix} `}>Must contain:</span>
				<span
					className={`${styles.rulesPasswordSeven} ${styles.rulesPasswordTag}  ${password.length > 7 && confirmPassword.length > 7 && styles.rulesPasswordTagOK
						}`}
				>
					Min 8 chars
				</span>
			</div>
		</>
	)
}

export default PasswordRequirements
