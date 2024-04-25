import { create } from "zustand"
import { combine, persist } from "zustand/middleware"
import { IBrand, ICharacteristicProduct, IImage, ProductType } from "../Types/types"
import { IProduct, IProductDetails } from "../interfaces/product"

interface IViewID {
	viewID: string
	setViewID: (value: string) => void
}

export const useViewID = create<IViewID>((set) => ({
	viewID: "",
	setViewID: (value: string) =>
		set((state) => ({
			viewID: value,
		})),
}))

interface IViewModal {
	viewModal: boolean
	setViewModal: (value: boolean) => void
	brandSelect: IBrand
	setBrandSelect: (value: IBrand) => void
	typeModal: "Add" | "Edit"
	setTypeModal: (value: "Add" | "Edit") => void
}

export const useViewModal = create<IViewModal>((set) => ({
	viewModal: false,
	setViewModal: (value: boolean) =>
		set((state) => ({
			viewModal: value,
		})),
	brandSelect: { id: 0, name: "", logo: "", created_date: "", last_modified: "" },
	setBrandSelect: (value: IBrand) =>
		set((state) => ({
			brandSelect: value,
		})),
	typeModal: "Add",
	setTypeModal: (value: "Add" | "Edit") =>
		set((state) => ({
			typeModal: value,
		})),
}))

const EmptyProduct: IProduct = {
	sku: "",
	id: 0,
	title: "",
	specs: { details: [] },
	image: "",
	slide_images: [],
	brand: "",
	brand_logo: "",
	rating: 0,
	category: "",
	subcategory: "",
	description: "",
	same_day_delivery: false,
	store_pickUp: false,
	price: 0,
	is_discounted: false,
	discount: 0,
	is_new: false,
	is_sale: false,
	is_freeShipping: false,
	is_clearance: false,
	inventory_quantity: 0,
	minimun_inventory_quantity: 0,
	sold_quantity: 0,
	status: "active",
}
interface IEmptyError {
	title: boolean
	specs: boolean
	image: boolean
	slideImages: boolean
	brand: boolean
	brandLogo: boolean
	category: boolean
	subcategory: boolean
	description: boolean
	price: boolean
	inventoryQuantity: boolean
	minimuninventoryQuantity: boolean
}
const EmptyError = {
	title: false,
	specs: false,
	image: false,
	slideImages: false,
	brand: false,
	brandLogo: false,
	category: false,
	subcategory: false,
	description: false,
	price: false,
	inventoryQuantity: false,
	minimuninventoryQuantity: false,
}

interface IProductInformation {
	productValue: IProduct
	setProductValue: (value: IProduct) => void
	errorEmpty: IEmptyError
	setErrorEmpty: (value: IEmptyError) => void
	EmptyProduct: IProduct
	loadInformation: boolean
	setLoadInformation: (value: boolean) => void
	isEdit: boolean
	setIsEdit: (value: boolean) => void
}

export const useProductInformation = create(
	persist<IProductInformation>(
		(set) => ({
			productValue: EmptyProduct,
			setProductValue: (value: IProduct) =>
				set((state) => ({
					productValue: value,
				})),
			errorEmpty: EmptyError,
			setErrorEmpty: (value: IEmptyError) =>
				set((state) => ({
					errorEmpty: value,
				})),
			loadInformation: true,
			setLoadInformation: (value: boolean) =>
				set((state) => ({
					loadInformation: value,
				})),
			isEdit: false,
			setIsEdit: (value: boolean) =>
				set((state) => ({
					isEdit: value,
				})),
			EmptyProduct,
		}),
		{
			name: "AddProduct",
		}
	)
)

interface IImageProduct {
	coverImage: IImage[]
	setCoverImage: (value: IImage[]) => void
	productImages: IImage[]
	setProductImages: (value: IImage[]) => void
}

export const useImagesProduct = create<IImageProduct>((set) => ({
	coverImage: [],
	setCoverImage: (value: IImage[]) =>
		set((state) => ({
			coverImage: value,
		})),
	productImages: [],
	setProductImages: (value: IImage[]) =>
		set((state) => ({
			productImages: value,
		})),
}))

interface IViewMenu {
	viewMenuDashboard: boolean
	setViewMenuDashboard: (value: boolean) => void
}

export const useViewMenu = create<IViewMenu>((set) => ({
	viewMenuDashboard: false,
	setViewMenuDashboard: (value: boolean) =>
		set((state) => ({
			viewMenuDashboard: value,
		})),
}))
