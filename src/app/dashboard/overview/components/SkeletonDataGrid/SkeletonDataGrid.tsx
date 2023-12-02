import styles from "./skeletondata.module.scss"

export function SkeletonDataGrid() {
    return (
        <div className={styles.skeleton}>

            <div className={styles.skeleton_title}></div>
            <div className={styles.skeleton_row}></div>
            <div className={styles.skeleton_row}></div>
            <div className={styles.skeleton_row}></div>
            <div className={styles.skeleton_row}></div>
            <div className={styles.skeleton_row}></div>
            <div className={styles.skeleton_description}>
                <div className={styles.skeleton_page}></div>
                <div className={styles.skeleton_page}></div>
                <div className={styles.skeleton_page}></div>
                <div className={styles.skeleton_page}></div>
                <div className={styles.skeleton_page}></div>
                <div className={styles.skeleton_page}></div>
            </div>

        </div>
    )
}