interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}

export function FormField({ id, label, error, children }: FormFieldProps) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            {children}
            {error && (
                <span id={`${id}-error`} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}