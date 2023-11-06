import { NextRequest, NextResponse } from "next/server"

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
