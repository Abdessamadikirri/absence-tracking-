import { Link } from 'react-router-dom';
import styles from './majorpage.module.css';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import MiniSpinner from '../../../components/minispinner/minispinner';
import { Trash2, Pen } from 'lucide-react';
import Cookies from 'js-cookie';

export default function MajorPage() {
    const [{ is_loading, majors, error }, setMajors] = useState({
        is_loading: true,
        majors: [],
        error: ""
    });

    const [{ is_deleting, delete_error }, setDelState] = useState({
        is_deleting: false,
        delete_error: ""
    });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/majors", {
                    credentials: "include"
                });
                const major = await res.json();
                setMajors(prevState => {
                    return {
                        ...prevState,
                        majors: major,
                        is_loading: false,
                        error: ""

                    }
                });
            } catch (e) {
                setMajors(prevState => {
                    return {
                        ...prevState,
                        majors: [],
                        is_loading: false,
                        error: e.message

                    }
                });
            }
        };
        fetchdata();
    }, []);

    const deleteMajor = async (majorId) => {
        setDelState(prevState => {
            return {
                ...prevState,

                is_deleting: true,
                delete_error: ""

            }
        });

        try {
            const token = Cookies.get("XSRF-TOKEN");
            const res = await fetch(`http://localhost:8000/api/majors/${majorId}`, {
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

            setMajors(prevState => ({
                ...prevState,
                majors: prevState.majors.filter(major => major.id !== majorId)
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
        <div className={styles.major}>
            <div className={styles.header}>
                <div className={styles.pagetitle}>
                    <h1 className={styles.title}>Majors Management</h1>
                    <p className={styles.description}>Manage academic majors and their groups</p>
                </div>
                <button className={styles.button}>
                    <Plus className={styles.icon} />
                    <Link className={styles.a} to="/admin/createmajor">Add Major</Link>
                </button>
            </div>
            <div className={styles.majorlist}>
                {is_loading ? <MiniSpinner /> : (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Code</th>
                                <th className={styles.th}>Level</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {majors.map(({ id, name, code, level }) => (
                                <tr className={styles.row} key={id}>
                                    <td className={styles.td}>{name}</td>
                                    <td className={styles.td}>{code}</td>
                                    <td className={styles.td}>{level}</td>
                                    <td className={styles.td}>
                                        <button className={styles.btn}><Pen className={styles.icone} /></button>
                                        <button
                                            onClick={() => deleteMajor(id)}
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
    );
}