import axios from "axios"
import styles from "./marketingcomp.module.scss"
import { ISocialMedia } from "@/app/utils/mockdata"
import { FacebookIcon, InstagramIcon, TikTokIcon, TwitterIcon, YoutubeIcon } from "@/app/SVG/componentsSVG"
import { URL_API_LOCAL } from "@/app/Constants/constants"

interface Props {
	name: "Facebook" | "Twitter" | "Instagram" | "YouTube" | "TikTok"
}

export async function CardSocialMediaStatistics(props: Props) {
	const { name } = props

	const statistics = await GetSocialMediaStatistics(name)

	const selectIcon = () => {
		if (name === "Facebook") return <FacebookIcon className={`${styles.card_icon} ${styles.card_iconFacebook}`} />
		if (name === "Twitter") return <TwitterIcon className={`${styles.card_icon} ${styles.card_iconTwitter}`} />
		if (name === "Instagram") return <InstagramIcon className={`${styles.card_icon} ${styles.card_iconInstagram}`} />
		if (name === "YouTube") return <YoutubeIcon className={`${styles.card_icon} ${styles.card_iconYoutube}`} />
		if (name === "TikTok") return <TikTokIcon className={`${styles.card_icon} ${styles.card_iconTiktok}`} />
		else return <p></p>
	}

	return (
		<article className={styles.card}>
			<h3 className={styles.card_name}>{statistics?.name}</h3>
			{selectIcon()}
			<div className={styles.card_data}>
				<p className={styles.card_option}>
					{`${statistics?.likes} `}
					<span className={styles.card_text}>likes</span>
				</p>
				<p className={styles.card_option}>
					{`${statistics?.comments} `}
					<span className={styles.card_text}>comments</span>
				</p>
				<p className={styles.card_option}>
					{`${statistics?.shares} `}
					<span className={styles.card_text}>shares</span>
				</p>
				<p className={styles.card_option}>
					{`${statistics?.followers} `}
					<span className={styles.card_text}>followers</span>
				</p>
				<p className={styles.card_option}>
					{`${statistics?.posts} `}
					<span className={styles.card_text}>following</span>
				</p>
			</div>
		</article>
	)
}

const GetSocialMediaStatistics = async (name: string) => {

	try {
		const response = await axios.get(`${URL_API_LOCAL}socialmedia/interactions?socialmedia=${name}`)

		const statistics = response.data.statistics as ISocialMedia
		return statistics
	} catch (error) {
		console.error(error)
		return null
	}
}
