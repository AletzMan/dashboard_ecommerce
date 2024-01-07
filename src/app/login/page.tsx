"use client"


import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { signIn, useSession } from "next-auth/react"
import styles from "./login.module.scss"
import { LoadingIcon, LogInIcon } from "../SVG/componentsSVG"
import { Button } from "../dashboard/components/Button/Button"
import { TextFieldType } from "../Types/types"
import HeaderHome from "../components/HeaderHome/HeaderHome"
import { TextField } from "../dashboard/components/TextField/TextField"
import { loginSchema } from "../validations/loginSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyboardEvent } from "react"

interface ICredentials {
	email: string
	password: string
}

function FormLogin() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const [error, setError] = useState({ email: false, password: false })
	const [loading, setLoading] = useState(false)
	const { handleSubmit, formState, control } = useForm<ICredentials>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" }
	})
	const { errors, isValid } = formState

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
			callbackUrl: "/dashboard/overview",
		})
		console.log(response)
		if (response?.ok) {
			router.push("/dashboard/overview")
			setLoading(false)
		}
		if (response?.error) {
			enqueueSnackbar(response.error.replaceAll(`'email'`, "").replaceAll(`'password'`, ""), { variant: "error" })
			setError({
				email: response.error.includes("email"),
				password: response.error.includes("password"),
			})

		}
	}

	const HandleLogin = () => {
		setLoading(true)
		if (isValid) {
			ValidateInfoAndSend()
		}
		setLoading(false)
	}


	const HandleMouseEnter = () => {
		setLoading(true)
		if (isValid) {
			ValidateInfoAndSend()
		}
		setLoading(false)
	}

	return (
		<>
			<SnackbarProvider autoHideDuration={4500} preventDuplicate={true} anchorOrigin={{ horizontal: "left", vertical: "top" }} />
			<HeaderHome title="e-Commerce Dashboard" />
			<main className={styles.login}>
				<form className={styles.login__form} onSubmit={handleSubmit(data => data)}>
					<h2 className={styles.login__title}>Login to your account</h2>
					<LogInIcon className={styles.login__icon} />
					<TextField
						textFieldProps={{
							name: "email",
							label: "E-mail",
							controlExt: control,
							onChange: handleChange,
							type: TextFieldType.Mail,
							error: errors.email?.message || error.email ? "Invalid email" : "",
						}}
					/>
					<TextField
						textFieldProps={{
							name: "password",
							label: "Password",
							controlExt: control,
							onChange: handleChange,
							onKeyDown: () => HandleMouseEnter(),
							type: TextFieldType.Password,
							error: errors.password?.message || error.password ? "Invalid password" : "",
						}}
					/>
					<Button
						title="Sign In"
						buttonProps={{
							text: !loading ? (status === "authenticated" ? "ACCESSING..." : "SIGN IN") : "",
							iconButton: loading ? <LoadingIcon /> : undefined,
							disabled: loading || status === "authenticated",
							onClick: HandleLogin,
							type: "submit",
						}}
					/>
				</form>
			</main>
		</>
	)
}

export default FormLogin
