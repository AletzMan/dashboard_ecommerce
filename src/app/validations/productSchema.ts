import { z } from "zod"

export const productSchema = z
	.object({
		title: z.string().min(5),
		image: z.string().min(1, { message: "Select at least one image" }),
		slide_images: z.string().min(1, { message: "Select at least one image" }),
		description: z.string().min(2).max(300),
		category: z
			.string()
			.min(1, { message: "Select an option" })
			.refine((brand) => brand !== "0", { message: "Select an option" }),
		subcategory: z
			.string()
			.min(1, { message: "Select an option" })
			.refine((brand) => brand !== "0", { message: "Select an option" }),
		brand: z
			.string()
			.min(1, { message: "Select an option" })
			.refine((brand) => brand !== "-- Select an option --", { message: "Select an option" }),
		price: z
			.string()
			.refine((val) => parseInt(val) > 0, { message: "The value must be greater than 0" }),
		is_discounted: z.boolean().refine((status) => status === true || status === false),
		discount: z.string(),
		inventory_quantity: z
			.string()
			.refine((val) => parseInt(val) > 0, { message: "The value must be greater than 0" }),
		minimun_inventory_quantity: z
			.string()
			.refine((val) => parseInt(val) > 0, { message: "The value must be greater than 0" }),
		details: z
			.array(
				z.object({
					id: z.string(),
					name: z
						.string()
						.min(3, { message: "The value must have a minimum of 3 characters" }),
					attributes: z
						.array(
							z.object({
								id: z.string(),
								name: z.string().min(3, {
									message: "The value must have a minimum of 3 characters",
								}),
								value: z.string().min(1, {
									message: "The value must have a minimum of 1 characters",
								}),
							})
						)
						.min(1, { message: "Add at least one product attribute" }),
				})
			)
			.min(1, { message: "Add at least one product feature" }),
	})
	.refine(
		(fields) =>
			fields.is_discounted === true && parseInt(fields.discount) <= 0 ? false : true,
		{
			message: "The value must be greater than 0 OK",
			path: ["discount"],
		}
	)

export const brandSchema = z.object({
	name: z.string().min(1),
	logo: z.string().min(1, { message: "Load or select an image" }),
})
