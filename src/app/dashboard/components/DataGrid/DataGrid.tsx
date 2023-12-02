"use client"

import { Pagination } from "@/app/components/Pagination/Pagination"
import { IBrand } from "@/app/Types/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { AddBrands } from "../../products/brands/AddBrand"
import styles from "./datagrid.module.scss"
import { HeaderColumns } from "./HeaderColumns"
import { OptionsRow } from "./OptionsRow"

interface IColumn {
    field: string
    headerName: string
    width: number | string
    role: "status" | "text" | "actions" | "image" | "date"
}

export interface ICell {
    id: string
    name: string
    value: string
}

interface IRow {
    id: string
    cell: ICell[]
}

export interface IColumnHeader {
    id: string
    name: string
    headerName: string
    role: "status" | "text" | "actions" | "image" | "date"
}

interface IPagination {
    currentPage: number
    totalPages: number
}

interface Props {
    rows: {}[]
    columns: IColumn[]
    paginacion: IPagination
    linkEdit?: string
}

export function DataGrid(props: Props) {
    const { rows, columns, paginacion, linkEdit } = props
    const [valuesRows, setValuesRows] = useState<IRow[]>()
    const [valuesHeaderColumns, setValuesHeaderColumns] = useState<IColumnHeader[]>([{ id: "", name: "", headerName: "", role: "text" }])

    const textRows = Object.entries(rows)

    useEffect(() => {
        let rowsDataGrid: IRow[] = []
        let headerColumns: IColumnHeader[] = []
        //Iterar por las filas proporcionadas
        for (let index = 0; index < rows.length; index++) {
            const textCell = Object.entries(textRows[index][1])
            let row: ICell[] = []

            //Iterar por cada item del objeto row proporcionado
            for (let indexColumn = 0; indexColumn < textCell.length; indexColumn++) {
                //Comparar la key del objeto proporcionado y compararla con los fields proporcionados para seleccionarlos
                for (let indexField = 0; indexField < columns.length; indexField++) {
                    if (textCell[indexColumn][0] === columns[indexField].field && columns[indexField].role !== "actions") {
                        const fieldKey: string = textCell[indexColumn][0]
                        const fieldValue: string = String(textCell[indexColumn][1])
                        const cell: ICell = { id: crypto.randomUUID(), name: fieldKey, value: fieldValue }
                        row.push(cell)
                        let headerColumn: IColumnHeader = { id: crypto.randomUUID(), name: fieldKey, headerName: columns[indexField].headerName, role: columns[indexField].role }
                        const numberColumns = columns.filter(column => column.role !== "actions").length
                        console.log(numberColumns)
                        if (headerColumns.length < numberColumns) {
                            headerColumns.push(headerColumn)
                        }
                    }
                }
                console.log(columns.length)
                //document.body.style.cssText = `--dataGridColumns: repeat(${columns.length}, 1fr);`
                console.log(columns[columns.length - 1].role)
                if (columns[columns.length - 1].role === "actions" && indexColumn === textCell.length - 1) {
                    const cellActions: ICell = { id: crypto.randomUUID(), name: "actions", value: "actions" }
                    row.push(cellActions)
                }
            }
            rowsDataGrid.push({ id: crypto.randomUUID(), cell: row })
        }
        let widthCells: string = ""
        for (let indexField = 0; indexField < columns.length; indexField++) {
            if (Number.isInteger(columns[indexField].width)) {
                widthCells += `${columns[indexField].width}px `
            } else {
                widthCells += ` ${columns[indexField].width} `
            }
        }
        document.body.style.cssText = `--dataGridColumns: ${widthCells};`
        setValuesRows(rowsDataGrid)
        setValuesHeaderColumns(headerColumns)

    }, [rows])

    console.log(valuesRows)
    console.log(valuesHeaderColumns)
    return (
        <section className={styles.datagrid}>
            <article className={`${styles.table} scrollBarStyleX`}>
                <HeaderColumns headerColumns={valuesHeaderColumns} />
                <div className={`${styles.container} scrollBarStyle`}>
                    <ul className={`${styles.rows}`}>
                        {valuesRows?.map((row, indexColumn) => (
                            <li key={String(row.id)} className={styles.brand}>
                                {row.cell.map((cell, index) => (
                                    <div key={cell.id}>
                                        {columns[index]?.role === "text" &&
                                            <span className={`${styles.brand_item} ${index === 0 && styles.brand_id}`}>{(cell.value)}</span>
                                        }
                                        {columns[index]?.role === "date" &&
                                            <span className={`${styles.brand_item}`}>{new Date((cell.value)).toLocaleString()}</span>
                                        }
                                        {columns[index]?.role === "image" && <Image src={cell.value} width={40} height={40} alt={`Image`} />}
                                        {columns[index]?.role === "actions" && <OptionsRow brand={row.cell} linkEdit={linkEdit} />}
                                        {columns[index]?.role === "status" && <span className={`${styles.brand_item} ${styles.brand_status} ${cell.value === "active" && styles.brand_statusActive}  ${cell.value === "inactive" && styles.brand_statusInactive}`}>{(cell.value)}</span>}

                                    </div>
                                ))}


                            </li>
                        ))}
                    </ul>
                </div>
            </article>
            <Pagination currentPage={paginacion.currentPage} totalPages={paginacion.totalPages} />
        </section>
    )
}