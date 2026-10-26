import { motion } from 'motion/react';
import styles from './SegmentControl.module.scss';

type Option<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
};

export default function SegmentControl<T extends string>({
    options,
    value,
    onChange,
}: SegmentedControlProps<T>) {
    return (
        <ol className={styles.segmentControl}>
            {options.map((option) => {
                const isActive = option.value === value;
                return (
                    <motion.li key={option.value} className={styles.item}>
                        <button
                            onClick={() => onChange(option.value)}
                            type="button"
                            className={styles.button}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="SegmentedControlActive"
                                    className={styles.active}
                                />
                            )}

                            <span className={styles.label}>{option.label}</span>
                        </button>
                    </motion.li>
                );
            })}
        </ol>
    );
}
