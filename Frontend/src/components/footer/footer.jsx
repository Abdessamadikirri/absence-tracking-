import styles from './footer.module.css'
export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.p}>&copy; 2025 Absence-tracker. All rights reserved.</p>
                <p className={styles.footerLinks} >
                    <a href="/privacy-policy">Privacy Policy</a> |
                    <a href="/terms">Terms of Service</a> |
                    <a href="/contact">Contact Us</a>
                </p>
            </div>
        </div>
    )
}