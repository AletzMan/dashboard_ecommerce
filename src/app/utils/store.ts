import { create } from "zustand"
import { combine, persist } from "zustand/middleware"
import { IBrand } from "../Types/types"



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
        brandSelect: { id: 0, name: "", logo: "", createdDate: "", lastModified: "" },
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