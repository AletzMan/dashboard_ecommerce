import { ArrowRightIcon, PointIcon } from "@/app/SVG/componentsSVG"
import Link from "next/link"
import styles from "../MenuDashboard/menudashboard.module.scss"
import { MouseEvent } from "react"
import { OptionsType } from "@/app/Types/types"
import { usePathname } from "next/navigation"
import { useViewMenu } from "@/app/utils/store"

interface props {
	options: OptionsType
	handleActiveSections: (e: MouseEvent<HTMLButtonElement>) => void
}

export function MenuOption(props: props) {
	const { setViewMenuDashboard } = useViewMenu()
	const pathname = usePathname()
	const sectionName = pathname.split("/")[2]
	const subSectionName = pathname.split("/")[3]

	const { options, handleActiveSections } = props

	const HandleViewMenuDashboard = () => {
		setViewMenuDashboard(false)
	}

	return (
		<>
			<button
				className={`${styles.aside__link} ${options.section === sectionName && styles.aside__linkActive}`}
				title={`go to section ${options.section}`}
				name={options.section}
				onClick={(e) => handleActiveSections(e)}
			>
				{options.icon}
				{options.section}
				{options?.subSections && options?.subSections?.length > 0 && <ArrowRightIcon />}
			</button>
			{options.subSections && options.section === sectionName && (
				<div className={`${styles.aside__linkOption} ${options.section === sectionName && styles.aside__linkOptionActive}`}>
					{options.subSections?.map((subSection, index) => (
						<Link
							key={subSection}
							className={`${styles.aside__sublink} ${subSectionName === subSection.replaceAll(" ", "-").toLowerCase() && styles.aside__sublinkActive}`}
							href={`/dashboard/${options.section.toLowerCase()}/${subSection.toLowerCase()}`.replaceAll(" ", "-") + options.linksSubsection[index]}
							title={`Go to section ${subSection}`}
							onClick={HandleViewMenuDashboard}
						>
							<PointIcon />
							{subSection}
						</Link>
					))}
				</div>
			)}
		</>
	)
}
