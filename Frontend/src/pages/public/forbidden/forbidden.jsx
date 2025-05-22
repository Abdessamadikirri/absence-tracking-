import { Link } from "react-router-dom";
import styles from "./forbidden.module.css"

export default function Formbiden() {
    return (
        <div className={styles.forbiddenpage}>
            <div className={styles.forbidden}>
                Formbiden
            </div>
            <Link to="/">return</Link>
        </div>
    );
}