"use client"
import { TextField } from "@/app/dashboard/components/TextField/TextField"
import styles from "./salescomponents.module.scss"
import { IAllTimePeriod, TextFieldType } from "@/app/Types/types"
import { useState } from "react"
import { IMonthlySales } from "@/app/utils/mockdata"
import { FormattedString } from "@/app/utils/functions"

interface Props {
	currentData: IMonthlySales | undefined
	allTimeData: IAllTimePeriod | undefined
}

export function DescriptionSales(props: Props) {
	const { currentData, allTimeData } = props
	const [currentSales, setCurrentSales] = useState({ month: "March", sales: 32545 })
	const [allTimeSales, setAllTimeSales] = useState({ month: "December", sales: 45654 })

	console.log(currentData)

	const HandleChangeCurrent = () => { }

	return (
		<div className={styles.description}>
			<h3 className={styles.description_title}>{`Month with Highest Sales`}</h3>
			<div className={styles.description_inputs}>
				<div className={styles.description_inputsGroup}>
					<h4 className={styles.description_inputsTitle}>{`Current ${new Date().getFullYear()}`}</h4>
					<TextField
						className={styles.header_field}
						textFieldProps={{
							label: "Month",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: currentData?.month,
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
					<TextField
						className={`${styles.header_field} ${styles.header_fieldAmount}`}
						textFieldProps={{
							label: "Amount",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: FormattedString(currentData?.salesAmount || 0),
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
					<TextField
						className={`${styles.header_field} ${styles.header_fieldSales}`}
						textFieldProps={{
							label: "Sales",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: currentData?.sales.toString() || "0",
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
				</div>
				<div className={styles.description_inputsGroup}>
					<h4 className={styles.description_inputsTitle}>{`All-Time ${allTimeData?.year}`}</h4>
					<TextField
						className={styles.header_field}
						textFieldProps={{
							label: "Month",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: allTimeData?.period.period || "0",
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
					<TextField
						className={`${styles.header_field} ${styles.header_fieldAmount}`}
						textFieldProps={{
							label: "Amount",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: FormattedString(allTimeData?.period.salesAmount || 0),
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
					<TextField
						className={`${styles.header_field} ${styles.header_fieldSales}`}
						textFieldProps={{
							label: "Sales",
							name: "",
							error: "",
							placeholder: "",
							type: TextFieldType.Text,
							value: allTimeData?.period.sales.toString() || "0",
							onChange: () => HandleChangeCurrent,
							disabled: true,
						}}
					/>
				</div>
			</div>
		</div>
	)
}
