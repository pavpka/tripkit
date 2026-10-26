import styles from './QuantityInput.module.scss';

export function QuantityInput({
    count,
    onChange,
}: {
    count: number;
    onChange: (count: number) => void;
}) {
    const increment = () => onChange(count + 1);
    const decrement = () => {
        if (count > 1) {
            onChange(count - 1);
        }
    };
    return (
        <div className={styles.stepperWrapper}>
            <button
                type="button"
                className={styles.stepperBtn}
                onClick={decrement}
                disabled={count <= 1}
            >
                -
            </button>
            <span className={styles.stepperValue}>{count}</span>
            <button
                type="button"
                className={styles.stepperBtn}
                onClick={increment}
            >
                +
            </button>
        </div>
    );
}
