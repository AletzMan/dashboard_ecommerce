import { useEffect, useState } from "react"
import { ICell, IColumn, IRow } from "../DataGrid"

export interface IColumnHeader {
	id: string
	name: string
	headerName: string
	role: "status" | "text" | "actions" | "image" | "date" | "price"
}

interface IValue {
	valuesRows: IRow[] | null
	valuesColumns: IColumnHeader[] | null
	widthCells: string
}

export function useGetColumnsAndRows(rows: {}[] | undefined, columns: IColumn[]) {
	const [values, setValues] = useState<IValue>({
		valuesRows: null,
		valuesColumns: null,
		widthCells: "",
	})

	const textRows = Object.entries(rows || {})

	useEffect(() => {
		if (rows) {
			GetRowsAndColuns()
		}
	}, [rows])

	const GetRowsAndColuns = () => {
		let rowsDataGrid: IRow[] = []
		let headerColumns: IColumnHeader[] = []
		let columnsNames: string[] = []
		columns.map((column) => {
			const columnName = Object.values(column)[0]
			columnsNames.push(columnName)
		})

		let textCell: [string, unknown][] = []
		if (rows) {
			for (let index = 0; index < rows?.length; index++) {
				//Obtener todas las columnas del objeto
				const rowCompleted = Object.entries(textRows[index][1]).filter((row) => row[0])
				//Filtrar solo las columnas definidas en column
				textCell = rowCompleted.filter((row) => columnsNames.includes(row[0]))
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
					const fieldKey: string =
						orderRow[indexColumn][0] === "actions"
							? "actions"
							: orderRow[indexColumn][0]
					const fieldValue: string =
						orderRow[indexColumn][0] === "actions"
							? ""
							: String(orderRow[indexColumn][1])
					const cell: ICell = {
						id: crypto.randomUUID(),
						name: fieldKey,
						value: fieldValue,
					}
					row.push(cell)
					let headerColumn: IColumnHeader = {
						id: crypto.randomUUID(),
						name: fieldKey,
						headerName: columns[indexColumn].headerName,
						role: columns[indexColumn].role,
					}
					const numberColumns = columns.filter(
						(column) => column.role !== "actions"
					).length
					if (headerColumns.length < numberColumns) {
						headerColumns.push(headerColumn)
					}
					if (
						columns.find((column) => column.role === "actions") &&
						indexColumn === textCell.length - 1
					) {
						const cellActions: ICell = {
							id: crypto.randomUUID(),
							name: "actions",
							value: "actions",
						}
						row.push(cellActions)
					}
				}
				rowsDataGrid.push({ id: crypto.randomUUID(), cell: row })
			}
		}

		let newWidthCells: string = ""
		for (let indexField = 0; indexField < columns.length; indexField++) {
			if (Number.isInteger(columns[indexField].width)) {
				newWidthCells += `${columns[indexField].width}px `
			} else {
				newWidthCells += ` ${columns[indexField].width} `
			}
		}
		setValues({
			valuesRows: rowsDataGrid,
			valuesColumns: headerColumns,
			widthCells: newWidthCells,
		})
	}

	return {
		valuesRows: values.valuesRows,
		valuesHeaderColumns: values.valuesColumns,
		widthCells: values.widthCells,
	}
}
