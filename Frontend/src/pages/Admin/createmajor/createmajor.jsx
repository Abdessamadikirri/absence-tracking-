import { useState } from 'react'
import styles from './createmajor.module.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
export default function CreateMajor() {
    const [fromdata, setformdata] = useState({
        name: "",
        code: "",
        level: ""
    })
    const [error, setError] = useState("")

    const handlefromdata = (e) => {
        const { name, value } = e.target
        setformdata(prevstate => {
            return {
                ...prevstate,
                [name]: value
            }
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = Cookies.get("XSRF-TOKEN")
            const res = await fetch('http://localhost:8000/api/majors',
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

            navigate('/admin/majors')
        } catch (error) {
            setError(error.message)
        }
    }


    return (

        <div className={styles.createmajor}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Create Major</h1>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" placeholder='Enter major name ' value={fromdata.name} onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="code">Code</label>
                    <input className={styles.input} type="text" id="code" name="code" placeholder='Enter major code ' value={fromdata.code} onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="level">Level</label>
                    <input className={styles.input} type="text" id="level" name="level" placeholder='Enter major level ' value={fromdata.level} onChange={handlefromdata} />
                </div>
                <button className={styles.button} type='submit'>Create</button>
            </form>
        </div>

    )
}
