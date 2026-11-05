import styles from './DropDown.module.scss';

interface DropDownOptions {
    id: string,
    label: string,
    title?: string | null,
    [key: string]: unknown;
}
export function DropDown({ options, selectedValue, id, onChange }: { options: DropDownOptions[], selectedValue: string, id: string, onChange: (value: string) => void }) {
    return (
        <select id={id} value={selectedValue} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}