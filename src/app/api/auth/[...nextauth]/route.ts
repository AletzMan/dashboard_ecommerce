import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Cryptr from "cryptr"
import { URL_API } from "@/app/Constants/constants"
import axios from "axios"
import { ZodError } from "zod"

const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET_LOGIN || ""
const crypt = new Cryptr(KEY_SECRET)

export interface IUser {
	id: string
	name: string
	email: string
	password: string
	image: string
	privileges: number
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
						} else if (error.code == "ECONNREFUSED") {
							throw new Error("500")
						} else {
							throw new Error(JSON.stringify(error))
						}
					}
				}
				return null
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt({ token, user }) {
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
