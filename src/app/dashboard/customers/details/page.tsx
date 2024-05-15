
import { OptionsDateLocal, URL_API } from "@/app/Constants/constants"
import { ICustomer, IOrder } from "@/app/Types/types"
import Image from "next/image"
import { Suspense } from "react"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import { SkeletonTotalViews } from "../../overview/components/SkeletonTotalViews/SkeletonTotalViews"
import styles from "../customers.module.scss"

const GetCustomer = async (id: string) => {

    try {
        const response = await fetch(`${URL_API}customers/${id}`, { next: { revalidate: 10000, tags: [`customer${id}`] } })
        const data = await response.json()
        const customer: ICustomer = data.response
        if (response.ok) {
            return customer
        } else {
            return undefined
        }
    } catch (error) {

    }
}

const GetOrdersByUser = async (id: string) => {
    try {
        const response = await fetch(`${URL_API}orders?user_id=${id}`, { next: { revalidate: 10000, tags: [`customerOrder${id}`] } })
        const data = await response.json()
        const orders: IPagination = data.response
        return orders
    } catch (error) {

    }
}

interface IPagination {
    results: IOrder[]
    totalResults: number
    totalPages: number
    currentPage: number
}

export default async function PageCostomer({ searchParams }: { searchParams: string }) {

    const params = Object.entries(searchParams)
    let customer: ICustomer | undefined = undefined
    let orders: IPagination | undefined = undefined

    if (searchParams) {
        const id = params.find(param => param[0] == "id")?.[1] || ""
        customer = await GetCustomer(id)
        orders = await GetOrdersByUser(id)

    }

    return (
        <section className={`${styles.section} scrollBarStyle`} >
            <div className={styles.section_id}>
                <article className={styles.info}>
                    <div className={styles.customer}>
                        <Image src={"/user_icon.png"} alt={`Profile photo of ${customer?.name}`} width={40} height={40} />
                        <h2 className={styles.customer_name}>{customer?.name} {customer?.lastname}</h2>
                    </div>
                    {customer &&
                        <div className={styles.data}>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>E-mail</label>
                                <span className={styles.data_text}>{customer?.email}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Phonenumber</label>
                                <span className={styles.data_text}>{customer?.phonenumber}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Genrer</label>
                                <span className={styles.data_text}>{customer?.genrer}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Date of Birth</label>
                                <span className={styles.data_text}>{new Date(customer?.datebirth).toLocaleString("es-MX", OptionsDateLocal)}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Registered since</label>
                                <span className={styles.data_text}>{new Date(customer?.registration_date).toLocaleString("es-MX", OptionsDateLocal)}</span>
                            </div>
                        </div>}
                </article>
                <article className={styles.orders}>
                    <h2 className={styles.orders_title}> All Orders</h2>
                    <Suspense fallback={<SkeletonTotalViews />}>
                        {orders && orders?.totalResults > 0 &&
                            <div className={styles.orders_datagrid} >
                                <DataGrid
                                    rows={orders.results}
                                    columns={[
                                        { field: "id", headerName: "ID", role: "text", width: 70 },
                                        { field: "order_id", headerName: "Order ID", role: "text", width: 170 },
                                        { field: "creation_date", headerName: "Creation Date", role: "date", width: 120 },
                                        { field: "state", headerName: "Status", role: "status", width: 120 },
                                        { field: "total_price", headerName: "Amount", role: "price", width: 130 },
                                    ]}
                                    paginacion={{ currentPage: orders.currentPage, totalPages: orders.totalPages }}
                                    statusOptions={{
                                        statusArray: ["On the way", "Delivered", "Pending", "Cancelled"],
                                        colors: ["#2196F3", "#0cd315", "#cebc19", "#FF5722"]
                                    }}
                                    detailsView={<></>}

                                />
                            </div>
                        }
                    </Suspense>
                </article>
            </div>
        </section>
    )
}