"use client"

import { Pagination } from "@/app/components/Pagination/Pagination"
import { OptionsDateLocal } from "@/app/Constants/constants"
import { FormattedString } from "@/app/utils/functions"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import styles from "./datagrid.module.scss"
import { HeaderColumns } from "./HeaderColumns"
import { OptionsRow } from "./OptionsRow"
import { NotFoundIcon } from "@/app/SVG/componentsSVG"
import { IColumnHeader, useGetColumnsAndRows } from "./hooks/useGetColumnsAndRows"
import { LoadingData } from "./Loading"


export interface IColumn {
    field: string
    headerName: string
    width: number | string
    role: "status" | "text" | "actions" | "image" | "date" | "price"
}

export interface ICell {
    id: string
    name: string
    value: string
}

export interface IRow {
    id: string
    cell: ICell[]
}



interface IPagination {
    currentPage: number
    totalPages: number
}

interface Props {
    rows: {}[] | undefined
    columns: IColumn[]
    paginacion?: IPagination
    linkEdit?: string
    linkView?: string
    actions?: ["view"] | ["edit"] | ["delete"] | ["view", "edit"] | ["view", "delete"] | ["edit", "delete"] | ["view", "edit", "delete"]
    statusOptions?: {
        statusArray: string[],
        colors: string[]
    }
    databaseName?: string
    detailsView: React.JSX.Element
    editView?: React.JSX.Element
    onClickRow?: (id: number | string) => void
    isSearchClient?: (order: string, sort: 'asc' | 'desc') => void
    onClickPagination?: (page: number) => void
    disableOrder?: boolean
}


export function DataGrid({ rows, columns, paginacion, linkEdit, actions, statusOptions, databaseName, disableOrder, detailsView, editView, onClickRow, isSearchClient, onClickPagination, linkView }: Props) {
    const { valuesHeaderColumns, valuesRows, widthCells } = useGetColumnsAndRows(rows, columns)

    const HandleOnClickRow = (id: number | string) => {
        if (onClickRow) {
            onClickRow(id)
        }
    }

    return (
        <section className={styles.datagrid}>
            <article className={`${styles.table} ${valuesRows?.length === 0 && styles.table_empty} scrollBarStyleX`}>
                {!valuesRows && rows && <LoadingData />}

                {<>
                    <HeaderColumns headerColumns={valuesHeaderColumns || []} isSearchClient={isSearchClient} widthCells={widthCells} disableOrder={disableOrder} />
                    {valuesRows?.length === 0 &&
                        <div className={styles.datagrid_empty}>
                            <span className={styles.datagrid_emptyText}>No hay resultados</span>
                            <NotFoundIcon className={styles.datagrid_emptyIcon} />
                        </div>
                    }
                    <div className={`${styles.container} scrollBarStyle`}>
                        <ul className={`${styles.rows}`}>
                            {valuesRows?.map((row, indexColumn) => (
                                <li key={String(row.id)} className={`${styles.row} `} onClick={() => HandleOnClickRow(row.cell[0].value)} style={{ gridTemplateColumns: widthCells }}>
                                    {row.cell.map((cell, index) => (
                                        <div key={cell.id}>
                                            {columns[index]?.role === "text" &&
                                                <span className={`${styles.row_item} ${index === 0 && styles.row_id}`} title={cell.value}>{(cell.value)}</span>
                                            }
                                            {columns[index]?.role === "date" &&
                                                <span className={`${styles.row_item}`} title={new Date((cell.value)).toLocaleString("es-MX", OptionsDateLocal)}>{new Date((cell.value)).toLocaleString("es-MX", OptionsDateLocal)}</span>
                                            }
                                            {columns[index]?.role === "price" &&
                                                <span className={`${styles.row_item} ${styles.row_price}`} title={FormattedString(Number(cell.value))}>{FormattedString(Number(cell.value))}</span>
                                            }
                                            {columns[index]?.role === "image" && <Image src={cell.value} width={40} height={40} alt={`Image`} />}
                                            {columns[index]?.role === "actions" && <OptionsRow row={row.cell} linkEdit={linkEdit} actions={actions} databaseName={databaseName} detailsView={detailsView} editView={editView} linkView={linkView} />}
                                            {columns[index]?.role === "status" && statusOptions &&
                                                <span
                                                    className={`${styles.row_item} ${styles.row_status} `}
                                                    style={{
                                                        color: `${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}`,
                                                        backgroundColor: `${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}50`,
                                                        //border: `1px solid ${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}40`
                                                    }}
                                                >{(cell.value)}
                                                </span>
                                            }

                                        </div>
                                    ))}


                                </li>
                            ))}
                        </ul>
                    </div>

                </>}
            </article>
            {paginacion && <div className={styles.datagrid_pagination}>
                <Pagination currentPage={paginacion.currentPage} totalPages={paginacion.totalPages} onClickPagination={onClickPagination} />
            </div>}
        </section>
    )
}

const EmptyColumnHeader: IColumnHeader[] = [
    { id: "0", name: "", headerName: "", role: "text", },
    { id: "1", name: "", headerName: "", role: "text", },
    { id: "2", name: "", headerName: "", role: "text", },
    { id: "3", name: "", headerName: "", role: "text", },

]