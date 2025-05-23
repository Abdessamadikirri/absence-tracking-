import { Link } from 'react-router-dom'
import styles from './dashboardpage.module.css'

export default function AdminDashbord() {

    return (
        <div className={styles.dash}>
            <div className={styles.header}>
                <div className={styles.pagetitle} >
                    <h1 className={styles.title}>Groups Management</h1>
                    <p className={styles.description}>Manage student groups for each major</p>
                </div>

            </div>
            <div className={styles.statistics}>

            </div>
        </div>
    )
}