import { IOrder, IOrderByState, IProductData, IQuantity, ProductType } from "@/app/Types/types"
import { pool } from "@/app/utils/database"
import { CreateIDProduct } from "@/app/utils/functions"
import { generateRandomOrders, productsData, stateOrdersData } from "@/app/utils/mockdata"
import { escapeId, ResultSetHeader } from "mysql2/promise"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
  const params = request.nextUrl.searchParams
  const paramSort = params.get("sort")
  const paramQuantity: string = params.get("quantity") || ""
  const search = params.get("search") || ""
  const sort = params.get("sort") || "asc"
  const order = params.get("order") || ""
  const page: number = Number(params.get("page")) || 1
  try {
    /* TODO */
    //Agregar aqui el fetch a la base de datos
    if (paramSort === "profit") {
      const response: IProductData[] = productsData
        .sort((a, b) => {
          if (a.quantitySold > b.quantitySold) {
            return -1
          }
          if (a.quantitySold < b.quantitySold) {
            return 1
          }
          return 0
        })
        .filter((product, index) => index < parseInt(paramQuantity))
      return NextResponse.json({ response }, { status: 200 })
    } else {
      let query = "SELECT * FROM products"
      const pageSize = 5
      const offset = (page - 1) * pageSize

      if (search) {
        query +=
          " WHERE sku LIKE ? OR brand LIKE ? OR title LIKE ? OR description LIKE ? OR category LIKE ? OR subcategory LIKE ?"
      }

      if (order) {
        query += ` ORDER BY ${order} ${sort}`
      }

      query += ` LIMIT ${pageSize} OFFSET ${offset}`

      // Crear un array de valores para la declaración preparada
      const likePattern = `%${search}%`
      const values = search
        ? [likePattern, likePattern, likePattern, likePattern, likePattern, likePattern]
        : []

      const [products] = await pool.query(query, values)

      let queryCount = "SELECT COUNT (*) AS quantity FROM products"
      if (search) {
        queryCount +=
          " WHERE sku LIKE ? OR brand LIKE ? OR title LIKE ? OR description LIKE ? OR category LIKE ? OR subcategory LIKE ?"
      }
      const likePatternCount = `%${search}%`
      const valuesCount = search
        ? [
            likePatternCount,
            likePatternCount,
            likePatternCount,
            likePatternCount,
            likePatternCount,
            likePatternCount,
          ]
        : []

      const response = await pool.query(queryCount, valuesCount)
      const quantity: IQuantity[] = response[0] as IQuantity[]
      const totalProducts = quantity[0].quantity
      const totalPages = Math.ceil(totalProducts / pageSize)
      const data = {
        products,
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize,
      }

      return NextResponse.json({ data }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const values = await request.json()
  const product: ProductType = values.productValue
  console.log(product)

  try {
    const currentDate = new Date().toISOString()
    const skuProduct = CreateIDProduct(product.sku)
    const response = await pool.query(
      `INSERT INTO products (title, description, specs, image, slideImages, brand, brandLogo, category, subcategory, sameDayDelivery, storePickUp, price, isDiscounted, discount, isNew, isSale, isFreeShipping, isClearance, createdDate, lastModified, minimuninventoryQuantity, inventoryQuantity, soldQuantity, sku)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.title,
        product.description,
        JSON.stringify(product.specs),
        product.image,
        JSON.stringify(product.slideImages),
        product.brand,
        product.brandLogo,
        product.category,
        product.subcategory,
        product.sameDayDelivery,
        product.storePickUp,
        product.price,
        product.isDiscounted,
        product.discount,
        product.isNew,
        product.isSale,
        product.isFreeShipping,
        product.isClearance,
        currentDate,
        currentDate,
        product.minimuninventoryQuantity,
        product.inventoryQuantity,
        0,
        skuProduct,
      ]
    )
    const products: ResultSetHeader[] = response as ResultSetHeader[]

    if (products[0].affectedRows === 1) {
      return NextResponse.json({}, { status: 201 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
  return NextResponse.json(
    { error: "A server error occurred. Please try again later." },
    { status: 500 }
  )
}
