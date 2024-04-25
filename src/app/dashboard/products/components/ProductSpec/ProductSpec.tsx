
import { IProduct } from "@/app/interfaces/product"
import styles from "./productspec.module.scss"
import { DescriptionIcon } from "@/app/SVG/componentsSVG"

function ProductSpec({ item }: { item: IProduct }) {
	return (
		<section className={styles.spec}>
			<div className={styles.spec__icon}>
				<DescriptionIcon />
			</div>
			<h2 className={styles.spec__title}>Specifications</h2>
			{item?.specs.details.map((spec) => (
				<div className={styles.spec__section} key={spec.name}>
					<h3 className={styles.spec__sectionTitle}>{spec.name}</h3>
					{spec.attributes.map((option) => (
						<div className={styles.spec__option} key={option.name}>
							<span className={styles.spec__optionName}>{option.name}</span>
							<div className={styles.spec__optionDescription}>
								<span className={styles.spec__optionDescriptionValue} >
									{option.value}
								</span>

							</div>
						</div>
					))}
				</div>
			))}
		</section>
	)
}

export default ProductSpec
