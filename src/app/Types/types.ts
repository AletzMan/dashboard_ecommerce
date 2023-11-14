import { AxiosResponse } from "axios"
import { Dispatch } from "react"

export interface IActiveSections {
    dashboard: boolean
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
    dashboard = "dashboard",
    sales = "sales",
    inventory = "inventory",
    products = "products",
    customers = "customers",
    orders = "orders",
    marketing = "marketing",
    security = "security",
    settings = "settings"
}


export type OptionsType = {
    section: MenuOptionsTypes,
    subSections: string[]
    icon: JSX.Element
}

export enum TextFieldType {
    Search = "search",
    Text = "text",
    Phone = "tel",
    Mail = "email",
    Password = "password",
    File = "file",
}

export type ProductType = {
    sku: string,
    title: string,
    specs: {},
    image: string,
    slideImages: string[],
    brand: string,
    brandLogo: string,
    category: string,
    subcategory: string,
    sameDayDelivery: boolean,
    storePickUp: boolean,
    price: number,
    isDiscounted: boolean,
    discount: number,
    isNew: boolean,
    isSale: boolean,
    isFreeShipping: boolean,
    isClearance: boolean,
    inventoryQuantity: number,
    soldQuantity: number
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
    id: number;
    name: string;
    sku: string;
    quantitySold: number;
    piecesSold: number;
    price: number
}

export interface IOrderByState {
    id: string
    state: string
    orders: number
    amount: number
}

export interface IOrder {
    orderId: number,
    products:
    {
        id: number,
        quantity: number
    }[]
    state: string,
    status: string,
    amount: number
    date: string

}