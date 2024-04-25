"use client"
import { SearchSection } from "@/app/dashboard/components/SearchSection/SearchSection"
import styles from "./headersection.module.scss"
import { Button } from "@/app/dashboard/components/Button/Button"
import { CreateIcon } from "@/app/SVG/componentsSVG"
import { useState } from "react"
import { Modal } from "@/app/components/Modal/Modal"
import SnackProvider from "@/app/dashboard/components/SnackProvider"
import { useViewID } from "@/app/utils/store"

interface IHeaderSearchProps {
    results: number
    title: string
    placeholder?: string
    children?: React.ReactNode
}

export function HeaderSection({ results, placeholder, title, children }: IHeaderSearchProps) {
    const [open, setOpen] = useState<boolean>(false)
    const { setViewID } = useViewID()


    const HandleOpen = (value: boolean) => {
        setOpen(value)
        setViewID("")
    }

    return (
        <SnackProvider>
            <header className={styles.header}>
                <SearchSection total={results} placeholder={placeholder} />
                <Button
                    className={styles.header_button}
                    title={title}
                    buttonProps={{
                        type: "button",
                        onClick: () => HandleOpen(true),
                        text: title,
                        iconButton: <CreateIcon />,
                    }}
                />
                {
                    <Modal title={title} icon={<></>} onClick={() => HandleOpen(false)} viewModal={open}>
                        {children}
                    </Modal>
                }
            </header>
        </SnackProvider>
    )
}

