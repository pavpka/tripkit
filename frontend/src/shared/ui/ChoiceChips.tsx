import styles from './ChoiceChips.module.scss';

interface ChoiceChipsProps {
    categories: Record<
        string,
        { label: string; icon: string; bgColor: string }
    >;
    selectedCategory: string | null;
    onChange: (category: string | null) => void;
    showBackground?: boolean;
}

export function ChoiceChips({
    categories,
    selectedCategory,
    onChange,
    showBackground = true,
}: ChoiceChipsProps) {
    return (
        <div className={styles.categoryGrid}>
            {Object.entries(categories).map(([key, category]) => {
                const isSelected = selectedCategory === key;

                return (
                    <button
                        key={key}
                        type="button"
                        className={
                            isSelected
                                ? `${styles.categoryChip} ${styles.selected}`
                                : styles.categoryChip
                        }
                        onClick={() => onChange(key)}
                    >
                        <div className={styles.categoryChipContent}>
                            <div
                                className={styles.categoryChipIcon}
                                style={{
                                    backgroundColor: showBackground ? category.bgColor : 'transparent',
                                }}
                            >
                                <img
                                    src={category.icon}
                                    alt={category.label}
                                />
                            </div>
                            <span className={styles.categoryChipLabel}>
                                {category.label}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
