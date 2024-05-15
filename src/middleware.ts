import { NextRequest, NextResponse } from "next/server"

//export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest) {
	const nameCookie =
		process.env.NODE_ENV === "development"
			? "next-auth.session-token"
			: "__Secure-next-auth.session-token"
	let myTokenLogin = req.cookies.get(nameCookie)
	const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET_LOGIN as string
	const { pathname } = req.nextUrl

	// AL INGRESAR DIRECTAMENTE AL DASHBOARD SI NO ESTA LOGEADO REDIRIGIR AL LOGIN
	// SI ESTA LOGEADO SEGUIR AL DASHBOARD
	if (pathname.endsWith("/")) {
		if (myTokenLogin === undefined) {
			req.nextUrl.pathname = "/login"
			return NextResponse.redirect(req.nextUrl)
		} else {
			req.nextUrl.pathname = "/dashboard"
			return NextResponse.redirect(req.nextUrl)
		}
	}

	//AL INGRESAR A LOGIN O REGISTER SI ESTA LOGEADO REDIRIGIR AL DASHBOARD
	//SI NO ESTA LOGEADO SEGUIR A LA RUTA DE LA QUE SE VIENE
	if (pathname.endsWith("/login")) {
		if (myTokenLogin !== undefined) {
			req.nextUrl.pathname = "/dashboard"
			return NextResponse.redirect(req.nextUrl)
		} else {
			return NextResponse.next()
		}
	}

	//SOLO INGRESAR A LA PAGINA DE RESET PASSWORD SI NO ESTA LOGEADO
	if (pathname.startsWith("/dashboard")) {
		if (myTokenLogin === undefined) {
			req.nextUrl.pathname = "/login"
			return NextResponse.redirect(req.nextUrl)
		} else {
			return NextResponse.next()
		}
	}
}

//export const config = { matcher: ["/technolife/dashboard"] }
