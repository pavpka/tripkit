import { Link } from 'react-router';
import styles from './WelcomePage.module.scss';
import { Button } from '@/shared/ui/Button';

export default function WelcomePage() {
    return (
        <div className={styles.welcomePage}>
            <div className={styles.welcomePageHeader}>
                <img className={styles.welcomePageLogo} src='/icons/TripKit-logo.png' alt="logo" />
                <div>
                    <div className={styles.loginButton}>
                        <Button variant="secondary" type="button">
                            <Link to="/login">Войти</Link>
                        </Button>
                    </div>
                    <Button variant="primary" type="button">
                        <Link to="/register">Регистрация</Link>
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <h1>Вся поездка - <span className={styles.highlight}>в одном месте</span></h1>
                <div className={styles.description}>Маршрут по дням, бюджет, брони и список вещей. Планируйте путешествие спокойно - без десятка вкладок и заметок.</div>

                <div className={styles.buttonContainer}>
                    <Button variant="primary" type="button">
                        <Link to="/register">Начать планировать 🡢</Link>
                    </Button>
                    <div className={styles.haveAccount}>
                        <span>Уже есть аккаунт? </span>
                        <Link to="/login" className={styles.loginLink}>Войти</Link>
                    </div>
                </div>
            </div>
        </div >
    );
}