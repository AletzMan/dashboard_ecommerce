import { NextRequest, NextResponse } from "next/server"
import { verify } from "./app/services/jwt_sign_verify"

//export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest) {
  let myTokenLogin = req.cookies.get("next-auth.session-token")
  let isRegisterSuccesful = req.cookies.get("seccesfulRegister")
  let isSuccesOrderCreated = req.cookies.get("succesOrderCreated")
  const KEY_SECRET = process.env.NEXT_PUBLIC_KEY_SECRET_LOGIN as string
  const { pathname } = req.nextUrl


  /*
  
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
  */
  //SI SE INGRESA A LA RUTA REDIRIGIR A HOME
  if (pathname.endsWith("/technolife") || pathname.endsWith("/technolife/checkout")) {
    req.nextUrl.pathname = "/"
    return NextResponse.redirect(req.nextUrl)
  }

  //PAGINA DE REGISTRO EXISTOSO SOLO SE OUEDE ENTRAR DESPUES DE REGISTRADO UN USUARIO Y SOLO POR 15 SEGUNDOS
  if (pathname.endsWith("/register/succesful")) {
    if (isRegisterSuccesful !== undefined) {
      try {
        await verify(isRegisterSuccesful?.value as string, KEY_SECRET)
        return NextResponse.next()
      } catch (error) {
        req.nextUrl.pathname = "/not-found"
        return NextResponse.redirect(req.nextUrl)
      }
    } else {
      req.nextUrl.pathname = "/not-found"
      return NextResponse.redirect(req.nextUrl)
    }
  }

  //PAGINA DE CREACION DE ORDEN EXISTOSO SOLO SE OUEDE ENTRAR DESPUES DE REGISTRADO UN USUARIO Y SOLO POR 15 SEGUNDOS
  if (pathname.startsWith("/order/succesful")) {
    //setTimeout(async () => {
    // if (isSuccesOrderCreated !== undefined) {

    try {
      await verify(isSuccesOrderCreated?.value as string, KEY_SECRET)
      return NextResponse.next()
    } catch (error) {
      req.nextUrl.pathname = "/not-found"
      return NextResponse.redirect(req.nextUrl)
    }

    /*} else {
      req.nextUrl.pathname = "/not-found"
      return NextResponse.redirect(req.nextUrl)
    }*/
    // }, 0);
  }

  if (
    pathname.startsWith("/technolife/checkout/payment") ||
    pathname.startsWith("/technolife/checkout/shipping") ||
    pathname.startsWith("/technolife/myaccount/profile") ||
    pathname.startsWith("/technolife/myaccount/password") ||
    pathname.startsWith("/technolife/myaccount/orders") ||
    pathname.startsWith("/technolife/myaccount/addresses") ||
    pathname.startsWith("/technolife/myaccount/favorites")
  ) {
    if (myTokenLogin === undefined) {
      req.nextUrl.pathname = "/login"
      return NextResponse.redirect(req.nextUrl)
    } else {
      return NextResponse.next()
    }
  }



}



//export const config = { matcher: ["/technolife/dashboard"] }
