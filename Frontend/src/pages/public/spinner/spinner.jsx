import styles from "./spinner.module.css"
export default function Spinner() {
    return (
        <div className={styles.spinnerbox}>
            <div className={styles.spinner}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
