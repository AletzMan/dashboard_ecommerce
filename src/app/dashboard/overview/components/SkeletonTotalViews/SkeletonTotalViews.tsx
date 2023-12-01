import styles from "./skeleton.module.scss"

export function SkeletonTotalViews() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeleton_first}>
                <div className={styles.skeleton_title}></div>
                <div className={styles.skeleton_type}></div>
                <div className={styles.skeleton_description}></div>
            </div>
            <div className={styles.skeleton_icon}></div>
        </div>
    )
}