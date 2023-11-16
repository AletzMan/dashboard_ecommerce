"use client"
import { ComboBox } from "@/app/dashboard/components/ComboBox/ComboBox"
import styles from "./salescomponents.module.scss"
import { useState } from "react"

const OptionsPeriod = ["Year", "Month", "Week", "Day", "Hour"]

export function OptionsSales() {
	const [salesPeriod, setSalesPeriod] = useState("Month")
	return (
		<>
			<ComboBox options={OptionsPeriod} selectOption={salesPeriod} setSelectOption={setSalesPeriod} />
		</>
	)
}
