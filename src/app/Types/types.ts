import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { IMonthlySales } from "../utils/mockdata"

export interface IActiveSections {
  overview: boolean
  sales: boolean
  inventory: boolean
  products: boolean
  customers: boolean
  orders: boolean
  marketing: boolean
  security: boolean
  settings: boolean
}

export enum MenuOptionsTypes {
  overview = "overview",
  sales = "sales",
  inventory = "inventory",
  products = "products",
  customers = "customers",
  orders = "orders",
  marketing = "marketing",
  security = "security",
  settings = "settings",
}

export type OptionsType = {
  section: MenuOptionsTypes
  subSections: string[] | undefined
  links: string
  icon: JSX.Element
}

export enum TextFieldType {
  Search = "search",
  Text = "text",
  Phone = "tel",
  Mail = "email",
  Password = "password",
  File = "file",
  Number = "number",
}

export type ProductStatus = ["active, inactive", "out-of-stock"]

export interface ICustomer {
  id: number
  name: string
  lastname: string
  email: string
  genrer: string
  password: string
  privileges: number
  datebirth: string
  phonenumber: string
  registration_date: string
  oldpasswords: string[]
  token_reset_password: string
  image: string
}

export type ProductType = {
  id: number
  sku: string
  title: string
  specs: ICharacteristicProduct[]
  image: string
  slideImages: string[]
  brand: string
  brandLogo: string
  category: string
  subcategory: string
  description: string
  sameDayDelivery: boolean
  storePickUp: boolean
  price: number
  isDiscounted: boolean
  discount: number
  isNew: boolean
  isSale: boolean
  isFreeShipping: boolean
  isClearance: boolean
  inventoryQuantity: number
  minimuninventoryQuantity: number
  soldQuantity: number
  status: string
}

export interface IOrder {
  id: number
  order_id: string
  user_id: number
  name: string
  lastname: string
  creation_date: string
  state: string
  address_id: number
  total_price: number
}

export enum ButtonType {
  WhitOutIcon = 0,
  WhitIcon = 1,
  OnlyIcon = 3,
}

export type ButtonProps = {
  name?: string
  typeButton?: ButtonType
  text: string
  value?: boolean
  setValue?: Dispatch<React.SetStateAction<boolean>>
  iconButton?: JSX.Element
  href?: string
  disabled?: boolean
  onClick: () => void
  isSecondary?: boolean
  type: "button" | "reset" | "submit"
}

export interface IProductData {
  id: number
  name: string
  sku: string
  quantitySold: number
  piecesSold: number
  price: number
}

export interface IOrderByState {
  id: string
  state: string
  orders: number
  amount: number
}

export interface IImage {
  file: File | null
  url: string
}

export interface IAllTimePeriod {
  period: IPeriodSales
  year: number
}

export interface ISalesPerYear {
  year: number[]
  amount: number[]
  sales: number[]
}

export interface IPeriodSales {
  period: string
  sales: number
  salesAmount: number
}

export interface ICategory {
  id: number
  name: string
  name_abbr: string
}

export interface IBrand {
  id: number
  name: string
  name_logo: string
  logo: string
  createdDate: string
  lastModified: string
}

export interface IAttribute {
  id: string
  name: string
  value: string
}

export interface ICharacteristicProduct {
  id: string
  name: string
  attributes: IAttribute[]
}

export interface IQuantity {
  quantity: number
}

export interface IAddress {
  id: number
  user_id: number
  name: string
  last_name: string
  phone_number: number
  street_name: string
  street_number: number
  postal_code: number
  colonia: string
  city: string
  state: string
}
