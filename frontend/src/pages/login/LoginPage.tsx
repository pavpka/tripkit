import styles from './LoginPage.module.scss';
import { Link } from 'react-router';
import { LoginForm } from '@/features/auth/login';

export default function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginLeftContainer}>
                <img className={styles.loginPageLogo} src='/icons/TripKit-logo.png' alt="logo" />
                <div className={styles.loginLeftContainerContent}>
                    <div className={styles.loginLeftHeading}>
                        <h1>C возвращением</h1>
                        <div className={styles.loginLeftDesc}>Войдите, чтобы открыть свои поездки.</div>
                    </div>
                    <LoginForm />
                    <div className={styles.loginLeftNoAccount}>Нет аккаунта? <Link className={styles.loginLink} to="/register">Зарегистрироваться</Link></div>
                </div>
            </div>
            <div>
                ...
            </div>
        </div>
    );
}