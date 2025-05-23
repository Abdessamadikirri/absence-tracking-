import { Link, NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

import { Book, Users, UserPlus, Calendar, Layout } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
    const [activelink, setactivelink] = useState("")
    const handleclick = (link) => {
        setactivelink(link)
    }
    return (
        <div className={styles.sidebar}>
            <p className={`${styles.p} ${activelink === 'dashboard' ? styles.pactive : ''}`}>
                <Layout className={`${styles.icon} ${activelink === 'dashboard' ? styles.iconactive : ''}`} />
                <NavLink onClick={() => handleclick("dashboard")}
                    to="/admin/dashboard"
                    className={`${styles.a} ${activelink === 'dashboard' ? styles.aactive : ''}`}
                >
                    Dashboard
                </NavLink>
            </p>

            <p className={`${styles.p} ${activelink === 'majors' ? styles.pactive : ''}`}>
                <Book className={`${styles.icon} ${activelink === 'majors' ? styles.iconactive : ''}`} />
                <Link
                    onClick={() => handleclick("majors")}
                    className={`${styles.a} ${activelink === 'majors' ? styles.aactive : ''}`} to="/admin/majors">Majors</Link>
            </p>

            <p className={`${styles.p} ${activelink === 'groups' ? styles.pactive : ''}`}>
                <Users className={`${styles.icon} ${activelink === 'groups' ? styles.iconactive : ''}`} />
                <Link
                    onClick={() => handleclick("groups")}
                    className={`${styles.a} ${activelink === 'groups' ? styles.aactive : ''}`} to="/admin/groups">Groups</Link>
            </p>
            <p className={`${styles.p} ${activelink === 'students' ? styles.pactive : ''}`}>
                <UserPlus className={`${styles.icon} ${activelink === 'students' ? styles.iconactive : ''}`} />
                <Link onClick={() => handleclick("students")}
                    className={`${styles.a} ${activelink === 'students' ? styles.aactive : ''}`} to="/admin/students">Student</Link>
            </p>
            <p className={`${styles.p} ${activelink === 'absence' ? styles.pactive : ''}`}>
                <Calendar className={`${styles.icon} ${activelink === 'absence' ? styles.iconactive : ''}`} />
                <Link onClick={() => handleclick("absence")}
                    className={`${styles.a} ${activelink === 'absence' ? styles.aactive : ''}`} to="/admin/absence">Absence</Link>
            </p>
        </div>
    );
}
