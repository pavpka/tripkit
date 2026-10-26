import styles from './StatusBar.module.scss';

const STEPS = [
    { step: 1, title: 'Идея' },
    { step: 2, title: 'Планирование' },
    { step: 3, title: 'Забронировано' },
    { step: 4, title: 'В пути' },
    { step: 5, title: 'Завершена' },
] as const;

const LAST_STEP = STEPS[STEPS.length - 1].step;

export function StatusBar({ step }: { step: number }) {
    return (
        <div className={styles.statusBar}>
            <div className={styles.statusBarItems}>
                {STEPS.map((item) => {
                    const isDone =
                        step > item.step ||
                        (step === item.step && step === LAST_STEP);

                    return (
                        <div
                            key={item.step}
                            className={styles.statusBarItemContainer}
                        >
                            <div
                                className={`${styles.statusBarItem} ${isDone ? styles.statusBarItemDone : item.step === step ? styles.statusBarItemActive : ''}`}
                            >
                                {isDone ? '.' : item.step}
                            </div>

                            <div className={styles.statusBarItemTitle}>
                                {item.title}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.statusBarItemSeparator}></div>
        </div>
    );
}
