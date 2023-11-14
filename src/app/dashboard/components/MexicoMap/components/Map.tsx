import { IOrderByState } from "@/app/Types/types"
import styles from "../mexicomap.module.scss"
import { useRef, MouseEvent, useState, useEffect } from "react"
import { FormattedString, GetSalesRank, ISalesRank } from "@/app/utils/functions"
import { States } from "@/app/Constants/constants"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ResetZoomIcon, ZoomIOutcon, ZoomInIcon } from "@/app/SVG/componentsSVG"

export interface ISelectState {
	state: IOrderByState | undefined
	position: {
		x: number
		y: number
	}
}

interface Props {
	orders: IOrderByState[]
}

export function Map(props: Props) {
	const { orders } = props
	const refMap = useRef<HTMLDivElement>(null)
	const refToolTip = useRef<HTMLDivElement>(null)
	const [viewTooltip, setViewTooltip] = useState(false)
	const [selectState, setSelectState] = useState<ISelectState | undefined>(undefined)
	const [rankColors, setRankColor] = useState<ISalesRank[]>([])

	useEffect(() => {
		const rank = GetSalesRank(orders)
		setRankColor(rank)
	}, [])

	const HandleSelectState = (e: MouseEvent<SVGPathElement>) => {
		const select = orders?.find((state) => state.id === e.currentTarget.id)

		let widthToolTip = 0
		let heightToolTip = 0
		let posXToolTip = 0
		let posYToolTip = 0
		let posXMap = 0
		let posYMap = 0
		let heightMap = 0
		let widthtMap = 0
		if (refToolTip.current && refMap.current) {
			widthToolTip = refToolTip.current.getBoundingClientRect().width
			heightToolTip = refToolTip.current.getBoundingClientRect().height
			posXToolTip = refToolTip.current.getBoundingClientRect().left
			posYToolTip = refToolTip.current.getBoundingClientRect().top - heightToolTip

			posXMap = refMap.current.getBoundingClientRect().left
			posYMap = refMap.current.getBoundingClientRect().top
			heightMap = refMap.current.getBoundingClientRect().height
			widthtMap = refMap.current.getBoundingClientRect().height
		}
		let mouseX = e.clientX - posXMap + 10
		let mouseY = e.clientY - posYMap + 10

		if (mouseY + heightToolTip > heightMap) {
			mouseY = mouseY - heightToolTip - 10
		}
		if (mouseX + widthToolTip > widthtMap) {
			mouseX = mouseX - widthToolTip - 10
		}

		setSelectState({ state: select, position: { x: mouseX, y: mouseY } })
		setViewTooltip(true)
	}

	const HandleHiddenTooltip = () => {
		setViewTooltip(false)
	}
	const handleOnPan = (isPanning: any) => {
		// Cambiar el cursor según el estado de arrastre (panning o no)
		if (isPanning) {
			document.body.style.cursor = "grabbing"
		} else {
			document.body.style.cursor = "grab"
		}
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.container_title}>Regional Sales Status</h2>

			<div
				className={`${styles.tooltip} ${!viewTooltip && styles.tooltipInactive}`}
				ref={refToolTip}
				style={{ left: selectState?.position.x, top: selectState?.position.y }}
			>
				<span className={styles.tooltip_state} style={{ backgroundColor: rankColors.find((color) => color.name === selectState?.state?.state)?.color }}>{`${
					selectState?.state?.state || ""
				}`}</span>
				<span className={styles.tooltip_sales}>{`${FormattedString(selectState?.state?.amount as number)}`}</span>
				<span className={styles.tooltip_orders}>
					<span>Orders: </span>
					{`${selectState?.state?.orders}`}
				</span>
			</div>
			<div className={styles.containerMap} ref={refMap}>
				<TransformWrapper onPanning={handleOnPan}>
					{({ zoomIn, zoomOut, resetTransform }) => (
						<>
							<div className={styles.containerMap_buttons}>
								<button className={styles.containerMap_button} onClick={() => zoomIn()}>
									<ZoomInIcon className={styles.containerMap_buttonIcon} />
								</button>
								<button className={styles.containerMap_button} onClick={() => zoomOut()}>
									<ZoomIOutcon className={styles.containerMap_buttonIcon} />
								</button>
								<button className={styles.containerMap_button} onClick={() => resetTransform()}>
									<ResetZoomIcon className={styles.containerMap_buttonIcon} />
								</button>
							</div>
							<TransformComponent>
								<div className={styles.areaHover}>
									{rankColors && (
										<svg
											className={styles.map}
											fill="#7c7c7c"
											height="631"
											stroke="#ffffff"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 1000 631"
											width="1000"
											onMouseLeave={HandleHiddenTooltip}
										>
											{States.map((state) => (
												<path
													className={styles.map_state}
													onMouseMove={HandleSelectState}
													onMouseLeave={HandleHiddenTooltip}
													key={state.id}
													d={state.drawn}
													id={state.id}
													name={state.name}
													fill={rankColors.find((color) => color.name === state.name)?.color}
													strokeWidth={1}
												></path>
											))}
										</svg>
									)}
								</div>
							</TransformComponent>
						</>
					)}
				</TransformWrapper>
			</div>
		</div>
	)
}
