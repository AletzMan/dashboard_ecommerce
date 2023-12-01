"use client"
import { AddIcon, SearchIcon } from "@/app/SVG/componentsSVG"
import { ButtonType, ProductType } from "@/app/Types/types"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, Suspense, useState } from "react"
import { Button } from "../components/Button/Button"
import { TextField } from "../components/TextField/TextField"
import { TotalProducts } from "../overview/components/TotalsView/Totalproducts"
import styles from "./productcatalog.module.scss"

interface Props {
    products: ProductType[]
    totalResults: number
    searchText: string
}

export function ProductHeader(props: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const paramSearch = searchParams.get("search") || ""
    const { products, searchText, totalResults } = props
    const [search, setSearch] = useState(paramSearch)

    const HandleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.currentTarget.value
        setSearch(newSearch)
    }

    const HandleSearch = () => {
        router.push(`${pathname}?search=${search}`)
    }



    return (
        <>
            <div className={styles.header_search}>
                <div className={styles.header_searchFields}>
                    <TextField
                        textFieldProps={{
                            label: "",
                            value: search,
                            onChange: (e) => HandleChangeSearch(e),
                            error: false,
                            placeholder: "Search by category, subcategory, SKU, name, brand, etc..."
                        }}
                    />
                    <Button
                        title="Search"
                        buttonProps={{
                            text: "",
                            iconButton: <SearchIcon />,
                            type: "button",
                            typeButton: ButtonType.OnlyIcon,
                            onClick: () => HandleSearch(),
                            isSecondary: true
                        }}
                    />
                </div>

                <div className={styles.header_container}>

                    {searchText ?
                        <div className={styles.header_results}>
                            Found
                            <span className={styles.header_resultsFind}>{` ${totalResults} `}</span>
                            results for
                            <span className={styles.header_resultsSearch}>{` '${searchText}' `}</span>
                        </div>
                        : <p></p>
                    }

                    <Button
                        className={styles.header_searchFieldsNew}
                        title="New Product"
                        buttonProps={{
                            text: "New Product",
                            iconButton: <AddIcon />,
                            type: "button",
                            typeButton: ButtonType.WhitIcon,
                            onClick() { },
                            href: "/dashboard/products/add-or-edit-product"
                        }}
                    />
                </div>

            </div>

        </>
    )
}