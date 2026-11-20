import { Outlet } from 'react-router';
import { SideBar } from '@/widgets/sidebar';
import styles from './RootLayout.module.scss';
import { useSession } from '@/entities/session';

export default function RootLayout() {
    const { isAuthenticated } = useSession();

    return (
        <div className={styles.appLayout} style={{ display: 'flex', minHeight: '100vh' }}>
            {isAuthenticated && <SideBar />}
            <main style={{ flex: 1, padding: '16px 36px 16px 28px', overflow: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
}
