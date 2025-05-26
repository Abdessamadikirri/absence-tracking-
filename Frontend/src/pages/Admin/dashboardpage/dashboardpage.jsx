
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import styles from './dashboardpage.module.css'
import { Book, Users, UserPlus, AlertTriangle } from 'lucide-react';
export default function AdminDashbord() {
    const data = [
        { name: 'DD201', sales: 4 },
        { name: 'AA201', sales: 2 },
        { name: 'LE202', sales: 1 },
        { name: 'MH201', sales: 6 },
        { name: 'LE201', sales: 3 },
        { name: 'GE201', sales: 5 },
        { name: 'GE201', sales: 3 },
    ];
    return (
        <div className={styles.dash}>
            <div className={styles.header}>
                <div className={styles.pagetitle} >
                    <h1 className={styles.title}>Groups Management</h1>
                    <p className={styles.description}>Manage student groups for each major</p>
                </div>

            </div>
            <div className={styles.statistics}>
                <div className={styles.data}>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>total majors<Book className={styles.icone} /> </h1>
                        <h2 className={styles.nomber}>5</h2>

                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>totale groups <Users className={styles.icone} /> </h1>
                        <h2 className={styles.nomber}>25</h2>
                        <p className={styles.description}>acroos all majors</p>
                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>totale student <UserPlus className={styles.icone} /></h1>
                        <h2 className={styles.nomber}>300</h2>
                        <p className={styles.description}>ctive enrollment</p>
                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>active Absence <AlertTriangle className={styles.icone} /></h1>
                        <h2 className={styles.nomber}>24 </h2>
                        <p className={styles.description}>8% of active student</p>
                    </div>
                </div>

            </div>
            <h1 className={styles.title}>Absence Analysis</h1>
            <div className={styles.graph}>
                <BarChart width={1000} height={300} data={data} barSize={50} >
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#11d667" />
                </BarChart>
            </div>
        </div>
    )
}