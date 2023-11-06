"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { LoadingIcon, RsesetPasswordIcon } from "@/app/svg/svgComponents"
import { useRouter, useSearchParams } from "next/navigation"
import FormTextField from "../../../components/FormTextField/FormTextField"
import { TextFieldType } from "../../../Types/custumTypes"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { Button } from "../../../technolife/components/Button/Button"
import HeaderHome from "../../../components/HeaderHome/HeaderHome"
import styles from "./restore.module.scss"
import PasswordRequirements from "@/app/register/components/PasswordRequirements/PasswordRequirements"
import InvalidLink from "@/app/components/InvalidLink/InvalidLink"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import SuccessfulPasswordChange from "./components/SuccessfulPasswordChange"

function RestorePasswordPage() {
	const router = useRouter()
	const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD_ENCRYPT as string
	const params = useSearchParams()
	const [userData, setUserData] = useState({ name: "", email: "" })
	const [loading, setLoading] = useState(true)
	const [loadingRequest, setLoadingRequest] = useState(false)
	const [newPasswords, setNewPasswords] = useState({ password: "", passwordConfirm: "" })
	const [error, setError] = useState({ password: true, passwordConfirm: true })
	const [successfulChange, setISuccessfulChange] = useState(false)
	const AuthorizationToken = "Bearer ".concat(PASSWORD)

	useEffect(() => {
		const email = params?.get("e") as string
		const SendInfo = async () => {
			try {
				const response = await axios.post(
					"/api/password/restore",
					{ email },
					{
						headers: { Authorization: AuthorizationToken },
					}
				)
				if (response.status === 200) {
					setUserData({ email: email, name: response.data.user.name })
				}
				setLoading(false)
				return response
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					if (error.response && error.response.status === 410) {
						setUserData({ email: "", name: "" })
					}
				} else {
					console.error(error)
				}
				setLoading(false)
			}
		}
		const response = SendInfo()
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value })
		setError({ password: false, passwordConfirm: false })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setLoadingRequest(true)
		e.preventDefault()
		try {
			//const response = await fetch("http://localhost:4100/users", {
			const response = await axios.patch(
				"/api/password/update",
				{ ...userData, newPasswords },
				{
					headers: { Authorization: AuthorizationToken },
				}
			)
			enqueueSnackbar(response.data.message, { variant: "success" })
			setError({ password: true, passwordConfirm: true })
			setNewPasswords({ password: "", passwordConfirm: "" })
			setISuccessfulChange(true)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if ((error.response?.status as number) >= 500) {
					enqueueSnackbar(error.response?.statusText, { variant: "error" })
				} else {
					enqueueSnackbar(error.response?.data.message, { variant: "error" })
					setError({
						password: error.response?.data.fieldError.includes("password"),
						passwordConfirm: error.response?.data.fieldError.includes("passwordConfirm"),
					})
				}
			} else {
				console.error(error)
			}
		}
		setLoadingRequest(false)
	}

	return (
		<>
			<SnackbarProvider autoHideDuration={4500} preventDuplicate={true} anchorOrigin={{ horizontal: "left", vertical: "top" }} />
			<HeaderHome />
			{userData.name !== "" && !successfulChange && !loading && (
				<main className={styles.login}>
					<form className={styles.login__form} onSubmit={handleSubmit}>
						<h2 className={styles.login__title}>Create new password</h2>
						<RsesetPasswordIcon className={styles.login__icon} />
						<p className={styles.login__message}>{`Hi! ${userData.name} enter a new password and confirm password`}</p>
						<FormTextField
							textFieldProps={{
								name: "password",
								label: "Password",
								value: newPasswords.password,
								onChange: handleChange,
								type: TextFieldType.Password,
								error: error.password,
								isRequired: true,
							}}
						/>
						<FormTextField
							textFieldProps={{
								name: "passwordConfirm",
								label: "Password Confirmation",
								value: newPasswords.passwordConfirm,
								onChange: handleChange,
								type: TextFieldType.Password,
								error: error.passwordConfirm,
								isRequired: true,
							}}
						/>
						<PasswordRequirements password={newPasswords.password} confirmPassword={newPasswords.passwordConfirm} />
						<Button
							className={styles.login__button}
							title="Change Password"
							buttonProps={{
								text: loadingRequest ? "" : "CHANGE PASSWORD",
								iconButton: loadingRequest ? <LoadingIcon /> : undefined,
								disabled: loadingRequest,
								onClick() {},
								type: "submit",
							}}
						/>
					</form>
				</main>
			)}
			{userData.name === "" && !loading && !successfulChange && <InvalidLink />}
			{successfulChange && <SuccessfulPasswordChange />}
			{loading && (
				<div className={styles.loading}>
					<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
						<CircularProgress color="inherit" />
					</Backdrop>
				</div>
			)}
		</>
	)
}

export default RestorePasswordPage
