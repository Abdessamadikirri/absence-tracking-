
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import styles from './dashboardpage.module.css'
import { Book, Users, UserPlus, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminDashbord() {
    const [dashdata, setdata] = useState({

        is_loading: true
    })


    useEffect(() => {
        const handlefetch = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dashboard', {
                    credentials: 'include'
                })
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'something want wrong ')
                }
                const data = await response.json();
                console.log(data)
                setdata(prevstate => {
                    return {
                        ...prevstate,
                        students: data.totalstudent,
                        majors: data.totalemajors,
                        groups: data.totalgroups,
                        absences: data.totalabsence,
                        graphdata: data.graphdata,
                        is_loading: false

                    }
                })



            } catch (error) {
                console.log('error', error.message)
                setdata(prevstate => {
                    return {
                        ...prevstate,

                        is_loading: false

                    }
                })
            }
        }
        handlefetch();
    }, [])
    useEffect(() => {
        console.log(dashdata)
    }, [dashdata])
    const data = dashdata.graphdata?.map(item => ({
        name: item.group_name,
        absence: item.total_absences
    })) || [];

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
                        <h2 className={styles.nomber}>{dashdata.majors}</h2>

                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>totale groups <Users className={styles.icone} /> </h1>
                        <h2 className={styles.nomber}>{dashdata.groups}</h2>
                        <p className={styles.description}>acroos all majors</p>
                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>totale student <UserPlus className={styles.icone} /></h1>
                        <h2 className={styles.nomber}>{dashdata.students}</h2>

                        <p className={styles.description}>ctive enrollment</p>
                    </div>
                    <div className={styles.box}>
                        <h1 className={styles.carttitle}>active Absence <AlertTriangle className={styles.icone} /></h1>
                        <h2 className={styles.nomber}>{dashdata.absences} </h2>
                        <p className={styles.description}>session of active Absence</p>
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
                    <Bar dataKey="absence" fill="#11d667" />
                </BarChart>
            </div>
        </div>
    )
}