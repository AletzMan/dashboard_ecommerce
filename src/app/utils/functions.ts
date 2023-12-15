import { NextRequest, NextResponse } from "next/server"
import { IOrderByState } from "../Types/types"

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD as string

export const gasPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

export const selectUnique = ({ array }: { array: string[] }) => {
  // Crear un objeto para almacenar las cantidades de cada string
  const countMap: { [key: string]: number } = {}

  // Contar la cantidad de veces que se repite cada string
  array.forEach((item) => {
    countMap[item] = countMap[item] ? countMap[item] + 1 : 1
  })

  // Crear un array de objetos con el string y la cantidad
  const result = Object.keys(countMap).map((item) => ({
    item: item,
    quantity: countMap[item],
  }))

  return result
}

export function IsValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
  const isValid = regex.test(password)
  return isValid
}

export function IsValidMail(email: string): boolean {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const isValid = regex.test(email)
  return isValid
}

export const FieldIsValid = (fields: string[]) => {
  let array: string[] = []
  fields.forEach((element, index) => {
    if (element !== undefined && element.toString() === "") {
      //console.log(element)
      array.push(index.toString())
    }
  })

  return array.length > 0
}

export const FieldsInvalid = (fields: string[]) => {
  let array: number[] = []
  fields.forEach((element, index) => {
    if ((element !== undefined && element.toString() === "") || element.toString() === "0") {
      //console.log(element)
      array.push(index)
    }
  })

  return array
}

export const GetPriceWithDiscount = (price: number, discount: number): string => {
  const discountedAmount = (price / 100) * discount
  const totalPrice = price - discountedAmount
  const formatPrice = gasPrice.format(totalPrice)
  return formatPrice
}

export const FormattedString = (value: number) => {
  const formatted = value?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
  return formatted
}

/*
Rango Alto (Verde oscuro o Azul oscuro):

Color: #006400 (verde oscuro) o #00008B (azul oscuro)
Rango Moderado-Alto (Verde claro o Azul claro):

Color: #008000 (verde claro) o #4169E1 (azul claro)
Rango Moderado-Bajo (Amarillo o Naranja):

Color: #FFFF00 (amarillo) o #FFA500 (naranja)
Rango Bajo (Rojo o Gris):

Color: #FF0000 (rojo) o #808080 (gris)
*/

const colorsRange = ["#00660099", "#00cc6699", "#ff990099", "#80808099"]
export interface ISalesRank {
  name: string
  color: string
}

export const GetSalesRank = (orders: IOrderByState[]) => {
  let totalAmount: number[] = []
  for (let index = 0; index < orders.length; index++) {
    totalAmount.push(orders[index].amount)
  }

  let ranges: number[] = []

  const maxValue = Math.max(...totalAmount)

  const value = maxValue / 4.15

  for (let index = 1; index < 4; index++) {
    ranges.push(value * index)
  }

  let salesRank: ISalesRank[] = []

  for (let index = 0; index < orders.length; index++) {
    if (orders[index].amount >= ranges[2]) {
      salesRank.push({ color: colorsRange[0], name: orders[index].state })
    } else if (orders[index].amount < ranges[2] && orders[index].amount >= ranges[1]) {
      salesRank.push({ color: colorsRange[1], name: orders[index].state })
    } else if (orders[index].amount < ranges[1] && orders[index].amount >= ranges[0]) {
      salesRank.push({ color: colorsRange[2], name: orders[index].state })
    } else if (orders[index].amount < ranges[0]) {
      salesRank.push({ color: colorsRange[3], name: orders[index].state })
    }
  }

  return salesRank
}

export const GetHeightAndWidthFromImageURL = (imageURL: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      })
    }
    img.src = imageURL
  })

const formatWithLeadingZero = (value: number) => (value < 10 ? `0${value}` : value)

export const GetFormattedDate = (date: Date): string => {
  console.log("DATE", date)
  const year = date.getFullYear()
  const month = formatWithLeadingZero(date.getMonth() + 1)
  const day = formatWithLeadingZero(date.getDate())
  const hour = formatWithLeadingZero(date.getHours() % 12 || 12)
  const minute = formatWithLeadingZero(date.getMinutes())
  const second = formatWithLeadingZero(date.getSeconds())
  const period = date.getHours() < 12 ? "AM" : "PM"

  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${period}`
}

export const GetNameImage = (type: string) => {
  const fechaActual = new Date()
  const anio = fechaActual.getFullYear()
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0")
  const dia = String(fechaActual.getDate()).padStart(2, "0")
  const hora = String(fechaActual.getHours()).padStart(2, "0")
  const minutos = String(fechaActual.getMinutes()).padStart(2, "0")
  const segundos = String(fechaActual.getSeconds()).padStart(2, "0")
  const milisegundos = fechaActual.getMilliseconds()

  return `${type}${anio}-${mes}-${dia}-${hora}-${minutos}-${segundos}-${milisegundos}`
}

export const CreateIDProduct = (sku: string) => {
  const fechaActual = new Date()
  const milisegundos = fechaActual.getTime()

  return `${sku}-${milisegundos}`
}

export const FormattedDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth().toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const fulldDate = `${year}-${parseInt(month) + 1}-${day}`
  return fulldDate
}
