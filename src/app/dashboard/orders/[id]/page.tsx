import { OptionsDateLocal } from "@/app/Constants/constants"
import { IAddress, IOrder, IOrderDetails, ProductType } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
import axios from "axios"
import { headers } from "next/headers"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import styles from "../orders.module.scss"
import { UpdateOrder } from "./UpdateOrder"

interface IPagination {
    products: IOrder[]
    totalProducts: number
    totalPages: number
    currentPage: number
    pageSize: number
}


const GetOrder = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/orders/${id}`)
        if (response.status === 200) {
            return response.data.order[0]
        }
    } catch (error) {
        console.error(error)
    }
}

const GetOrderProducts = async (id: string, params: [string, string][]) => {
    let paramsString: string = ""
    params.forEach((param, index) => {
        if (index === 0)
            paramsString += `?${param[0]}=${param[1]}`
        else
            paramsString += `&${param[0]}=${param[1]}`
    })
    try {
        const response = await axios.get(`http://localhost:3000/api/orders/${id}/details${paramsString}`)
        if (response.status === 200) {
            return response.data.data
        }
    } catch (error) {
        console.error(error)
    }
}

const GetAddress = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/address/${id}`)
        if (response.status === 200) {
            return response.data.address[0]
        }
    } catch (error) {
        console.error(error)
    }
}

export default async function OrderPage({ searchParams }: { searchParams: string }) {
    const params = Object.entries(searchParams)
    const headersList = headers();
    const pathname = headersList.get("next-url")
    let order: IOrder | undefined = undefined
    let products: IPagination | undefined = undefined
    let address: IAddress | undefined = undefined

    if (pathname) {
        const id = pathname?.split("/")[3] || ""
        order = await GetOrder(id)
        if (order) {
            address = await GetAddress(order?.address_id.toString())
            products = await GetOrderProducts(order?.order_id.toString(), params)
            //console.log(products)
        }

    }

    return (
        <section className={styles.section}>
            <article className={styles.details_header}>
                <h3 className={styles.details_title}>Order ID: <span className={styles.details_titleID}>{order?.order_id}</span></h3>
                <h3 className={styles.details_title}>Order # <span className={styles.details_titleID}>{order?.id}</span></h3>
            </article>
            <article className={styles.details_resumen}>
                {order &&
                    <div className={styles.details_order}>
                        <h4 className={styles.details_orderTitle}>Order Details</h4>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Name</label>
                            <span className={styles.details_fieldText}>{`${order?.name} ${order?.lastname}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Creation Date</label>
                            <span className={styles.details_fieldText}>{new Date(order?.creation_date || "").toLocaleDateString("es-MX", OptionsDateLocal)}</span>
                        </div>
                        <div className={`${styles.details_field}`}>
                            <label className={styles.details_fieldLabel}>Status</label>
                            <UpdateOrder id={order?.id || 0} status={order.state} />
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Amount</label>
                            <span className={`${styles.details_fieldText} ${styles.details_fieldTextAmount}`}>{FormattedString(Number(order?.total_price))}</span>
                        </div>
                    </div>}
                {address &&
                    <div className={styles.details_address}>
                        <h4 className={styles.details_orderTitle}>Delivery Data</h4>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Name</label>
                            <span className={styles.details_fieldText}>{`${address?.name} ${address?.last_name}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Phonenumber</label>
                            <span className={styles.details_fieldText}>{`${address?.phone_number}`}</span>
                        </div>
                        <div className={styles.details_field}>
                            <label className={styles.details_fieldLabel}>Address</label>
                            <span className={styles.details_fieldText}>{`${address?.street_name} ${address?.street_number}, ${address?.colonia} ${address?.postal_code}`}</span>
                            <span className={styles.details_fieldText}>{`${address?.city}, ${address?.state}`}</span>
                        </div>
                    </div>
                }
            </article>
            <article className={styles.products}>
                {products &&
                    <DataGrid
                        rows={products?.products}
                        columns={[
                            { field: "id", headerName: "ID", role: "text", width: 60 },
                            { field: "sku", headerName: "SKU", role: "text", width: "1fr" },
                            { field: "image", headerName: "Image", role: "image", width: 70 },
                            { field: "quantity", headerName: "Qty", role: "text", width: 80 },
                            { field: "brand", headerName: "Brand", role: "text", width: 130 },
                            { field: "subcategory", headerName: "Subcategory", role: "text", width: "1fr" },
                            { field: "price", headerName: "Price", role: "price", width: 110 }
                        ]}
                        paginacion={{ currentPage: products.currentPage, totalPages: products.totalPages }}
                        actions={["view", "edit", "delete"]}
                        statusOptions={{
                            statusArray: ["active", "out-of-stock", "inactive"],
                            colors: ["#0cd315", "#cebc19", "#FF5722"]
                        }}
                        linkEdit={"/dashboard/products/add-or-edit-product"}
                    />}
            </article>
        </section>
    )
}