import { z } from "zod"

export const productSchema = z.object({
    title: z.string().min(5),
    image: z.string().min(5),
    slideImages: z.string().min(5),
    description: z.string().min(2).max(300),
    category: z.string().min(5).max(100),
    subcategory: z.string().min(5).max(100),
    brand: z.string().min(5).max(100),
    price: z.string().refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
    inventoryQuantity: z.string().refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
    minimuninventoryQuantity: z.string().refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),

})

export const brandSchema = z.object({
    name: z.string().min(2),
    logo: z.string().min(5),
})