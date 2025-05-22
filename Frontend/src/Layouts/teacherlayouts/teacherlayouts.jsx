import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Navbar from "../../components/header/navbar"

import styles from "./teacherlayouts.module.css"

export default function TeacherLayouts() {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.maincontent}>

                
                    <Outlet />
               
            </div>
            <Footer />
        </div>
    )
}