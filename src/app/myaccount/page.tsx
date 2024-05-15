"use client"
import { ChangeIcon, EditIcon, LoadingIcon } from '../SVG/componentsSVG'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import styles from './account.module.scss'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { TextField } from '../dashboard/components/TextField/TextField'
import { Button } from '../dashboard/components/Button/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSnackbar } from 'notistack'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { URL_API } from '../Constants/constants'
import { ZodIssue } from 'zod'
import PasswordRequirements from '../components/PasswordRequirements/PasswordRequirements'

export default function MyAccountPage() {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useRouter()
    const { data: session } = useSession()
    const [password, setPassword] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    const [errors, setErrors] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    const [loading, setLoading] = useState(false)

    const HandleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }


    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        UpdateProfile()
    }

    const UpdateProfile = async () => {
        const idUser = (session?.user as { id: number; name: string })?.id
        let response: AxiosResponse<any, any> = {} as AxiosResponse

        try {
            //Enviar los datos del password nuevo y el actual, para validar
            response = await axios.patch(`${URL_API}users/${idUser}/password`, {
                currentPassword: password.currentPassword,
                newPassword: password.newPassword,
                confirmNewPassword: password.confirmNewPassword,
            })
            //Respuesta correcta
            if (response.status === 200) {
                enqueueSnackbar(response.data?.message, { variant: "success" })
                setPassword({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
                setLoading(false)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    navigate.push("/login")
                } else if (error.response.status === 422) {
                    enqueueSnackbar(error.response.data.message, { variant: "error" })
                    const issues = error.response.data.issues.issues as ZodIssue[]
                    let newData = { currentPassword: "", newPassword: "", confirmNewPassword: "" }
                    issues.forEach((issue) => {
                        newData = { ...newData, [issue.path[0] as string]: issue.message }
                    })
                    setErrors(newData)
                } else {
                    console.error(error)
                    enqueueSnackbar(error.response.data.message, { variant: "error" })
                }
            }
            setLoading(false)
        }
    }

    return (
        <section className={styles.myAccountPage}>
            <HeaderHome title='My Account' />
            <section className={styles.content}>
                <div className={styles.image}>
                    <picture className={styles.picture}>
                        <Image className={styles.picture_img} src={session?.user?.image || "/user_icon.png"} alt={session?.user?.name || "User"} width={120} height={120} />
                    </picture>
                    <button className={styles.picture_button}>
                        <EditIcon />
                    </button>
                </div>
                <fieldset className={styles.fieldset}>
                    <label className={styles.fieldset_label}>Name</label>
                    <p className={styles.fieldset_text}>{session?.user?.name}</p>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label className={styles.fieldset_label}>Email</label>
                    <p className={styles.fieldset_text}>{session?.user?.email}</p>
                </fieldset>
                <form className={styles.form} onSubmit={HandleSubmit}>
                    <TextField
                        textFieldProps={{
                            name: "currentPassword",
                            label: "Current Password",
                            value: password.currentPassword,
                            onChange: HandleChangeInput,
                            error: errors.currentPassword
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            name: "newPassword",
                            label: "New Password",
                            value: password.newPassword,
                            onChange: HandleChangeInput,
                            error: errors.newPassword
                        }}
                    />
                    <TextField
                        textFieldProps={{
                            name: "confirmNewPassword",
                            label: "Confirm Password",
                            value: password.confirmNewPassword,
                            onChange: HandleChangeInput,
                            error: errors.confirmNewPassword
                        }}
                    />
                    <PasswordRequirements password={password.newPassword} confirmPassword={password.confirmNewPassword} />
                    <Button
                        title='Change password'
                        className={styles.form_button}
                        buttonProps={{
                            text: "Change Password",
                            type: "submit",
                            onClick: () => { },
                            iconButton: loading ? <LoadingIcon /> : <ChangeIcon />,
                            disabled: loading
                        }}
                    />
                </form>
            </section>
        </section>
    )
}
