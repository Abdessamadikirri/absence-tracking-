import styles from './footer.module.css'
export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.p}>&copy; 2025 Absence-tracker. All rights reserved.</p>
                <button className={styles.button}>Explore</button>
            </div>
        </div>
    )
}