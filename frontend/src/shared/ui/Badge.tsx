import styles from './Badge.module.scss';

export function Badge({
    children,
    color,
}: {
    children: React.ReactNode;
    color: { color?: string; badgeColor?: string };
}) {
    return (
        <div
            className={styles.badge}
            style={{
                color: color.color ?? 'inherit',
                backgroundColor: color.badgeColor ?? 'inherit',
            }}
        >
            {children}
        </div>
    );
}
