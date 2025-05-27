import { useState } from 'react'
import styles from './creategroups.module.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
export default function CreateGroup() {
    const [fromdata, setformdata] = useState({
        name: "",
        major_id: "",

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
            const res = await fetch('http://localhost:8000/api/groups',
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

            navigate('/admin/groups')
        } catch (error) {
            setError(error.message)
        }
    }
    return (

        <div className={styles.creategroup}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Create Group</h1>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" placeholder='Enter group name ' onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="code">Major code</label>
                    <select className={styles.input} id="code" name="major_id" onChange={handlefromdata}>
                        <option className={styles.option} value="">Select a major code</option>
                        <option className={styles.option} value="7">TSGE</option>
                        <option className={styles.option} value="8">TSFC</option>
                        <option className={styles.option} value="9">TDI</option>
                        <option className={styles.option} value="10">TRI</option>
                        <option className={styles.option} value="14">CU</option>

                    </select>
                </div>


                <button className={styles.button} type='submit'>Create</button>
            </form>
        </div>

    )
}
