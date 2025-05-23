import { useState } from 'react'
import styles from './singuppage.module.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/action/authaction'
export default function SingupPage() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        role: "teacher",
        password: "",
        password_confirmation: ""

    })

    const handlefromdata = (e) => {
        const { name, value } = e.target
        setformdata(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formdata))

        } catch (error) {
            console.log('error:', error)
        }
    }
    return (

        <div className={styles.singup}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Sing up</h1>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="name">Name</label>
                    <input className={styles.input} autoFocus type="text" id="name" name="name" placeholder='Enter student name ' value={formdata.name} onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" id="email" name="email" placeholder='Enter major Email ' value={formdata.email} onChange={handlefromdata} />
                </div>

                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="password">Password</label>
                    <input className={styles.input} type="password" id="password" name="password" placeholder='Enter your password ' value={formdata.password} onChange={handlefromdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="confirme-password">Confirm Password</label>
                    <input className={styles.input} type="password" id="confirme-password" name="password_confirmation" placeholder='Confirm your password ' value={formdata.password_confirmation} onChange={handlefromdata} />
                </div>


                <button className={styles.button} type='submit'>Sing up</button>
                <Link className={styles.link} to="/login">already have an account</Link>
            </form>
        </div>

    )
}
