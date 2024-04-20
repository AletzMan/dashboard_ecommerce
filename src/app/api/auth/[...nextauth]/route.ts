import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { pool } from "@/app/utils/database"
import Cryptr from "cryptr"
import { RowDataPacket } from "mysql2"
import { IsValidMail } from "@/app/utils/functions"
import { URL_API } from "@/app/Constants/constants"
import axios from "axios"
import { ZodError } from "zod"

const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET_LOGIN || ""
const crypt = new Cryptr(KEY_SECRET)

export interface IUser {
	id: string
	name: string
	//lastname: string
	email: string
	password: string
	image: string
	privileges: number
	//datebirth: string
	//phonenumber: number
}

interface IResponseUser {
	error: false
	message: "OK"
	response: IUser
}

type UserToken = {
	id: string
	name: string
	email: string
	image: string
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},

			async authorize(credentials, req) {
				try {
					const response = await axios.post<IResponseUser>(
						`${URL_API}users/authorization`,
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					)
					if (response.status === 200) {
						const user: IUser = {
							id: response.data.response.id,
							name: response.data.response.name,
							email: response.data.response.email,
							password: "",
							privileges: response.data.response.privileges,
							image: response.data.response.image,
						}
						return user
					}
				} catch (error) {
					if (axios.isAxiosError(error)) {
						if (error.response?.status === 422) {
							const zodError: ZodError = error.response?.data
							throw new Error(JSON.stringify(zodError))
						}
						if (error.response?.status === 404) {
							const zodError: ZodError = new ZodError([
								{
									code: "custom",
									message: "There is no registration for the email provided",
									path: ["email"],
								},
							])
							throw new Error(JSON.stringify(zodError))
						} else {
							throw new Error(JSON.stringify(error))
						}
					}
				}
				console.log("LLEGA")
				return null
				/*
        //
        if (credentials?.email === "" || credentials?.password === "") {
          throw new Error(
            `This field ${credentials?.email === "" ? "'email'" : ""} ${credentials?.password === "" ? "'password'" : ""
            } is required`
          )
        }
        if (!IsValidMail(credentials?.email as string)) {
          throw new Error("Please enter a valid email address")
        }
        //---SEARCH USER IN DATABASE---//
        const SearchUser = async () => {
          const result = await pool.query<IUser[]>(
            `SELECT id, email, name, lastname, password, privileges, image FROM users WHERE email=?`,
            [credentials?.email]
          )
          //console.log(result)
          return result[0] as IUser[]
        }
        const userFind = await SearchUser()
        if (userFind.length == 0) {
          throw new Error("There is no registration for the email provided.")
        }
        const PASSWORD_DECRYPT = crypt.decrypt(userFind[0].password)
        if (userFind[0].email === credentials?.email && PASSWORD_DECRYPT === credentials.password) {
          //---WHETHER THE DATA ENTERED MATCH THOSE IN THE DATABASE---//
          if (userFind[0].privileges === 1) {
            return userFind[0]
          } else {
            throw new Error("You do not have the necessary privileges to access this page.")
          }
        } else {
          //---THE PASSWORD DOES NOT MATCH THE ONE IN THE DATABASE---//
          throw new Error("The email and password do not match")
        }
        */
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt({ token, user, trigger, session }) {
			if (trigger === "update" && session.name) {
				token.name = session.name
			}
			if (user)
				token.user = { id: user.id, name: user.name, email: user.email, image: user.image }
			return token
		},
		session({ session, token }) {
			session.user = token.user as UserToken

			return session
		},
	},
	pages: {
		signIn: "/login",
	},
})

export { handler as GET, handler as POST }
