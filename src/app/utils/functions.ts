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
    if (element !== undefined && element.toString() === "" || element.toString() === "0") {
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