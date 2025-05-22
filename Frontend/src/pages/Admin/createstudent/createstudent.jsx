import { useNavigate } from 'react-router-dom'
import styles from './createstudent.module.css'
import Cookies from 'js-cookie'
import { useState } from 'react'
export default function CreateStudent() {
    const [fromdata, setformdata] = useState({
        name: "",
        emal: "",
        national_id: "",
        group_id: '',
        warning_count: 0
    })
    const [error, setError] = useState("")

    const handlefromdata = (e) => {
        const { name, value } = e.target
        setformdata(prevstate => {
            return {
                ...prevstate,
                warning_count: 0,
                [name]: value
            }
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = Cookies.get("XSRF-TOKEN")
            const res = await fetch('http://localhost:8000/api/student',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": token,
                    },
                    credentials: "include",
                    body: JSON.stringify(fromdata)
                }

            )
            if (!res.ok) {
                const errordata = await res.json()
                throw new Error(errordata.message || 'somthing went wrong')
            }

            navigate('/admin/students')
        } catch (error) {
            setError(error.message)
        }
    }

    return (

        <div className={styles.createstudent}>

            <form className={styles.form} onSubmit={handleSubmit} >
                <h1 className={styles.title}>Create Student</h1>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="name">Name</label>
                    <input className={styles.input} autoFocus type="text" id="name" name="name" placeholder='Enter student name ' onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" id="email" name="email" placeholder='Enter major Email ' onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="national">National ID</label>
                    <input className={styles.input} type="text" id="national" name="national_id" placeholder='Enter student national ID ' onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="group">Group name</label>
                    <input className={styles.input} type="text" id="group" name="group_id" placeholder='Enter student group' onChange={handlefromdata} />
                </div>
                <button className={styles.button} type='submit'>Create</button>
            </form>
        </div>

    )
}
