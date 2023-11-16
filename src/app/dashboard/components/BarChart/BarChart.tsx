"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./barchart.module.scss"
import { CircleIcon, MenuIcon } from "@/app/SVG/componentsSVG"
import html2canvas from "html2canvas"
import { FloatingMenu } from "../FloatingMenu/FloatingMenu"

export interface ISeries {
	name: string
	data: number[]
}

export interface IXAxis {
	title: {
		enabled: boolean
		text: string
	}
	categories: string[]
}

export interface IYAxis {
	title: {
		enabled: boolean
		text: string
	}
}

export interface IOptionsChart {
	series: ISeries[]
	xaxis: IXAxis
	yaxis: IYAxis
	chart: {
		height: number
	}
	stroke: {
		show: boolean
		width: number
		colors: string[]
	}
	fill: {
		opacity: number
		colors: string[]
	}
}

const classGroupBar = [
	styles.graphic_groupBarOne, // Azul
	styles.graphic_groupBarTwo, // Rojo
	styles.graphic_groupBarThree, // Amarillo
	styles.graphic_groupBarFour, // Verde
	styles.graphic_groupBarFive, // Morado
]
const classBar = [
	styles.graphic_barOne, // Azul
	styles.graphic_barTwo, // Rojo
	styles.graphic_barThree, // Amarillo
	styles.graphic_barFour, // Verde
	styles.graphic_barFive, // Morado
]

export interface IBarRect {
	id: string
	x: number
	y: number
	width: number
	height: number
	color: string
	value: number
	name: string
	category: string
}

export interface ILine {
	id: string
	x1: number
	y1: number
	x2: number
	y2: number
	stroke: string
	strokeWidth: number
	strokeDasharray: string
}

export interface IAxisLines {
	axisX: ILine[]
	axisY: ILine[]
}

const WIDTH_CHART = 140
const HEIGHT_CHART = 65

interface Props {
	options: IOptionsChart
}

export function BarChart(props: Props) {
	const { options } = props
	const refSVG = useRef<SVGSVGElement>(null)
	const containerSVG = useRef<HTMLDivElement>(null)
	const refCHart = useRef<HTMLDivElement>(null)
	const [bars, setBars] = useState<IBarRect[][]>()
	const [axisLines, setAxisLines] = useState<IAxisLines>()
	const [updateResize, setUpdateResize] = useState(0)
	const [viewMenu, seViewMenu] = useState(false)
	const [selectSeries, setSelectSeries] = useState<null | number>(null)
	const [seriesVisibles, setSeriesVisibles] = useState<number[]>(Array.from({ length: options.series.length }, (_, index) => index))
	const [barWidthAnsPosition, setBarWidthAndPosition] = useState({ positionX: [0], widthSection: 0 })
	const [positionPopUp, setPositionPopUp] = useState({ x: 0, y: 0, active: false, data: {} as IBarRect, positionShadow: 0, widthShadow: 0 })
	const [valueMax, setValueMax] = useState(1)
	const [rangesAxis, setRangeAxis] = useState({ ranges: [0], prefix: [""] })

	// Efecto que escucha el evento de redimensionamiento de la ventana
	useEffect(() => {
		if (containerSVG && containerSVG.current) {
			const svgContainer = containerSVG.current
			const UpdateResize = () => {
				setUpdateResize(svgContainer.getBoundingClientRect().width)
			}
			window.addEventListener("resize", UpdateResize)

			return () => {
				window.removeEventListener("resize", UpdateResize)
			}
		}
	}, [])

	// Efecto para calcular el valor máximo de la grafica y las guias de los ejes X e Y
	useEffect(() => {
		const valMax = FindMaxInMatrix()
		const axisRanges = GetValuesAxisX(valMax)
		const valueMaxOfRanges = axisRanges.ranges[0]
		setRangeAxis(axisRanges)
		setValueMax(valueMaxOfRanges)
	}, [seriesVisibles])

	// Efecto para calcular la posición X de las barras
	useEffect(() => {
		calcularPosicionX(seriesVisibles)
	}, [seriesVisibles, bars])

	// Efecto que dibuja las líneas y las barras
	useEffect(() => {
		DrawLinesAndBars()
	}, [updateResize, seriesVisibles, valueMax])

	// Función para dibujar líneas y barras
	const DrawLinesAndBars = () => {
		const svg = refSVG.current

		if (svg) {
			const width = svg.clientWidth
			const height = svg.clientHeight
			const groupNumbers = options.series.length
			const itemsNumbers = options.series[0].data.length

			let LinesAxisX: ILine[] = []
			let LinesAxisY: ILine[] = []

			// Dibuja las líneas del eje X
			for (let index = 0; index < 6; index++) {
				const posYLine = (height / 5) * index

				const line: ILine = {
					id: crypto.randomUUID(),
					x1: 0,
					y1: posYLine,
					x2: width,
					y2: posYLine,
					stroke: "#FFFFFF11",
					strokeWidth: index === 5 ? 3 : 1,
					strokeDasharray: "0",
				}
				LinesAxisX.push(line)
			}
			// Dibuja las líneas del eje Y
			for (let index = 0; index < itemsNumbers + 1; index++) {
				const posXLine = (width / itemsNumbers) * index

				const line: ILine = {
					id: crypto.randomUUID(),
					x1: posXLine,
					y1: 0,
					x2: posXLine,
					y2: height,
					stroke: "#FFFFFF11",
					strokeWidth: index === 0 ? 3 : 1,
					strokeDasharray: index === 0 ? "" : "5, 5",
				}
				LinesAxisY.push(line)
			}

			setAxisLines({ axisX: LinesAxisX, axisY: LinesAxisY })

			let arrayTotalRects: IBarRect[][] = []

			// Dibuja las barras
			for (let indexOne = 0; indexOne < groupNumbers; indexOne++) {
				let arrayRects: IBarRect[] = []
				for (let index = 0; index < itemsNumbers; index++) {
					const heightBar_One = (height / 100) * ((options.series[indexOne].data[index] * 100) / valueMax)
					const posY_One = height - heightBar_One

					arrayRects.push({
						x: 0,
						y: posY_One,
						width: width / itemsNumbers / groupNumbers,
						height: heightBar_One,
						id: crypto.randomUUID(),
						color: options.fill.colors[indexOne],
						value: options.series[indexOne].data[index],
						name: options.series[indexOne].name,
						category: options.xaxis.categories[index],
					})
				}
				arrayTotalRects.push(arrayRects)
			}
			setBars(arrayTotalRects)
		}
	}

	// Función para encontrar el valor máximo en la matriz de datos
	const FindMaxInMatrix = (): number => {
		let numberArray: number[] = []

		for (let index = 0; index < options.series.length; index++) {
			if (seriesVisibles.includes(index)) {
				const number = Math.max(...options.series[index].data)
				numberArray.push(number)
			}
		}

		const max = Math.max(...numberArray)
		return max
	}

	// Función para obtener los valores y las guias del eje X
	const GetValuesAxisX = (numberMax: number) => {
		const numberDigits = numberMax.toString().length
		const multipler = parseInt("1".padEnd(numberDigits, "0"))
		const maxLimit = Math.ceil(numberMax / multipler) * multipler

		let rangesValues: number[] = []
		for (let index = 0; index < 6; index++) {
			const number = (maxLimit / 5) * index
			rangesValues.push(number)
		}

		let rangesPrefix: string[] = []

		for (let index = 0; index < 6; index++) {
			if (rangesValues[index] > 999 && rangesValues[index] < 999999) {
				const newValue = rangesValues[index] % 1000 === 1
				rangesPrefix.push(`${(rangesValues[index] / 1000).toString()}K`)
			} else if (rangesValues[index] > 999999) {
				const newValue = rangesValues[index] % 1000000 === 1
				rangesPrefix.push(`${(rangesValues[index] / 1000000).toString()}M`)
			}
		}
		const ranges = rangesValues.reverse()
		const prefix = rangesPrefix.reverse()

		return { ranges, prefix }
	}

	const HandleSelectSeries = (numberSeries: number | null) => {
		setSelectSeries(numberSeries)
	}

	const HandleSeries = (numberSeries: number) => {
		const newSeries = [...seriesVisibles]
		if (newSeries.includes(numberSeries)) {
			const index = newSeries.indexOf(numberSeries)
			newSeries.splice(index, 1)
		} else {
			newSeries.splice(numberSeries, 0, numberSeries)
		}

		setSeriesVisibles(newSeries)
	}

	const calcularPosicionX = (seriesVis: number[]) => {
		const positionX = []
		const gap = 5
		const padding = 20
		let widthSection = 0
		if (axisLines) {
			widthSection = axisLines.axisY[0].x1 + axisLines.axisY[1].x1 - padding
			const numVisibleSeries = seriesVis.filter((index) => options.series[index])

			for (let i = 0; i < options.series.length; i++) {
				if (seriesVis.includes(i)) {
					const visibleIndex = numVisibleSeries.indexOf(i)
					const position = (visibleIndex * widthSection) / numVisibleSeries.length
					positionX.push(position - gap)
				} else {
					positionX.push(-100)
				}
			}
		}
		setBarWidthAndPosition({ positionX, widthSection })
	}

	const FormattedString = (value: number) => {
		const formatted = value?.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		})
		return formatted
	}

	const HandlePositionSelect = (positionX: number, positionY: number, data: IBarRect, group: number) => {
		if (containerSVG.current) {
			const widthChart = containerSVG.current.clientWidth
			const heightChart = containerSVG.current.clientHeight
			const positionShadow = (containerSVG.current.clientWidth / options.series[0].data.length) * group
			const widthShadow = containerSVG.current.clientWidth / options.series[0].data.length
			let posX = positionX
			let posY = positionY
			if (positionX + WIDTH_CHART > widthChart) {
				posX = positionX - WIDTH_CHART
			}
			if (positionY + HEIGHT_CHART + data.height > heightChart) {
				posY = positionY - HEIGHT_CHART
			}
			if (positionY < HEIGHT_CHART) {
				posY = posY + HEIGHT_CHART
			}

			setPositionPopUp({ x: posX, y: posY, active: true, data, positionShadow: positionShadow, widthShadow })
		}
	}

	const HandleCaptureGraphicAsImage = (type: string) => {
		const divToCapture = refCHart.current // Reemplaza 'divToCapture' con el ID de tu div
		if (divToCapture) {
			html2canvas(divToCapture)
				.then((canvas) => {
					const image = canvas.toDataURL(`image/${type}`)

					// Crea un enlace de descarga
					const downloadLink = document.createElement("a")
					downloadLink.href = image
					downloadLink.download = `details_image.${type}` // Nombre del archivo
					downloadLink.click()
				})
				.catch((error) => {
					console.error("Error al capturar la imagen:", error)
				})
		}
	}

	return (
		<div className={styles.chart} ref={refCHart}>
			<div className={styles.chart_download}>
				<button className={styles.chart_downloadIcon} onClick={() => seViewMenu((prev) => !prev)} onBlur={() => seViewMenu(false)}>
					<MenuIcon />
				</button>
				<FloatingMenu isActive={viewMenu}>
					<button className={styles.chart_downloadButton} onClick={() => HandleCaptureGraphicAsImage("png")}>
						Descargar PNG
					</button>
					<button className={styles.chart_downloadButton} onClick={() => HandleCaptureGraphicAsImage("jpeg")}>
						Descargar JPEG
					</button>
				</FloatingMenu>
			</div>
			<div className={styles.chart_axisX}>
				<svg className={styles.chart_axisYSVG}>
					{axisLines?.axisX.map((line, index) => (
						<g key={line.id}>
							<line x1={43} y1={line.y1 + 32} x2={50} y2={line.y2 + 32} stroke={line.stroke} strokeWidth={2} />
							<text x={40} y={line.y1 + 32} fill="white" alignmentBaseline="central" textAnchor="end" fontSize={12} fontFamily="var(--font-montserrat)">
								{rangesAxis.prefix[index]}
							</text>
						</g>
					))}
				</svg>
				<span className={styles.chart_axisXText}>{options.yaxis.title.text}</span>
			</div>
			<div className={styles.chart_axisY}>
				<svg className={styles.chart_axisYSVG}>
					{axisLines?.axisY.map((line, index) => (
						<g key={line.id}>
							<line x1={line.x1} y1={0} x2={line.x2} y2={10} stroke={line.stroke} strokeWidth={2} />
							<text
								x={line.x1 + (axisLines.axisY[0].x1 + axisLines.axisY[1].x1) / 2}
								y={10}
								fill="white"
								alignmentBaseline="central"
								textAnchor="middle"
								fontSize={12}
							>
								{options.xaxis.categories[index]}
							</text>
						</g>
					))}
				</svg>
				<ul className={styles.chart_axisYSeries}>
					{options.series.map((serie, index) => (
						<li key={serie.name} className={`${styles.chart_axisYName}`}>
							<button
								className={`${styles.chart_axisYButton} ${!seriesVisibles.includes(index) && styles.chart_axisYButtonDisabled}`}
								onMouseEnter={() => HandleSelectSeries(index)}
								onMouseLeave={() => HandleSelectSeries(null)}
								onClick={() => HandleSeries(index)}
							>
								<CircleIcon className={styles.chart_axisYButtonCircle} color={options.fill.colors[index]} />
								{serie.name}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.container} ref={containerSVG} style={{ minHeight: options.chart.height }}>
				{positionPopUp.active && (
					<div className={styles.containerShadow} style={{ left: positionPopUp.positionShadow, width: positionPopUp.widthShadow }}></div>
				)}
				<svg className={styles.graphic} ref={refSVG}>
					<g>
						{axisLines?.axisX.map((linesX) => (
							<line
								key={linesX.id}
								x1={linesX.x1}
								y1={linesX.y1}
								x2={linesX.x2}
								y2={linesX.y2}
								stroke={linesX.stroke}
								strokeWidth={linesX.strokeWidth}
							/>
						))}
					</g>
					<g>
						{axisLines?.axisY.map((linesY) => (
							<line
								key={linesY.id}
								x1={linesY.x1}
								y1={linesY.y1}
								x2={linesY.x2}
								y2={linesY.y2}
								stroke={linesY.stroke}
								strokeWidth={linesY.strokeWidth}
								strokeDasharray={linesY.strokeDasharray}
							/>
						))}
					</g>
					<g className={styles.graphic_all}>
						{axisLines &&
							bars?.map((container, index) => (
								<g
									className={`${styles.graphic_groupBar} ${classGroupBar[index]} 
								${selectSeries !== null && selectSeries === index ? styles.graphic_groupBarActive : styles.graphic_groupBarInactive}
								${selectSeries === null && styles.graphic_groupBarNormal} ${!seriesVisibles.includes(index) && styles.graphic_groupBarDisabled}`}
									key={index}
								>
									{barWidthAnsPosition.widthSection > 0 &&
										container.map((bar, indexTwo) => (
											<rect
												key={bar.id}
												className={`${styles.graphic_bar} ${classBar[index]}`}
												x={barWidthAnsPosition?.positionX[index] + barWidthAnsPosition?.widthSection * indexTwo + 20 * indexTwo + 20}
												y={bar.y}
												width={barWidthAnsPosition?.widthSection / seriesVisibles.length - 4 || 0}
												height={bar.height}
												fill={bar.color}
												rx={1}
												ry={1}
												onMouseEnter={() =>
													HandlePositionSelect(
														barWidthAnsPosition?.positionX[index] + barWidthAnsPosition?.widthSection * indexTwo + 20 * indexTwo + 20,
														bar.y,
														bar,
														indexTwo
													)
												}
												onMouseLeave={() => setPositionPopUp({ ...positionPopUp, active: false })}
											/>
										))}
								</g>
							))}
					</g>
				</svg>
			</div>
			<div className={styles.popup}>
				<div className={`${styles.popup_dialog} ${positionPopUp.active && styles.popup_dialogActive}`}>
					<div className={`${styles.popup_window}`} style={{ left: positionPopUp.x, top: positionPopUp.y, width: WIDTH_CHART, height: HEIGHT_CHART }}>
						<div className={`${styles.popup_windowHeader}`}>
							<span className={`${styles.popup_windowTitle}`}>{positionPopUp.data.category}</span>
						</div>
						<span className={`${styles.popup_windowName}`}>
							<CircleIcon color={positionPopUp.data.color} className={`${styles.popup_windowIcon}`} /> {`${positionPopUp.data.name}:`}
						</span>
						<span className={`${styles.popup_windowValue}`}>{FormattedString(positionPopUp.data.value)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
