import { createPool } from "mysql2/promise"

export const pool = createPool({
	host: process.env.NEXT_PUBLIC_SQL_HOST,
	user: process.env.NEXT_PUBLIC_SQL_USER,
	password: process.env.NEXT_PUBLIC_SQL_PASSWORD,
	database: process.env.NEXT_PUBLIC_SQL_DATABASE,
	ssl: {
		rejectUnauthorized: false,
	},
})
