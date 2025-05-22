import { useState } from 'react';
import { Square, SquareCheck } from 'lucide-react';
import styles from './dashbord.module.css';
import Cookies from 'js-cookie';
import MiniSpinner from '../../components/minispinner/minispinner';
export default function TeacherDashboard() {

    const [absenceData, setAbsence] = useState({
        'student_id': "",
        'group_id': "",
        'date': "",
        'start_time': "",
        'end_time': "",
        'marked_by': "",
        'is_allowed': false,
        'is_justified': false
    })

    const handleAbsence = (e) => {
        const { name, value } = e.target
        setAbsence(prevstate => {
            return {
                ...prevstate,
                [name]: value
            }
        })
    }
    const handlesubmitAbsence = async (e, studentID, groupID) => {
        e.preventDefault()
        setAbsence(prevstate => {
            return {
                ...prevstate,
                group_id: groupID,
                student_id: studentID

            }
        })
        try {
            const token = Cookies.get("XSRF-TOKEN")
            const res = await fetch('http://localhost:8000/api/absence',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": token,
                    },
                    credentials: "include",
                    body: JSON.stringify(absenceData)
                }

            )
            if (!res.ok) {
                const errordata = await res.json()
                throw new Error(errordata.message || 'somthing went wrong')
            }

        } catch (error) {
            console.log('error', error.message)
        }
    }






    // this function for fetching sutdent based on the group
    const [formData, setFormData] = useState({ group_name: "" });
    const [{ is_loading, students }, setStudents] = useState({
        is_loading: false,
        students: [],
        error: ""
    });

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStudents(prevstate => {
            return {
                ...prevstate,
                is_loading: true

            }
        })
        try {
            const response = await fetch(
                `http://localhost:8000/api/student/by-group?group_name=${encodeURIComponent(formData.group_name)}`,
                {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },

                }
            );

            const data = await response.json();
            setStudents(prvstate => {
                return {
                    ...prvstate,
                    is_loading: false,
                    students: data
                }
            });
            console.log(data);
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents(prevstate => {
                return {
                    ...prevstate,
                    is_loading: false,
                    error: error.message
                }
            })
        }
    };



    return (
        <div className={styles.maincontent}>
            <div className={styles.conatiner}>
                <div className={styles.inputs}>
                    <div className={styles.group}>
                        <label className={styles.label}>Start Time</label>
                        <select name="start_time" className={styles.select} onChange={handleAbsence} value={absenceData.start_time}>
                            <option value="08:30">08:30</option>
                            <option value="11:00">11:00</option>
                            <option value="01:30">01:30</option>
                            <option value="04:00">16:00</option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>End Time</label>
                        <select name="end_time" className={styles.select} onChange={handleAbsence} value={absenceData.end_time}>
                            <option value="11:00">11:00</option>
                            <option value="13:30">13:30</option>
                            <option value="16:00">16:00</option>
                            <option value="18:30">18:30</option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Date</label>
                        <input type="date" className={styles.input} onChange={handleAbsence} name='date' value={absenceData.date} />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Marked_by</label>
                        <input type="text" className={styles.input} onChange={handleAbsence} name='marked_by' value={absenceData.marked_by} />
                    </div>
                </div>

                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <label className={styles.label}>Group Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Group"
                                name="group_name"
                                value={formData.group_name}
                                onChange={handleFormData}
                            />
                        </div>
                        <button className={styles.button} type="submit">Start Session</button>
                    </form>
                </div>


            </div>
            <div className={styles.studentlist}>
                {is_loading ? <MiniSpinner /> : (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>National_id</th>
                                <th className={styles.th}>Group_name</th>
                                <th className={styles.th}>Absences</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(({ id, name, national_id, group_name, group_id, is_allowed }) => (
                                <tr className={styles.row} key={id}>
                                    <td className={styles.td}>{name}</td>
                                    <td className={styles.td}>{national_id}</td>
                                    <td className={styles.td}>{group_name}</td>
                                    <td className={styles.td}>
                                        <button onClick={(e) => handlesubmitAbsence(e, id, group_id)} className={styles.btn}><SquareCheck className={styles.icone} /></button>
                                        {/* <button
                                            onClick={() => deleteStudent(id)}
                                            className={styles.btn}

                                        >
                                            <Square className={styles.icone} />
                                        </button> */}
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
