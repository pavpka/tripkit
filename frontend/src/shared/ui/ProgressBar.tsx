import styles from './ProgressBar.module.scss';

export function ProgressBar({
    progress,
    tone,
}: {
    progress: number;
    tone: 'unset' | 'ok' | 'warning' | 'over';
}) {
    return (
        <div className={styles.progressBar}>
            <div
                className={`${styles.progressBarFill} ${styles[tone]}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
