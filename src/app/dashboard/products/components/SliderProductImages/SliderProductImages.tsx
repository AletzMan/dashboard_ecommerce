
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "./sliderproductimages.module.scss"
import { IProduct } from "@/app/interfaces/product";

function SliderProductImages({ images, item }: { images: string[]; item: IProduct }) {
	const [currentImage, setCurrentImage] = useState(images?.[0])
	const refSlider = useRef<HTMLDivElement | null>(null)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	const [loadingImage, setLoadingImage] = useState(false)

	useEffect(() => {
		if (images) {
			setCurrentImage(images[0])
		}
	}, [images])

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setStartX(e.clientX)

		setScrollLeft(refSlider.current?.scrollLeft || 0)
		document.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseup", handleMouseUp)
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (/*!isDragging || */ !startX || !refSlider.current) return
		const deltaX = e.clientX - startX
		refSlider.current.scrollLeft = scrollLeft - deltaX
	}

	const handleMouseUp = () => {
		document.removeEventListener("mousemove", handleMouseMove)
		document.removeEventListener("mouseup", handleMouseUp)
	}

	const handleImageClick = (image: string) => {
		if (currentImage !== image) {
			setLoadingImage(true)
			setCurrentImage(image)
			setTimeout(() => {

				setLoadingImage(false)
			}, 20);
		}
	}
	return (
		<section className={styles.sliderProduct}>
			<Image className={styles.sliderProduct__brandLogo} src={item?.brand_logo} alt={`Image of ${item?.brand}`} width={100} height={20} />
			{!loadingImage &&
				<Image
					className={`${styles.sliderProduct__currentImage}`}
					src={currentImage}
					width={340}
					height={260}
					alt={`picture of ${"product"}`}
				/>}
			{loadingImage &&
				<Image
					className={`${styles.sliderProduct__currentImageLoad}`}
					src={currentImage}
					width={340}
					height={260}
					alt={`picture of ${"product"}`}
				/>}
			<span className={styles.sliderProduct__images}>
				<span className={styles.sliderProduct__imagesNumber}>{images?.indexOf(currentImage) + 1}</span>
				of
				<span className={styles.sliderProduct__imagesNumber}> {images?.length}</span>
			</span>
			<div className={styles.sliderProduct__slider} ref={refSlider} onMouseDown={handleMouseDown}>
				{images?.map((image, index) => (
					<button
						className={`${styles.sliderProduct__sliderButton} ${currentImage !== image && styles.sliderProduct__sliderButtonNoCurrent}`}
						key={image}
						onClick={() => handleImageClick(image)}
					>
						<Image
							className={styles.sliderProduct__sliderImage}
							src={image}
							width={80}
							height={50}
							alt="image of product"
							draggable={false}
						/>
					</button>
				))}
			</div>
		</section>
	)
}

export default SliderProductImages
