import { NavLink } from 'react-router';
import styles from './TabButton.module.scss';
import { Badge } from '@/shared/ui/Badge';

export function TabButton({
    to,
    icon,
    children,
    badge,
}: {
    to: string;
    icon: string;
    children: React.ReactNode;
    badge?: string;
}) {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${styles.tabButton} ${styles.activeTabButton}`
            : styles.tabButton;

    return (
        <NavLink to={to} className={linkClass}>
            {({ isActive }) => (
                <>
                    {icon && <img src={icon} alt="" className={styles.icon} />}
                    <span>{children}</span>
                    {badge && (
                        <Badge
                            color={{
                                badgeColor: isActive ? '#fff' : '#f4efe9',
                            }}
                        >
                            {badge}
                        </Badge>
                    )}
                </>
            )}
        </NavLink>
    );
}
