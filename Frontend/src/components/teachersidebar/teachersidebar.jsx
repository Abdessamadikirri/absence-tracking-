import { Link } from 'react-router-dom';
import styles from './teachersidebar.module.css';

import { Book, Users, UserPlus, Calendar, Layout } from 'lucide-react';

export default function TeacherSideBar() {
    return (
        <div className={styles.sidebar}>


            <p className={styles.p}>
                <Book className={styles.icon} />
                <Link className={styles.a} to="/admin/majors">Majors</Link>
            </p>

            <p className={styles.p}>
                <Users className={styles.icon} />
                <Link className={styles.a} to="/admin/groups">Groups</Link>
            </p>


        </div>
    );
}
