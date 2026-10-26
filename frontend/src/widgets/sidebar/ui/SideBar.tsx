import { NavLink } from 'react-router';
import styles from './SideBar.module.scss';

export function SideBar() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${styles.tabButton} ${styles.activeTabButton}`
            : styles.tabButton;

    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.appTitle}>TripKit</h1>
            <nav className={styles.nav}>
                <NavLink to="/" className={linkClass}>
                    <img
                        src="/icons/shared/home.svg"
                        alt="dashbord"
                        className={styles.icon}
                    />
                    Главная
                </NavLink>
                <NavLink to="/trips" className={linkClass}>
                    <img
                        src="/icons/shared/map.svg"
                        alt="dashbord"
                        className={styles.icon}
                    />
                    Поездки
                </NavLink>
                <NavLink to="/settings" className={linkClass}>
                    <img
                        src="/icons/shared/settings.svg"
                        alt="dashbord"
                        className={styles.icon}
                    />
                    Настройки
                </NavLink>
            </nav>
            <div style={{ position: 'absolute', bottom: '20px' }}>
                <h5>Ближайшая поездка:</h5>
            </div>
        </aside>
    );
}
