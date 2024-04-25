"use client"
import { NextPageIcon, PrevPageIcon } from "@/app/SVG/componentsSVG"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Fragment, useCallback, useEffect, useState } from "react"
import styles from "./pagination.module.scss"

interface IButtonPag {
    id: string
    page: string
}

interface Props {
    totalPages: number
    currentPage: number
    pathname?: string
    onClickPagination?: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onClickPagination }: Props) {
    const pathname = usePathname()
    const searchParamas = useSearchParams()
    const [buttons, setButtons] = useState<IButtonPag[]>()
    const params = new URLSearchParams(searchParamas).toString()
    let routeUrl = ""

    if (params.includes("page")) {
        routeUrl = `${pathname}?${params}`
    } else {
        routeUrl = (`${pathname}?${params}&page=1`)
    }

    useEffect(() => {
        let buttonsPag: IButtonPag[] = []
        for (let index = 0; index < totalPages; index++) {
            if (totalPages <= 7) {
                const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                buttonsPag.push(buttonPag)
            } else {
                if (currentPage > 4 && currentPage < (totalPages - 3)) {
                    if (index === 0) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 1 || index === 5) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === totalPages - 1) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (totalPages).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 2) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage - 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 3) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 4) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                } else if (currentPage >= (totalPages - 3)) {
                    if (index >= (totalPages - 5)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 1) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === 0) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                } else if (currentPage < 5) {
                    if (index < 5) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === (totalPages - 2)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === (totalPages - 1)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                }

            }
        }
        setButtons(buttonsPag)
    }, [currentPage, params, totalPages])

    return (
        <nav className={styles.pagination}>
            {/*<Link className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} href={`${pathname}?page=1`}><FirstPageIcon /></Link>*/}
            {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} href={`${routeUrl.replace(/page=\d+/, `page=${currentPage - 1}`)}`}><PrevPageIcon /></Link>}
            {onClickPagination && <button className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} onClick={() => onClickPagination(currentPage - 1)}><PrevPageIcon /></button>}
            {buttons?.map(button => (
                button.page !== "..."
                    ?
                    <Fragment key={button.id}>
                        {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage.toString() === button.page && styles.pagination_buttonCurrent}`} href={`${routeUrl.replace(/page=\d+/, `page=${button.page}`)}`}>{button.page}</Link>}                        { }
                        {onClickPagination && <button className={`${styles.pagination_button} ${currentPage.toString() === button.page && styles.pagination_buttonCurrent}`} onClick={() => onClickPagination(Number(button.page))}>{button.page}</button>}
                    </Fragment>
                    :
                    <button key={button.id} className={`${styles.pagination_button} ${styles.pagination_buttonInactive}`}>{button.page}</button>
            ))}
            {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} href={`${routeUrl.replace(/page=\d+/, `page=${currentPage + 1}`)}`}><NextPageIcon /></Link>}
            {onClickPagination && <button className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} onClick={() => onClickPagination(currentPage + 1)}><NextPageIcon /></button>}
            {/*<Link className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} href={`${pathname}?page=${totalPages}`}><LastPageIcon /></Link>*/}
        </nav>
    )
}