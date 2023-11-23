"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { signIn, useSession } from "next-auth/react"
import axios from "axios"
import styles from "./login.module.scss"
import { LoadingIcon, LogInIcon } from "../SVG/componentsSVG"
import { Button } from "../dashboard/components/Button/Button"
import { TextFieldType } from "../Types/types"
import HeaderHome from "../components/HeaderHome/HeaderHome"
import { TextField } from "../dashboard/components/TextField/TextField"

function FormLogin() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const [error, setError] = useState({ email: true, password: true })
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
		setError({ email: false, password: false })
	}

	useEffect(() => {
		router.refresh()
	}, [])

	const ValidateInfoAndSend = async () => {
		//const response = await fetch("http://localhost:4100/users", {
		const response = await signIn("credentials", {
			email: credentials.email,
			password: credentials.password,
			redirect: false,
			callbackUrl: "/dashboard",
		})
		console.log(response)
		if (response?.ok) {
			router.push("/dashboard")
			setLoading(false)
		}
		if (response?.error) {
			enqueueSnackbar(response.error.replaceAll(`'email'`, "").replaceAll(`'password'`, ""), { variant: "error" })
			setError({
				email: response.error.includes("email"),
				password: response.error.includes("password"),
			})

			setLoading(false)
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		ValidateInfoAndSend()
	}
	return (
		<>
			<SnackbarProvider autoHideDuration={4500} preventDuplicate={true} anchorOrigin={{ horizontal: "left", vertical: "top" }} />
			<HeaderHome />
			<main className={styles.login}>
				<form className={styles.login__form} onSubmit={handleSubmit}>
					<h2 className={styles.login__title}>Login to your account</h2>
					<LogInIcon className={styles.login__icon} />
					<TextField
						textFieldProps={{
							name: "email",
							label: "E-mail",
							value: credentials.email,
							onChange: handleChange,
							type: TextFieldType.Mail,
							error: error.email,
							isRequired: true,
						}}
					/>
					<TextField
						textFieldProps={{
							name: "password",
							label: "Password",
							value: credentials.password,
							onChange: handleChange,
							type: TextFieldType.Password,
							error: error.password,
							isRequired: true,
						}}
					/>
					<Button
						title="Sign In"
						buttonProps={{
							text: !loading ? (status === "authenticated" ? "ACCESSING..." : "SIGN IN") : "",
							iconButton: loading ? <LoadingIcon /> : undefined,
							disabled: loading || status === "authenticated",
							onClick() {},
							type: "submit",
						}}
					/>
				</form>
			</main>
		</>
	)
}

export default FormLogin
