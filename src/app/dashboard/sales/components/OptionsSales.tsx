"use client"
import { ComboBox } from "@/app/dashboard/components/ComboBox/ComboBox"
import styles from "./salescomponents.module.scss"
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@/app/dashboard/components/Button/Button"
import { ArrowIcon, ArrowLeftIcon, ArrowRightIcon } from "@/app/SVG/componentsSVG"
import { useRouter, useSearchParams } from "next/navigation"

const OptionsPeriod = [["Year", "Year"], ["Month", "Month"], ["Week", "Week"], ["Day", "Day"]]

interface Props {
	firstYear: number
	lastYear: number
}

export function OptionsSales(props: Props) {
	const { firstYear, lastYear } = props
	const params = useSearchParams()
	const period = params.get("period") || ""
	const year = params.get("year") || ""
	const route = useRouter()
	const [salesPeriod, setSalesPeriod] = useState(period)
	const [salesYear, setSalesYear] = useState(parseInt(year))
	const [text, setText] = useState(year)

	useEffect(() => {
		route.push(`/dashboard/sales?period=${salesPeriod}&year=${salesYear}`)
		setText(salesYear.toString())
	}, [salesPeriod, salesYear])

	const HandleChangeYear = (asign: "+" | "-") => {
		if (asign === "+") {
			setSalesYear((prev) => prev + 1)
		} else {
			setSalesYear((prev) => prev - 1)
		}
	}

	const HandleChangePerdiod = (e: string) => {
		setSalesPeriod(e)
	}

	//console.log(year)

	return (
		<header className={styles.header}>
			<div className={styles.header_buttons}>
				<Button
					className={styles.header_button}
					title={`See previous ${salesPeriod}`}
					buttonProps={{
						onClick: () => HandleChangeYear("-"),
						type: "button",
						text: "",
						iconButton: <ArrowLeftIcon />,
						disabled: !(parseInt(year) > firstYear),
					}}
				/>
				<ComboBox options={OptionsPeriod} value={salesPeriod} onValueChange={() => HandleChangePerdiod} name="period" />
				<Button
					className={styles.header_button}
					title={`See next ${salesPeriod}`}
					buttonProps={{
						onClick: () => HandleChangeYear("+"),
						type: "button",
						text: "",
						iconButton: <ArrowRightIcon />,
						disabled: parseInt(year) >= lastYear,
					}}
				/>
			</div>
			<span className={styles.header_year}> {text}</span>
		</header>
	)
}
