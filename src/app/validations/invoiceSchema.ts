import { z } from "zod"

export const invoiceSchema = z.object({
    invoice_number: z.string().min(5),
    order_number: z.string().refine((order_number) => parseInt(order_number), { message: "Not a valid number" }),
    description: z.string().min(2).max(100),
    items: z.array(
        z.object({
            item: z.string().min(5).max(100),
            quantity: z.string().refine((quantity) => parseInt(quantity), { message: "Not a valid number" }),
            cost: z.string().refine((cost) => parseInt(cost), { message: "Not a valid number" }),
        })).min(1),
    bill_to: z.string().min(5).max(100),
    payment: z.string().min(5).max(100),
    dueDate: z.string().refine((dueDate) => Date.parse(dueDate) > new Date().getTime(), { message: "It must be subsequent to the date of issue" }),

})

