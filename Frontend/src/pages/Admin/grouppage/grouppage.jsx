import { Link } from 'react-router-dom'
import styles from './grouppage.module.css'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react';
import MiniSpinner from '../../../components/minispinner/minispinner';
import { Trash2, Pen } from 'lucide-react';
import Cookies from 'js-cookie';
export default function GroupPage() {
    const [{ is_loading, groups, error }, setgroups] = useState({
        is_loading: true,
        groups: [],
        error: ""
    });

    const [{ is_deleting, delete_error }, setDelState] = useState({
        is_deleting: false,
        delete_error: ""
    });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/groups", {
                    credentials: "include"
                });
                const group = await res.json();
                setgroups(prevState => {
                    return {
                        ...prevState,
                        groups: group,
                        is_loading: false,
                        error: ""

                    }
                });
            } catch (e) {
                setgroups(prevState => {
                    return {
                        ...prevState,
                        groups: [],
                        is_loading: false,
                        error: e.message

                    }
                });
            }
        };
        fetchdata();
    }, []);
    const deleteGroupe = async (groupId) => {
        setDelState(prevState => {
            return {
                ...prevState,

                is_deleting: true,
                delete_error: ""

            }
        });

        try {
            const token = Cookies.get("XSRF-TOKEN");
            const res = await fetch(`http://localhost:8000/api/groups/${groupId}`, {
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

            setgroups(prevState => ({
                ...prevState,
                groups: prevState.groups.filter(group => group.id !== groupId)
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
    console.log(groups)
    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <div className={styles.pagetitle} >
                    <h1 className={styles.title}>Groups Management</h1>
                    <p className={styles.description}>Manage student groups for each major</p>
                </div>
                <button className={styles.button}><Plus className={styles.icon} /><Link className={styles.a} to="/admin/creategroup">Add Group</Link></button>
            </div>
            <div className={styles.grouplist}>
                {is_loading ? <MiniSpinner /> : (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Major_name</th>

                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(({ id, name, major_name }) => (
                                <tr className={styles.row} key={id}>
                                    <td className={styles.td}>{name}</td>
                                    <td className={styles.td}>{major_name}</td>

                                    <td className={styles.td}>
                                        <button className={styles.btn}><Pen className={styles.icone} /></button>
                                        <button
                                            onClick={() => deleteGroupe(id)}
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