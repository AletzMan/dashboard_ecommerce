"use client"
import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from "notistack"

interface props {
    children: React.ReactNode
}

function SnackProvider({ children }: props) {
    return (
        <>

            <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                {children}
            </SnackbarProvider>
        </>
    )
}

export default SnackProvider