import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Navbar from "../../components/header/navbar"

import styles from "./publiclayouts.module.css"
export default function PublicLayouts() {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.maincontent}>

                <div className={styles.pagecontent}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}