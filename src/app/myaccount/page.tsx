"use client"
import { getServerSession } from 'next-auth'
import { EditIcon, Logo } from '../SVG/componentsSVG'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import styles from './account.module.scss'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function MyAccountPage() {
    const { data: session } = useSession()
    return (
        <section className={styles.myAccountPage}>
            <HeaderHome title='My Account' />
            <section className={styles.content}>
                <div className={styles.image}>
                    <picture className={styles.picture}>
                        <Image className={styles.picture_img} src={session?.user?.image || "/user_icon.png"} alt={session?.user?.name || "User"} width={120} height={120} />
                    </picture>
                    <button className={styles.picture_button}>
                        <EditIcon />
                    </button>
                </div>
                <span>{session?.user?.name}</span>
                <span>{session?.user?.email}</span>
            </section>
        </section>
    )
}
