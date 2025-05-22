import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Navbar from "../../components/header/navbar"
import Sidebar from "../../components/sidebar/sidebar"
import styles from "./adminlayouts.module.css"
export default function AdminLayouts() {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.maincontent}>
                <Sidebar />
                <div className={styles.pagecontent}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}