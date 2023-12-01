import React, { LegacyRef, useEffect, useRef, useState } from "react"
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
	const refContainer = useRef<HTMLDivElement | null>(null)
	const [heightImages, setHeightImages] = useState(height)

	useEffect(() => {
		const div = refContainer.current
		if (div) {
			const heightDiv = div.clientHeight
			setHeightImages(heightDiv)
		}
	}, [images, refContainer.current?.clientHeight])
	console.log(refContainer.current?.clientHeight)
	return (
		<div className={styles.slider} style={{ minWidth: width, minHeight: height }}>
			{children}
			<div className={styles.sliderImages} ref={refContainer}>
				{images[0]?.url &&
					images.length > 0 &&
					images.map((image) => (
						<Image className={styles.sliderImage} key={image.url} src={image.url} alt="Product Image" width={width} height={height} />
					))}
			</div>
		</div>
	)
}
