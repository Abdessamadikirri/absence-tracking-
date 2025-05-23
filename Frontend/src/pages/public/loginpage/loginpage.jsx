import { useEffect, useState } from 'react'
import styles from './loginpage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/action/authaction'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../spinner/spinner'

Spinner
export default function LoginPage() {
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    })

    const handleformdata = (e) => {
        const { name, value } = e.target
        setformdata(prevstate => {
            return {
                ...prevstate,
                [name]: value
            }
        })
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector(state => state.user.user.role)
    const isauth = useSelector(state => state.user.isauth)

    useEffect(() => {
        if (isauth && role === 'admin') {
            navigate('/admin')
        } else if (isauth && role === 'teacher') {
            navigate('/teacher')
        } else if (!isauth) {
            navigate('/login')
        }
    }, [isauth, role])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(login(formdata))

        } catch (error) {
            console.log('error:', error)
        }
    }
    if (isauth) return <Spinner />
    return (

        <div className={styles.login}>

            <form className={styles.form} onSubmit={handleSubmit} >
                <h1 className={styles.title}>Login in</h1>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" id="email" name="email" placeholder='Enter your Email ' value={formdata.email} onChange={handleformdata} />
                </div>
                <div className={styles.group}>
                    <label className={styles.lable} htmlFor="password">Password</label>
                    <input className={styles.input} type="password" id="password" name="password" placeholder='Enter your password ' value={formdata.password} onChange={handleformdata} />
                </div>

                <button className={styles.button} type='submit'>Login</button>
                <Link className={styles.link} to="/login">create a an account </Link>
            </form>
        </div>

    )
}
