import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

import { Book, Users, UserPlus, Calendar, Layout } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <p className={styles.p}>
                <Layout className={styles.icon} />
                <Link className={styles.a} to="/admin/dashboard">Dashboard</Link>
            </p>

            <p className={styles.p}>
                <Book className={styles.icon} />
                <Link className={styles.a} to="/admin/majors">Majors</Link>
            </p>

            <p className={styles.p}>
                <Users className={styles.icon} />
                <Link className={styles.a} to="/admin/groups">Groups</Link>
            </p>
            <p className={styles.p}>
                <UserPlus className={styles.icon} />
                <Link className={styles.a} to="/admin/students">Student</Link>
            </p>
            <p className={styles.p}>
                <Calendar className={styles.icon} />
                <a className={styles.a} to="/admin/absence">Absence</a>
            </p>
        </div>
    );
}
