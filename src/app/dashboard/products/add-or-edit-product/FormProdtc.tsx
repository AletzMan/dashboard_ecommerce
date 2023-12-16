"use client"
import { ProductType } from "@/app/Types/types"
import { BasicInformation } from "./BasicInformation"
import { Details } from "./Details"
import { Information } from "./Information"
import { SaveProductsButton } from "./SaveProductButton"
import styles from "./createedit.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "@/app/validations/productSchema"

interface Props {
	productSelect?: ProductType
}

export type IInputs = {
	title: string
	image: string
	slideImages: string
	description: string
	category: string
	subcategory: string
	brand: string
	price: string
	inventoryQuantity: string
	minimuninventoryQuantity: string
}

export function FormProduct(props: Props) {
	const { productSelect } = props
	const { handleSubmit, formState, control, setValue } = useForm<IInputs>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			brand: "",
			category: "",
			image: "",
			slideImages: "",
			subcategory: "",
			description: "",
			inventoryQuantity: "",
			minimuninventoryQuantity: "",
			price: "",
			title: "",
		},
	})
	const { errors, isValid } = formState

	const HandleOnSubmit = (data: IInputs) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(HandleOnSubmit)}>
			<header className={styles.section_header}>
				<SaveProductsButton isValid={isValid} />
			</header>
			<article className={styles.article}>
				<div className={`${styles.article_section} ${styles.article_sectionBasic}`}>
					<h3 className={styles.article_sectionTitle}>Basic information</h3>
					<BasicInformation errors={errors} control={control} setValue={setValue} />
				</div>
				<div className={styles.article_section}>
					<h3 className={styles.article_sectionTitle}>Sales Information</h3>
					<Information errors={errors} control={control} setValue={setValue} />
					<Details productSelect={productSelect} />
				</div>
			</article>
		</form>
	)
}
