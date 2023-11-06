import { ArrowRightIcon, PointIcon } from "@/app/SVG/componentsSVG"
import Link from "next/link"
import styles from "../MenuDashboard/menudashboard.module.scss"
import { MouseEvent } from "react"
import { OptionsType } from "@/app/Types/types"
import { usePathname } from "next/navigation"

interface props {
	currentSection: boolean
	options: OptionsType
	handleActiveSections: (e: MouseEvent<HTMLButtonElement>) => void
}

export function MenuOption(props: props) {
	const pathname = usePathname()
	const sectionName = pathname.split("/")[3]
	//console.log(sectionName)
	const { currentSection, options, handleActiveSections } = props
	return (
		<>
			<button
				className={`${styles.aside__link} ${currentSection && styles.aside__linkActive}`}
				title={`go to section ${options.section}`}
				name={options.section}
				onClick={(e) => handleActiveSections(e)}
			>
				{options.icon}
				{options.section}
				{options.subSections.length > 0 && <ArrowRightIcon />}
			</button>
			<div className={`${styles.aside__linkOption} ${currentSection && styles.aside__linkOptionActive}`}>
				{options.subSections?.map((subSection) => (
					<Link
						key={subSection}
						className={`${styles.aside__sublink} ${sectionName === subSection.replaceAll(" ", "-").toLowerCase() && styles.aside__sublinkActive}`}
						href={`/dashboard/${options.section}/${subSection}`.replaceAll(" ", "-").toLowerCase()}
						title={`Go to section ${subSection}`}
					>
						<PointIcon />
						{subSection}
					</Link>
				))}
			</div>
		</>
	)
}
