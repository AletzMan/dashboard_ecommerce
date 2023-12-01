
import { ViewOnIcon } from "@/app/SVG/componentsSVG"
import { ProductType } from "@/app/Types/types"
import { FormattedString } from "@/app/utils/functions"
import Image from "next/image"
import { FC } from "react"
import styles from "./productcatalog.module.scss"


interface Props {
    product: ProductType
}

export const ProductCard: FC<Props> = ({ product }) => {

    return (
        <div className={styles.card}>
            <span className={styles.card_sku} >{product.sku}</span>
            <Image className={styles.card_image} src={product.image} width={40} height={40} alt={`Imagen of ${product.title}`} />
            <span className={styles.card_title}>{product.subcategory}</span>
            <span className={styles.card_brand}>{product.brand}</span>
            {/*<Image className={styles.card_logo} src={product.brandLogo} width={40} height={40} alt={`Imagen of ${product.brand}`} />*/}
            <span className={styles.card_price} >{FormattedString(Number(product.price))}</span>
            <span className={`${styles.card_status} ${product.status === "inactive" && styles.card_statusInactive} ${product.status === "out-of-stock" && styles.card_statusOut}`} >{product.status}</span>
            <button className={styles.card_view}>
                <ViewOnIcon className={styles.card_viewIcon} />
            </button>
        </div>
    )
}