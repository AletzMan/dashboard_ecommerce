export interface IProduct {
	id: number
	sku: string
	title: string
	specs: IProductDetails
	image: string
	slide_images: string[]
	brand: string
	brand_logo: string
	category: string
	subcategory: string
	description: string
	same_day_delivery: boolean
	store_pickUp: boolean
	rating: number
	price: number
	is_discounted: boolean
	discount: number
	is_new: boolean
	is_sale: boolean
	is_freeShipping: boolean
	is_clearance: boolean
	inventory_quantity: number
	minimun_inventory_quantity: number
	sold_quantity: number
	status: string
}
export interface IProductDetails {
	details: IProductCharacteristic[]
}

export interface IProductCharacteristic {
	id: string
	name: string
	attributes: IProductAttribute[]
}

export interface IProductAttribute {
	id: string
	name: string
	value: string
}

export interface IProductPagination {
	results: IProduct[]
	totalResults: number
	totalPages: number
	currentPage: number
	pageSize: number
}
