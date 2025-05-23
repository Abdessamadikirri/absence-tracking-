import { Link, replace, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css'
import { LogOut, LogIn } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/action/authaction';

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logtout = async () => {
        try {
            await dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log('error:', error)
        }
    }
    const isauth = useSelector(state => state.user.isauth)
    const userName = useSelector(state => state.user.user.name)
    return (
        <div className={styles.navbar}>
            <div className={styles.title}>
                Absence-tracker
            </div>
            <div className={styles.navlink}>
                {isauth ? (
                    <>
                        <p className={styles.profile}>
                            {userName}
                        </p>
                        <button className={styles.button} onClick={logtout}>
                            <LogOut className={styles.icon} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.button}>
                            <LogIn className={styles.icon} /> Login
                        </Link>
                        <Link to="/signup" className={styles.button}>
                            Signup
                        </Link>
                    </>
                )}

            </div>
        </div>
    )
}