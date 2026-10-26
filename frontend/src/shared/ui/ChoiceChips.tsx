import styles from './ChoiceChips.module.scss';

interface ChoiceChipsProps {
    categories: Record<
        string,
        { label: string; icon: string; bgColor: string }
    >;
    selectedCategory: string | null;
    onChange: (category: string | null) => void;
}

export function ChoiceChips({
    categories,
    selectedCategory,
    onChange,
}: ChoiceChipsProps) {
    return (
        <div>
            <span className={styles.categoryLabel}>Категория</span>
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
                                        backgroundColor: category.bgColor,
                                    }}
                                >
                                    <img
                                        src={`/icons/packing-items/${category.icon}`}
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
        </div>
    );
}
