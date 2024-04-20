"use client"

import { Pagination } from "@/app/components/Pagination/Pagination"
import { OptionsDateLocal, URL_ProductImage } from "@/app/Constants/constants"
import { IBrand } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
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
    role: "status" | "text" | "actions" | "image" | "date" | "price"
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
    role: "status" | "text" | "actions" | "image" | "date" | "price"
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
    actions?: ["view"] | ["edit"] | ["delete"] | ["view", "edit"] | ["view", "delete"] | ["edit", "delete"] | ["view", "edit", "delete"]
    statusOptions?: {
        statusArray: string[],
        colors: string[]
    }
    databaseName?: string
    urlImage: string
}


export function DataGrid(props: Props) {
    const { rows, columns, paginacion, linkEdit, actions, statusOptions, databaseName, urlImage } = props
    const [valuesRows, setValuesRows] = useState<IRow[]>()
    const [valuesHeaderColumns, setValuesHeaderColumns] = useState<IColumnHeader[]>([{ id: "", name: "", headerName: "", role: "text" }])

    const textRows = Object.entries(rows)
    //console.log(textRows)



    useEffect(() => {
        let rowsDataGrid: IRow[] = []
        let headerColumns: IColumnHeader[] = []
        let columnsNames: string[] = []
        columns.map(column => {
            const columnName = Object.values(column)[0]
            columnsNames.push(columnName)
        })

        let textCell: [string, unknown][] = []
        for (let index = 0; index < rows.length; index++) {
            //Obtener todas las columnas del objeto
            const rowCompleted = Object.entries(textRows[index][1]).filter(row => row[0])
            //Filtrar solo las columnas definidas en column
            textCell = rowCompleted.filter(row => columnsNames.includes(row[0]))
            //Ordenar la fila de acuerdo a lo propocionado en column
            const orderRow: [string, unknown][] = []
            for (let indexColumn = 0; indexColumn < columnsNames.length; indexColumn++) {
                textCell.forEach((element) => {
                    if (element[0] === columnsNames[indexColumn]) {
                        orderRow.push(element)
                    }
                })
            }
            let row: ICell[] = []
            //Iterar por cada item del objeto row proporcionado
            for (let indexColumn = 0; indexColumn < orderRow.length; indexColumn++) {
                //Crear cada celda de cada fila
                const fieldKey: string = orderRow[indexColumn][0] === "actions" ? "actions" : orderRow[indexColumn][0]
                const fieldValue: string = orderRow[indexColumn][0] === "actions" ? "" : String(orderRow[indexColumn][1])
                const cell: ICell = { id: crypto.randomUUID(), name: fieldKey, value: fieldValue }
                row.push(cell)
                let headerColumn: IColumnHeader = { id: crypto.randomUUID(), name: fieldKey, headerName: columns[indexColumn].headerName, role: columns[indexColumn].role }
                const numberColumns = columns.filter(column => column.role !== "actions").length
                if (headerColumns.length < numberColumns) {
                    headerColumns.push(headerColumn)
                }
                if (columns.find(column => column.role === "actions") && indexColumn === textCell.length - 1) {
                    const cellActions: ICell = { id: crypto.randomUUID(), name: "actions", value: "actions" }
                    row.push(cellActions)
                }
            }
            //console.log(row)

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


    return (
        <section className={styles.datagrid}>
            <article className={`${styles.table} scrollBarStyleX`}>
                <HeaderColumns headerColumns={valuesHeaderColumns} />
                <div className={`${styles.container} scrollBarStyle`}>
                    <ul className={`${styles.rows}`}>
                        {valuesRows?.map((row, indexColumn) => (
                            <li key={String(row.id)} className={styles.row}>
                                {row.cell.map((cell, index) => (
                                    <div key={cell.id}>
                                        {columns[index]?.role === "text" &&
                                            <span className={`${styles.row_item} ${index === 0 && styles.row_id}`}>{(cell.value)}</span>
                                        }
                                        {columns[index]?.role === "date" &&
                                            <span className={`${styles.row_item}`}>{new Date((cell.value)).toLocaleString("es-MX", OptionsDateLocal)}</span>
                                        }
                                        {columns[index]?.role === "price" &&
                                            <span className={`${styles.row_item} ${styles.row_price}`}>{FormattedString(Number(cell.value))}</span>
                                        }
                                        {columns[index]?.role === "image" && <Image src={`${urlImage}${cell.value}`} width={40} height={40} alt={`Image`} />}
                                        {columns[index]?.role === "actions" && <OptionsRow row={row.cell} linkEdit={linkEdit} actions={actions} databaseName={databaseName} />}
                                        {columns[index]?.role === "status" && statusOptions &&
                                            <span
                                                className={`${styles.row_item} ${styles.row_status} `}
                                                style={{
                                                    color: `${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}`,
                                                    backgroundColor: `${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}30`,
                                                    border: `1px solid ${statusOptions.colors[statusOptions.statusArray.findIndex(sta => sta === cell.value)]}99`
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
            </article>
            <Pagination currentPage={paginacion.currentPage} totalPages={paginacion.totalPages} />
        </section>
    )
}