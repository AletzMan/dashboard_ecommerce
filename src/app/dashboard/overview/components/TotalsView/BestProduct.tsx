
import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ProductsIcon, TopIcon } from "@/app/SVG/componentsSVG"
import { ProductType } from "@/app/Types/types"
import { URL_API } from "@/app/Constants/constants"
import { PaginationProducts } from "@/app/dashboard/products/page"

export async function BestProduct() {
    const response = await fetch(`${URL_API}products?`, { next: { revalidate: 3600, tags: ['productsPage'] } })
    const responseProducts = await response.json()
    const products: PaginationProducts = responseProducts.response
    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <span className={`${styles.article_number} ${styles.article_numberTop}`}>{products.results[0].sku}</span>
                <h4 className={styles.article_title}>{`${products.results[0].category}/${products.results[0].subcategory}`}</h4>
            </header>
            <div className={`${styles.article_best} ${styles.article_image}`}>
                <TopIcon className={styles.article_bestTop} />
                <ProductsIcon className={`${styles.article_bestIcon} `} />
            </div>
            <span className={styles.article_balance}>
                <span className={styles.article_balanceText}>Quantity Sold: </span>
                {`${products.results[0].soldQuantity}`}
            </span>
        </article>
    )
}
