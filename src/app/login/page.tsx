"use client"


import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { signIn, useSession } from "next-auth/react"
import styles from "./login.module.scss"
import { LoadingIcon, LogInIcon } from "../SVG/componentsSVG"
import { Button } from "../dashboard/components/Button/Button"
import { TextFieldType } from "../Types/types"
import HeaderHome from "../components/HeaderHome/HeaderHome"
import { TextField } from "../dashboard/components/TextField/TextField"
import { ZodError } from "zod"

interface ICredentials {
	email: string
	password: string
}

function FormLogin() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const [errors, setErrors] = useState({ email: "", password: "" })
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
		setErrors({ email: "", password: "" })
	}


	const ValidateInfoAndSend = async () => {
		const response = await signIn("credentials", {
			email: credentials.email,
			password: credentials.password,
			redirect: false,
		})
		if (response?.ok) {
			router.refresh()
			console.log("OK LOGIN")
			setLoading(false)
			router.push("/dashboard")
		}
		if (response?.error) {
			console.log("ERROR LOGIN")
			if (response.error === "500") {
				enqueueSnackbar("We're sorry, we were unable to process your request at this time. Please try again later.", { variant: "error" })
			} else {
				const errorsZod: ZodError = JSON.parse(response?.error)
				enqueueSnackbar("Invalid login credentials. Please try again.", { variant: "error" })
				let errorPassword = ""
				let errorEmail = ""
				errorsZod?.issues?.map(issue => {
					if (issue.path[0] === "email") {
						errorEmail = issue.message
					} else if (issue.path[0] === "password") {
						errorPassword = issue.message
					}
				})
				setErrors({ email: errorEmail, password: errorPassword })
			}
			setLoading(false)
		}
	}

	const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		ValidateInfoAndSend()
	}



	return (
		<>
			<SnackbarProvider autoHideDuration={4500} preventDuplicate={true} anchorOrigin={{ horizontal: "left", vertical: "top" }} />
			<HeaderHome title="e-Commerce Dashboard" />
			<main className={styles.login}>
				<form className={styles.login__form} onSubmit={HandleSubmit}>
					<h2 className={styles.login__title}>Login to your account</h2>
					<LogInIcon className={styles.login__icon} />
					<TextField
						textFieldProps={{
							name: "email",
							label: "E-mail",
							onChange: handleChange,
							type: TextFieldType.Mail,
							error: errors.email,
						}}
					/>
					<TextField
						textFieldProps={{
							name: "password",
							label: "Password",
							onChange: handleChange,
							onKeyDown: () => { },
							type: TextFieldType.Password,
							error: errors.password,
						}}
					/>
					<Button
						title="Sign In"
						buttonProps={{
							text: !loading ? (status === "authenticated" ? "ACCESSING..." : "SIGN IN") : "",
							iconButton: loading ? <LoadingIcon /> : undefined,
							disabled: loading || status === "authenticated",
							onClick: () => { },
							type: "submit",
						}}
					/>
				</form>
			</main>
		</>
	)
}

export default FormLogin
