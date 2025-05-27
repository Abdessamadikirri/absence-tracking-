import { Search } from 'lucide-react'
import styles from './Absence.module.css'
import MiniSpinner from '../../../components/minispinner/minispinner'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
export default function Absencepage() {



    const [message, setmessage] = useState({ message: "", show: false })

    const [{ is_loading, error, absences }, setAbsence] = useState({
        absences: [],
        is_loading: true,
        error: ""
    })
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/absence", {
                    credentials: "include"
                });
                const group = await res.json();
                setAbsence(prevState => {
                    return {
                        ...prevState,
                        absences: group,
                        is_loading: false,
                        error: ""

                    }
                });
            } catch (e) {
                setAbsence(prevState => {
                    return {
                        ...prevState,
                        absences: [],
                        is_loading: false,
                        error: e.message

                    }
                });
            }
        };
        fetchdata();
    }, []);


    const handleAllow = async (AbsenceID, studentID) => {
        try {
            const token = Cookies.get('XSRF-TOKEN')
            const response = await fetch(`http://localhost:8000/api/absence/allow/${AbsenceID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": token
                },
                credentials: "include",
                body: JSON.stringify({ is_allowed: true }),
            });
            const data = await response.json();
            setmessage(prevstate => {
                return {
                    ...prevstate, message: data.message, show: true
                }
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            setAbsence(prevState => ({
                ...prevState,
                absences: prevState.absences.filter(absence => absence.student_id !== studentID)
            }));

        } catch (error) {
            console.error("Failed to allow absence:", error);

        }
    };

    const handlejustified = async (AbsenceID, studentID) => {
        try {
            const token = Cookies.get('XSRF-TOKEN')
            const response = await fetch(`http://localhost:8000/api/absence/justified/${AbsenceID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": token
                },
                credentials: "include",
                body: JSON.stringify({ is_justified: true, is_allowed: true }),
            });
            const data = await response.json();
            setmessage(prevstate => {
                return {
                    ...prevstate, message: data.message, show: true
                }
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            setAbsence(prevState => ({
                ...prevState,
                absences: prevState.absences.filter(absence => absence.student_id !== studentID)
            }));

        } catch (error) {
            console.error("Failed to allow absence:", error);

        }
    }
    const handlemessage = () => {
        setmessage(prevstate => {
            return {
                ...prevstate, show: false
            }
        })
    }
    return (
        <div className={styles.absence}>
            <div className={styles.header}>
                <div className={styles.pagetitle} >
                    <h1 className={styles.title}>Absence Management</h1>
                    <p className={styles.description}>Manage absence for each students and groups </p>
                </div>
                <div className={`${styles.message} ${message.show ? styles.show : ''}`}>

                    {message.message}
                    <button onClick={handlemessage}>X</button>
                </div>

            </div>
            <div className={styles.absencefilter}>
                {/* <div>
                    <form className={styles.searchform}><input type="text" placeholder='Search by student or group or major ' className={styles.input} /><button className={styles.button}><Search className={styles.icon} /></button></form>

                </div> */}

            </div>
            <div className={styles.absencelist}>
                {is_loading ? <MiniSpinner /> : (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Group_name</th>
                                <th className={styles.th}>Warnings</th>
                                <th className={styles.th}>Start_time</th>
                                <th className={styles.th}>End_time</th>
                                <th className={styles.th}>Date</th>

                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {absences.map(({ id, student_id, date, start_time, end_time, student }) => (
                                <tr className={`${styles.row} ${student.warning_count >= 3 ? styles.red : ''}`} key={id}>
                                    <td className={styles.td}>{student.name}</td>
                                    <td className={styles.td}>{student.group.name}</td>
                                    <td className={styles.td}>{student.warning_count}</td>
                                    <td className={styles.td}>{start_time}</td>
                                    <td className={styles.td}>{end_time}</td>
                                    <td className={styles.td}>{date}</td>
                                    <td className={styles.td}>
                                        <button onClick={() => handlejustified(id, student_id)} className={styles.buttons}>Justified</button>
                                        <button
                                            onClick={() => handleAllow(id, student_id)}
                                            className={styles.buttons}

                                        >
                                            Allow
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}