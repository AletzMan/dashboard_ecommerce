
import axios from "axios"
import styles from "./totalsview.module.scss"
import { ArrowIcon, ProductsIcon, TopIcon } from "@/app/SVG/componentsSVG"
import { ProductType } from "@/app/Types/types"

export async function BestProduct() {
    const responseProducts = await axios.get("http://localhost:3000/api/products/top")
    const products: ProductType[] = responseProducts.data.products
    return (
        <article className={styles.article}>
            <header className={styles.article_header}>
                <span className={`${styles.article_number} ${styles.article_numberTop}`}>{products[0].sku}</span>
                <h4 className={styles.article_title}>{`${products[0].category}/${products[0].subcategory}`}</h4>
            </header>
            <div className={`${styles.article_best} ${styles.article_image}`}>
                <TopIcon className={styles.article_bestTop} />
                <ProductsIcon className={`${styles.article_bestIcon} `} />
            </div>
            <span className={styles.article_balance}>
                <span className={styles.article_balanceText}>Quantity Sold: </span>
                {`${products[0].soldQuantity}`}
            </span>
        </article>
    )
}
