"use client"
import HeaderHome from "@/app/components/HeaderHome/HeaderHome"
import styles from "./reset.module.scss"
import { Button } from "@/app/technolife/components/Button/Button"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ForgotPasswordIcon, LoadingIcon, MailSentIcon } from "@/app/svg/svgComponents"
import FormTextField from "@/app/components/FormTextField/FormTextField"
import { TextFieldType } from "@/app/Types/custumTypes"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import axios from "axios"

function PasswordReset() {
	const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD_ENCRYPT as string
	const [email, setEmail] = useState({ value: "", error: false })
	const [mailSent, setMailSent] = useState({ email: "", isSent: false })
	const [loading, setLoading] = useState(false)
	const AuthorizationToken = "Bearer ".concat(PASSWORD)

	const HandleSend = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		try {
			const result = await axios.post(
				`/api/password/reset`,
				{ email: email.value },
				{
					headers: { Authorization: AuthorizationToken },
				}
			)

			if (result.status === 200) {
				enqueueSnackbar(result.data.message, { variant: "success" })
				setMailSent({ email: email.value, isSent: true })
				setEmail({ ...email, value: "" })
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status >= 400 && error.response.status < 500) {
					enqueueSnackbar(error.response.data.message, { variant: "error" })
					setEmail({ ...email, error: true })
				} else {
					console.error(error)
					enqueueSnackbar(error.message, { variant: "error" })
				}
			}
		}
		setLoading(false)
	}

	useEffect(() => {
		if (email.value === "") {
			setEmail({ ...email, error: true })
		}
	}, [email.value])

	const HandleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail({ error: false, value: e.target.value })
	}

	return (
		<>
			<SnackbarProvider autoHideDuration={3000} preventDuplicate={true} anchorOrigin={{ horizontal: "left", vertical: "top" }} />
			<HeaderHome />
			<main className={styles.main}>
				{!mailSent.isSent && (
					<form className={styles.main__form} onSubmit={HandleSend}>
						<h1 className={styles.main__title}>Reset your password</h1>
						<ForgotPasswordIcon className={styles.main__icon} />
						<p className={styles.main__message}>We will send you a link to your email so you can change your password.</p>
						<FormTextField
							textFieldProps={{
								name: "email",
								type: TextFieldType.Mail,
								label: "E-mail",
								value: email.value,
								onChange: HandleChangeEmail,
								error: email.error,
								isRequired: true,
							}}
						/>
						<Button
							title="Send email"
							buttonProps={{
								text: loading ? "" : "SEND",
								iconButton: loading ? <LoadingIcon /> : undefined,
								disabled: loading,
								onClick() {},
								type: "submit",
							}}
						/>
					</form>
				)}
				{mailSent.isSent && (
					<section className={styles.main__success}>
						<MailSentIcon className={styles.main__successIcon} />
						<h2 className={styles.main__successTitle}>Check your email and follow the instructions</h2>
						<p className={styles.main__successMessage}>
							We have sent an email to <span className={styles.main__successMail}>{mailSent.email}</span> with instructions on how to change your
							password.
						</p>
						<p className={styles.main__successInfo}>*If you do not find it, please check your spam folder.</p>
					</section>
				)}
			</main>
		</>
	)
}

export default PasswordReset
