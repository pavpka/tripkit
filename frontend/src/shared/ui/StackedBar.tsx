import styles from './StackedBar.module.scss';

export function StackedBar({
    expensesByCategory,
}: {
    expensesByCategory: Record<
        string,
        { amount: number; percentage: number; color: string }
    >;
}) {
    return (
        <div className={styles.stackedBar}>
            {Object.keys(expensesByCategory).map((category) => (
                <div
                    key={category}
                    className={styles.stackedBarItem}
                    style={{
                        width: `${expensesByCategory[category].percentage}%`,
                        backgroundColor: expensesByCategory[category].color,
                    }}
                ></div>
            ))}
        </div>
    );
}
