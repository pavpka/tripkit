import { Outlet } from 'react-router';
import { SideBar } from '@/widgets/sidebar';
import styles from './RootLayout.module.scss';

export default function RootLayout() {
    return (
        <div
            className={styles.appLayout}
            style={{ display: 'flex', minHeight: '100vh' }}
        >
            <SideBar />
            <main
                style={{
                    flex: 1,
                    padding: '16px 36px 16px 28px',
                    overflow: 'auto',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}
