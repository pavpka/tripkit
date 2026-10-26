import styles from './CheckboxInput.module.scss';
export const CheckboxInput = ({
    checked = false,
    id,
    children,
    onChange,
}: {
    checked?: boolean;
    id: string;
    children?: React.ReactNode;
    onChange: (checked: boolean) => void;
}) => {
    return (
        <div className={styles.checkboxRoot}>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={styles.checkboxInput}
                checked={checked}
                onChange={() => {
                    onChange(!checked);
                }}
            />
            <label
                htmlFor={`checkbox-${id}`}
                className={styles.checkboxLabel}
            ></label>
            <div className={styles.labelContent}>{children}</div>
        </div>
    );
};
