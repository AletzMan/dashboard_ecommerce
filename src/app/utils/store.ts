import { create } from "zustand"
import { combine, persist } from "zustand/middleware"
import { IBrand, ICharacteristicProduct, IImage, ProductType } from "../Types/types"



interface IViewModal {
    viewModal: boolean
    setViewModal: (value: boolean) => void
    brandSelect: IBrand
    setBrandSelect: (value: IBrand) => void
    typeModal: "Add" | "Edit"
    setTypeModal: (value: "Add" | "Edit") => void
}

export const useViewModal = create<IViewModal>(
    (set) => ({
        viewModal: false,
        setViewModal: (value: boolean) =>
            set((state) => ({
                viewModal: value,
            })),
        brandSelect: { id: 0, name: "", logo: "", name_logo: "", createdDate: "", lastModified: "" },
        setBrandSelect: (value: IBrand) =>
            set((state) => ({
                brandSelect: value,
            })),
        typeModal: "Add",
        setTypeModal: (value: "Add" | "Edit") =>
            set((state) => ({
                typeModal: value,
            })),
    })
)

const EmptyProduct: ProductType = {
    sku: "",
    title: "",
    specs: [],
    image: "",
    slideImages: [],
    brand: "",
    brandLogo: "",
    category: "",
    subcategory: "",
    description: "",
    sameDayDelivery: false,
    storePickUp: false,
    price: 0,
    isDiscounted: false,
    discount: 0,
    isNew: false,
    isSale: false,
    isFreeShipping: false,
    isClearance: false,
    inventoryQuantity: 0,
    soldQuantity: 0,
}
interface IEmptyError {
    title: boolean,
    specs: boolean,
    image: boolean,
    slideImages: boolean,
    brand: boolean,
    brandLogo: boolean,
    category: boolean,
    subcategory: boolean,
    description: boolean,
    price: boolean,
    inventoryQuantity: boolean,
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
}

interface IProductInformation {
    productValue: ProductType
    setProductValue: (value: ProductType) => void
    errorEmpty: IEmptyError
    setErrorEmpty: (value: IEmptyError) => void
}

export const useProductInformation = create<IProductInformation>(
    (set) => ({
        productValue: EmptyProduct,
        setProductValue: (value: ProductType) =>
            set((state) => ({
                productValue: value,
            })),
        errorEmpty: EmptyError,
        setErrorEmpty: (value: IEmptyError) =>
            set((state) => ({
                errorEmpty: value,
            }))

    })
)



interface IImageProduct {
    coverImage: IImage[]
    setCoverImage: (value: IImage[]) => void
    productImages: IImage[]
    setProductImages: (value: IImage[]) => void
}



export const useImagesProduct = create<IImageProduct>(
    (set) => ({
        coverImage: [],
        setCoverImage: (value: IImage[]) =>
            set((state) => ({
                coverImage: value,
            })),
        productImages: [],
        setProductImages: (value: IImage[]) =>
            set((state) => ({
                productImages: value,
            }))

    })
)