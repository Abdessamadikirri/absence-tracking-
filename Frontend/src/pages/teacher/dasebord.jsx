import { useState, useEffect } from 'react';

import styles from './dashbord.module.css';
import Cookies from 'js-cookie';
import MiniSpinner from '../../components/minispinner/minispinner';
import { useSelector } from 'react-redux';
export default function TeacherDashboard() {
    const username = useSelector(state => state.user.user.name)
    const [absenceData, setAbsence] = useState([])

    const [time, marktime] = useState({})

    const [message, setmessage] = useState({ message: "", show: false })
    const handlsitting = (e) => {
        const { name, value } = e.target
        marktime(prestate => {
            return {
                ...prestate,
                is_allowed: false,
                is_justified: false,
                marked_by: username,
                [name]: value
            }
        })
    }

    const markStudent = (e, studentID, groupID) => {


        const absenceObject = {
            ...time,
            student_id: studentID,
            group_id: groupID,
        }

        if (e.target.checked === true) {
            setAbsence(prevstate => {
                return [...prevstate, absenceObject

                ]
            })
        } else if (e.target.checked === false) {
            const filteredData = absenceData.filter(absence => absence.student_id !== studentID)
            setAbsence(() => {
                return [
                    ...filteredData
                ]
            })
        }


    }
    useEffect(() => {
        console.log('time:', time)
    }, [time])
    useEffect(() => {
        console.log('absence data:', absenceData);
    }, [absenceData]);
    const handlesubmitAbsence = async (e) => {
        e.preventDefault()

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
            const data = await res.json();
            setmessage(prevstate => {
                return {
                    ...prevstate, message: data.message, show: true
                }
            })
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


    const handlemessage = () => {
        setmessage(prevstate => {
            return {
                ...prevstate, show: false
            }
        })
    }
    return (
        <div className={styles.maincontent}>
            <div className={styles.conatiner}>
                <div className={styles.inputs}>
                    <div className={styles.group}>
                        <label className={styles.label}>Start Time</label>
                        <select name="start_time" className={styles.select} onChange={handlsitting} value={absenceData.start_time}>
                            <option value="">Start time</option>
                            <option value="08:30">08:30</option>
                            <option value="11:00">11:00</option>
                            <option value="01:30">01:30</option>
                            <option value="04:00">16:00</option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>End Time</label>
                        <select name="end_time" className={styles.select} onChange={handlsitting} value={absenceData.end_time}>
                            <option value="">End start</option>
                            <option value="11:00">11:00</option>
                            <option value="13:30">13:30</option>
                            <option value="16:00">16:00</option>
                            <option value="18:30">18:30</option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Date</label>
                        <input type="date" className={styles.input} onChange={handlsitting} name='date' value={absenceData.date} />
                    </div>
                    <div className={`${styles.message} ${message.show ? styles.show : ''}`}>

                        {message.message}
                        <button onClick={handlemessage}>X</button>
                    </div>

                </div>

                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <label className={styles.label}>Group Name</label>
                            <select className={styles.input}

                                name="group_name"
                                onChange={handleFormData}>
                                <option value="">Group</option>
                                <option value="TSGE201">TSGE201</option>
                                <option value="TSFC201">TSFC201</option>
                                <option value="TDI201">TDI201</option>
                                <option value="TRI201">TRI201</option>
                                <option value="CU201">CU201</option>
                            </select>
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
                                <tr className={`${styles.row} ${!Boolean(is_allowed) ? styles.redRow : ''}`} key={id}>
                                    <td className={styles.td}>{name}</td>
                                    <td className={styles.td}>{national_id}</td>
                                    <td className={styles.td}>{group_name}</td>
                                    <td className={styles.td}>
                                        <input
                                            onChange={(e) => markStudent(e, id, group_id)}
                                            className={styles.chekcbox}
                                            type="checkbox"
                                        />


                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
            <button className={styles.submitButton} onClick={handlesubmitAbsence}>Submit absence</button>
        </div>
    );
}
