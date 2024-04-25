
import { OptionsDateLocal, URL_API } from "@/app/Constants/constants"
import { ICustomer, IOrder } from "@/app/Types/types"
import axios from "axios"
import { headers } from "next/headers"
import Image from "next/image"
import { Suspense } from "react"
import { DataGrid } from "../../components/DataGrid/DataGrid"
import { SkeletonTotalViews } from "../../overview/components/SkeletonTotalViews/SkeletonTotalViews"
import { TotalOrdersByCustomer } from "../../overview/components/TotalsView/TotalOrderByCustomer"
import { TotalOrderCancelledByCustomer } from "../../overview/components/TotalsView/TotalOrderCancelledByCustomer"
import { TotalOrderCompletedByCustomer } from "../../overview/components/TotalsView/TotalOrderCompletedByCustomer"
import styles from "../customers.module.scss"

const GetCustomer = async (id: string) => {

    try {
        const response = await axios.get(`${URL_API}customers/${id}`)
        const customer: ICustomer[] = response.data.customer
        return customer[0]
    } catch (error) {

    }
}

const GetOrdersByUser = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/orders?user_id=${id}`)
        const orders: IPagination = response.data.data
        return orders
    } catch (error) {

    }
}

interface IPagination {
    orders: IOrder[]
    totalOrders: number
    totalPages: number
    currentPage: number
    pageSize: number
}

export default async function PageCostomer() {
    const headersList = headers();
    const pathname = headersList.get("next-url")
    let customer: ICustomer | undefined = undefined
    let orders: IPagination | undefined = undefined
    const id = pathname?.split("/")[3] || ""

    if (pathname) {
        //customer = await GetCustomer(id)
        //orders = await GetOrdersByUser(id)

    }
    orders = {

        orders: [
            {
                id: 136,
                order_id: '3AJ75315JP770231A',
                user_id: 54,
                creation_date: '2023-09-27T11:05:27.000Z',
                state: 'Delivered',
                address_id: 25,
                total_price: 865.32,
                name: 'Javier',
                lastname: 'Hernandez Balcazar'
            },
            {
                id: 137,
                order_id: '5BD25454GT540258C',
                user_id: 54,
                creation_date: '2023-09-30T19:05:27.000Z',
                state: 'Pending',
                address_id: 23,
                total_price: 1023.33,
                name: 'Javier',
                lastname: 'Hernandez Balcazar'
            },
            {
                id: 138,
                order_id: '3CF21457LK559841N',
                user_id: 54,
                creation_date: '2023-10-21T19:12:35.000Z',
                state: 'On the way',
                address_id: 23,
                total_price: 3214.50,
                name: 'Javier',
                lastname: 'Hernandez Balcazar'
            },
            {
                id: 139,
                order_id: '4FR23654GT321451J',
                user_id: 54,
                creation_date: '2023-10-22T20:25:07.000Z',
                state: 'Cancelled',
                address_id: 25,
                total_price: 2154.45,
                name: 'Javier',
                lastname: 'Hernandez Balcazar'
            }
        ],
        totalOrders: 2,
        totalPages: 1,
        currentPage: 1,
        pageSize: 5
    }
    customer = {
        id: 54,
        name: 'Javier',
        lastname: 'Hernandez Balcazar',
        genrer: 'Male',
        email: 'chicharito@email.com',
        password: '957f2b07a5577374541dd6803ae7cfc6d138006077c11dc2d1bfe01ea709e8924e95e3739fe898a9de52ca93989b73add0272fdf923de7549f3d896d4a91dca8cc4a7935c341d817fb25c3f0b2ea27c21408f53e6224b5112dd95f7257d90a88af03ec75cf6fc74b74d6',
        privileges: 0,
        datebirth: '1987-07-11T06:00:00.000Z',
        phonenumber: '3322556987',
        registration_date: '2023-05-20T06:00:00.000Z',
        oldpasswords: [],
        token_reset_password: "",
        image: 'default'
    }


    return (
        <section className={`${styles.section} scrollBarStyle`} >
            <article className={styles.totals}>
                <Suspense fallback={<SkeletonTotalViews />}>
                    <TotalOrdersByCustomer id={id} title="Total Orders" />
                </Suspense>
                <Suspense fallback={<SkeletonTotalViews />}>
                    {/*<TotalOrderCompletedByCustomer id={id} title="Completed Orders" />*/}
                </Suspense>
                <Suspense fallback={<SkeletonTotalViews />}>
                    {/*<TotalOrderCancelledByCustomer id={id} title="Cancelled Orders" />*/}
                </Suspense>
            </article>
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
                                <span className={styles.customer_name}>{customer?.phonenumber}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Genrer</label>
                                <span className={styles.customer_name}>{customer?.genrer}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Date of Birth</label>
                                <span className={styles.customer_name}>{new Date(customer?.datebirth).toLocaleString("es-MX", OptionsDateLocal)}</span>
                            </div>
                            <div className={styles.data_field}>
                                <label className={styles.data_label}>Registered since</label>
                                <span className={styles.customer_name}>{new Date(customer?.registration_date).toLocaleString("es-MX", OptionsDateLocal)}</span>
                            </div>
                        </div>}
                </article>
                <article className={styles.orders}>
                    <h2 className={styles.orders_title}> All Orders</h2>
                    <Suspense fallback={<SkeletonTotalViews />}>
                        {orders && orders?.orders.length > 0 &&
                            <DataGrid
                                rows={orders.orders}
                                columns={[
                                    { field: "id", headerName: "ID", role: "text", width: 70 },
                                    { field: "order_id", headerName: "Order ID", role: "text", width: "1fr" },
                                    { field: "creation_date", headerName: "Creation Date", role: "date", width: "1fr" },
                                    { field: "state", headerName: "Status", role: "status", width: 120 },
                                    { field: "total_price", headerName: "Amount", role: "price", width: 120 },
                                ]}
                                paginacion={{ currentPage: orders.currentPage, totalPages: orders.totalPages }}
                                statusOptions={{
                                    statusArray: ["On the way", "Delivered", "Pending", "Cancelled"],
                                    colors: ["#2196F3", "#0cd315", "#cebc19", "#FF5722"]
                                }}
                                detailsView={<></>}

                            />
                        }
                    </Suspense>
                </article>
            </div>
        </section>
    )
}