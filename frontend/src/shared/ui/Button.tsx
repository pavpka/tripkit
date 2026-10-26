import styles from './Button.module.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    type: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export function Button({
    children,
    onClick,
    type,
    variant = 'primary',
    disabled = false,
}: ButtonProps) {
    return (
        <button
            className={
                variant === 'primary' ? styles.btnPrimary : styles.btnSecondary
            }
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
