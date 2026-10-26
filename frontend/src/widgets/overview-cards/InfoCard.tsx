import styles from './InfoCard.module.scss';

export default function InfoCard({
    title,
    icon,
    value,
}: {
    title: string;
    icon: string;
    value: string;
}) {
    return (
        <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>{icon}</div>
            <div className={styles.infoCardValue}>{value}</div>
            <div className={styles.infoCardTitle}>{title}</div>
        </div>
    );
}
