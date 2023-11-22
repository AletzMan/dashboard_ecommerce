import React, { LegacyRef } from "react"
import styles from "./loadimageprovider.module.scss"
import { IImage } from "@/app/Types/types"
import Image from "next/image"

interface Props {
	images: IImage[]
	children: React.ReactNode
	width: number
	height: number
	ref?: LegacyRef<HTMLDivElement> | null
}

export function LoadImageProvider(props: Props) {
	const { images, children, width, height, ref } = props
	return (
		<div className={styles.slider} style={{ width: `${images.length * width + (images.length - 1) * 8}px`, minWidth: width, minHeight: height }} ref={ref}>
			{children}
			<div className={styles.sliderImages}>
				{images[0]?.url &&
					images.map((image) => <Image className={styles.sliderImage} key={image.url} src={image.url} alt="Product Image" width={width} height={width} />)}
			</div>
		</div>
	)
}
