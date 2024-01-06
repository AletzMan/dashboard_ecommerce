import { z } from "zod"

export const inventorySchema = z.object({
  inventoryQuantity: z
    .string({ errorMap: (error) => ({ message: "Quantity must be a number" }) })
    .refine((value) => parseInt(value) > 0, { message: "Quantity must be greater than 0" }),
  minimuninventoryQuantity: z
    .string()
    .refine((value) => parseInt(value) > 0, { message: "Quantity must be greater than 0" }),
})
