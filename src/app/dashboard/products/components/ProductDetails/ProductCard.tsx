"use client"
import { gasPrice } from "@/app/utils/functions"
import { FC, useEffect, useState } from "react"
import styles from "./itemcard.module.scss"
import { useViewID } from "@/app/utils/store"
import { URL_API } from "@/app/Constants/constants"
import { IProduct } from "@/app/interfaces/product"
import SliderProductImages from "../SliderProductImages/SliderProductImages"
import ItemTags from "../ItemTags/ItemTags"
import DeliveryAndPickUp from "../DeliveryAndPickUp/DeliveryAndPickUp"
import ProductSpec from "../ProductSpec/ProductSpec"



export const ProductCard: FC = () => {
    const { viewID } = useViewID()
    const [product, setProduct] = useState<IProduct | undefined>(undefined)

    useEffect(() => {
        GetProduct("32")
        if (viewID) {
        }
    }, [viewID])

    const GetProduct = async (id: string) => {
        try {
            const response = await fetch(`${URL_API}products/${id}`, { next: { revalidate: 7200 }, cache: "force-cache" })
            const data = await response.json()
            if (response.status === 200) {
                setProduct(data.response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <article className={`${styles.details__product} scrollBarStyle`}>
            <SliderProductImages images={product?.slide_images as string[]} item={product as IProduct} />
            <section className={styles.details__options}>
                <h2 className={styles.details__optionsTitle}>{product?.title}</h2>
                <span className={styles.details__optionsSku}>
                    SKU: <span className={styles.details__optionsSkuNumber}>{product?.sku}</span>
                </span>
                <div className={styles.details__optionsTags}>
                    <ItemTags item={product as IProduct} />
                </div>
                <div className={styles.details__optionsPrices}>
                    {product?.is_discounted && <span className={styles.details__optionsPricesDiscount}>{`${product?.discount}% OFF`}</span>}
                    <span className={`${styles.details__optionsPrice} ${product?.is_discounted && styles.itemCard__priceIsDiscounted}`}>
                        {`US ${gasPrice.format((product?.price as number) - ((product?.price as number) / 100) * (product?.discount as number))}`}
                    </span>
                    {product?.is_discounted && <span className={styles.details__optionsPriceDiscounted}>{gasPrice.format(product?.price)}</span>}
                </div>
                <div className={styles.details__optionsTypePack}>
                    <DeliveryAndPickUp />
                </div>
            </section>
            <section className={styles.spec}>
                <ProductSpec item={product as IProduct} />
            </section>
        </article>
    )
}