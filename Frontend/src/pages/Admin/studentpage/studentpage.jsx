import { Link } from 'react-router-dom'
import styles from './studentpage.module.css'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Trash2, Pen } from 'lucide-react';
import MiniSpinner from '../../../components/minispinner/minispinner';
export default function StudentPage() {
    const [{ is_loading, students, error }, setstudents] = useState({
        is_loading: true,
        students: [],
        error: ""
    });

    const [{ is_deleting, delete_error }, setDelState] = useState({
        is_deleting: false,
        delete_error: ""
    });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/student", {
                    credentials: "include"
                });
                const student = await res.json();
                setstudents(prevState => {
                    return {
                        ...prevState,
                        students: student,
                        is_loading: false,
                        error: ""

                    }
                });
            } catch (e) {
                setstudents(prevState => {
                    return {
                        ...prevState,
                        students: [],
                        is_loading: false,
                        error: e.message

                    }
                });
            }
        };
        fetchdata();
    }, []);
    const deleteStudent = async (studentId) => {
        setDelState(prevState => {
            return {
                ...prevState,

                is_deleting: true,
                delete_error: ""

            }
        });

        try {
            const token = Cookies.get("XSRF-TOKEN");
            const res = await fetch(`http://localhost:8000/api/student/${studentId}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": token,
                },
                credentials: "include",
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Something went wrong');
            }

            setstudents(prevState => ({
                ...prevState,
                students: prevState.students.filter(student => student.id !== studentId)
            }));

            setDelState({
                is_deleting: false,
                delete_error: ""
            });
        } catch (error) {
            setDelState({
                is_deleting: false,
                delete_error: error.message
            });
        }
    };
    return (
        <div className={styles.student}>
            <div className={styles.header}>
                <div className={styles.pagetitle} >
                    <h1 className={styles.title}>Students Management</h1>
                    <p className={styles.description}>Manage students and track their attendance</p>
                </div>
                <button className={styles.button}><Plus className={styles.icon} /><Link className={styles.a} to="/admin/createstudent">Add Student</Link></button>
            </div>
            <div className={styles.studentlist}>
                {is_loading ? <MiniSpinner /> : (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>National_id</th>
                                <th className={styles.th}>Group_name</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(({ id, name, national_id, group_name }) => (
                                <tr className={styles.row} key={id}>
                                    <td className={styles.td}>{name}</td>
                                    <td className={styles.td}>{national_id}</td>
                                    <td className={styles.td}>{group_name}</td>
                                    <td className={styles.td}>
                                        <button className={styles.btn}><Pen className={styles.icone} /></button>
                                        <button
                                            onClick={() => deleteStudent(id)}
                                            className={styles.btn}
                                            disabled={is_deleting}
                                        >
                                            <Trash2 className={styles.icone} />
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