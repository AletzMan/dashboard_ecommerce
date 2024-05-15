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
import { IProduct, IProductCharacteristic } from "@/app/interfaces/product"
import { FormEvent, useEffect, useState } from "react"
import { SectionLoadImages } from "./SectionLoadImages"
import { Button } from "../../components/Button/Button"
import { AddIcon, ArrowLeftIcon, ArrowRightIcon, CheckGreenIcon, ResetIcon } from "@/app/SVG/componentsSVG"
import { useProductInformation } from "@/app/utils/store"
import { useParams, useSearchParams } from "next/navigation"
export type IInputs = {
	title: string
	image: string
	slide_images: string
	description: string
	category: string
	subcategory: string
	brand: string
	price: string
	discount: string
	is_discounted: boolean
	inventory_quantity: string
	minimun_inventory_quantity: string
	details: IProductCharacteristic[]
}

const NAME_STEPS = ["Information", "Images", "Sales", "Details"]
const FIRST_SECTION = ["title", "description", "category", "subcategory", "brand"]

interface Props {
	productSelect?: IProduct
}



export function FormProduct({ productSelect }: Props) {
	const paramas = useSearchParams()
	const [step, setStep] = useState<number>(1)
	const [reset, setReset] = useState(false)
	const [isValidStep, setIsValidStep] = useState([true, true, true, true])
	const { setProductValue, loadInformation, productValue, EmptyProduct, isEdit, setIsEdit } = useProductInformation()
	const { handleSubmit, formState: { errors, isValid }, control, setValue, getValues, clearErrors } = useForm<IInputs>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			brand: "",
			category: "",
			image: "",
			slide_images: "",
			subcategory: "",
			description: "",
			inventory_quantity: "",
			minimun_inventory_quantity: "",
			is_discounted: false,
			discount: "",
			price: "",
			title: "",
			details: [{ id: crypto.randomUUID(), name: "", attributes: [{ id: crypto.randomUUID(), name: "", value: "" }] }]
		}, mode: "all"
	})

	const HandleOnSubmit = (data: IInputs) => {
	}

	useEffect(() => {
		if (paramas.size && productSelect) {
			setProductValue(productSelect)
		} else if (!paramas.size && !isEdit) {
			setProductValue(EmptyProduct)
			setIsEdit(true)
		}
	}, [loadInformation])

	useEffect(() => {
		const newValue = [...isValidStep]

		newValue[0] = errors.title?.message === undefined && errors.description?.message === undefined && errors.category?.message === undefined && errors.subcategory?.message === undefined && errors.brand?.message === undefined
		newValue[1] = errors.image?.message === undefined && errors.slide_images?.message === undefined
		newValue[2] = errors.price?.message === undefined && errors.discount?.message === undefined && errors.inventory_quantity?.message === undefined && errors.minimun_inventory_quantity?.message === undefined
		if (errors !== undefined && errors.details !== undefined) {
			const number = getValues("details").length
			for (let index = 0; index < number; index++) {
				if (errors.details[index]) {
					newValue[3] = false
					break
				}
			}
		} else {
			newValue[3] = true
		}
		setIsValidStep(newValue)
	}, [errors])


	const HandleChangeStep = (type: "+" | "-") => {
		if (type === "+" && step < 4) {
			setStep(prev => prev + 1)
		} else if (type === "-" && step > 1) {
			setStep(prev => prev - 1)
		}
	}

	const HandleAddProduct = () => {
		setStep(1)
	}

	const HandleResetForm = () => {
		setReset(true)
		setProductValue(EmptyProduct)
		setTimeout(() => {
			setReset(false)
		}, 50);
		clearErrors()
		setStep(1)
		setIsEdit(false)
	}

	return (
		<>
			<form className={`${styles.section_form} `} onSubmit={handleSubmit(HandleOnSubmit)}>
				<header className={styles.section_header}>
					<div className={styles.section_headerLine}>
						<div className={styles.section_headerSection} style={{ transform: `scaleX(${0.2 * step})` }}></div>
					</div>
					<div className={styles.section_headerButtons}>
						{NAME_STEPS.map((nameStep, index) => (
							<div key={nameStep} className={styles.section_headerContainer}>
								<button
									type="button"
									className={`${styles.section_headerButton} ${step > index && styles.section_headerButtonSelect} ${step === index + 1 && styles.section_headerButtonCurrent}  ${!isValidStep[index] && styles.section_headerButtonError}  ${isValidStep[index] && step !== index + 1 && styles.section_headerButtonPassed}`}
									onClick={() => setStep(index + 1)}
									disabled={step === 5}
								>{index + 1}</button>
								<span className={styles.section_headerLabel}>{nameStep}</span>
							</div>
						))
						}
					</div>
				</header>
				<article className={`${styles.article} scrollBarStyle`}>
					{step === 1 && <div className={`${styles.article_section} ${styles.article_sectionBasic}`}>
						<h3 className={styles.article_sectionTitle}>Basic information</h3>
						<BasicInformation errors={errors} control={control} setValue={setValue} />
					</div>}
					{<div className={`${styles.article_section} ${step === 2 ? styles.article_sectionVisible : styles.article_sectionCollapse} ${styles.article_sectionBasic}`}>
						<h3 className={styles.article_sectionTitle}>Load Images</h3>
						<SectionLoadImages errors={errors} control={control} setValue={setValue} productSelect={productSelect} />
					</div>}
					{step === 3 && <div className={`${styles.article_section}  ${styles.article_sectionBasic}`}>
						<h3 className={styles.article_sectionTitle}>Sales Information</h3>
						<Information errors={errors} control={control} setValue={setValue} />
					</div>}
					{step === 4 && <div className={`${styles.article_section}   ${styles.article_sectionBasic}`}>
						<Details productSelect={productSelect} control={control} getValues={getValues} errors={errors} reset={reset} />
					</div>}
					{step === 5 && <div className={`${styles.article_section}   ${styles.article_sectionBasic}`}>
						<h3 className={styles.article_sectionTitle}>Product successfully added</h3>
						<CheckGreenIcon className={styles.article_sectionIcon} />
						<Button title="Next step"
							className={styles.article_sectionButton}
							buttonProps={{
								text: "Add new product",
								onClick: HandleAddProduct,
								type: "button",
								iconButton: <AddIcon />,
								isSecondary: true,
							}} />
					</div>}
				</article>
				<div className={styles.section_formButtons}>
					{step < 5 && <>
						<Button title="Previous step"
							className={styles.section_formButton}
							buttonProps={{
								text: "Reset",
								onClick: HandleResetForm,
								type: "button",
								iconButton: <ResetIcon />,
								isSecondary: true,
							}} />
						<Button title="Previous step"
							className={styles.section_formButton}
							buttonProps={{
								text: "Previous",
								onClick: () => HandleChangeStep("-"),
								type: "button",
								disabled: step === 1,
								isSecondary: true,
							}} />
					</>
					}
					{step < 4 && <Button title="Next step"
						className={styles.section_formButton}
						buttonProps={{
							text: "Next",
							onClick: () => HandleChangeStep("+"),
							type: "button",
							isSecondary: false,
							disabled: step === 4,
						}} />}
					{step === 4 && <SaveProductsButton isValid={isValid} setStep={setStep} />}
				</div>
			</form>
		</>
	)
}
