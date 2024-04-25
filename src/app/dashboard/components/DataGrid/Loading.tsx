import { LoadingFixedIcon } from "@/app/SVG/componentsSVG"
import styles from "./datagrid.module.scss"

export function LoadingData() {
    return (
        <div className={styles.loading}>
            <LoadingFixedIcon className={styles.loading_icon} />
            <p className={styles.loading_text} >Cargando...</p>
        </div>
    )
}