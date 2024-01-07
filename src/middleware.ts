import { NextRequest, NextResponse } from "next/server"
import { verify } from "./app/services/jwt_sign_verify"

//export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest) {
  let myTokenLogin = req.cookies.get("next-auth.session-token")
  let isRegisterSuccesful = req.cookies.get("seccesfulRegister")
  let isSuccesOrderCreated = req.cookies.get("succesOrderCreated")
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
      try {
        req.nextUrl.pathname = "/dashboard"
        return NextResponse.redirect(req.nextUrl)
      } catch (error) {
        return NextResponse.next()
      }
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

  //SI SE INGRESA A LA RUTA REDIRIGIR A HOME
  if (pathname.endsWith("/dashboard")) {
    req.nextUrl.pathname = "/dashboard/overview"
    return NextResponse.redirect(req.nextUrl)
  }

  //SI SE INGRESA A LA RUTA REDIRIGIR A HOME
  if (pathname.endsWith("/")) {
    req.nextUrl.pathname = "/dashboard/overview"
    return NextResponse.redirect(req.nextUrl)
  }
}

//export const config = { matcher: ["/technolife/dashboard"] }
