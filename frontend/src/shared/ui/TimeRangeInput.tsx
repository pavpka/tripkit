import styles from './TimeRangeInput.module.scss';

export function TimeRangeInput({ timeFrom, timeTo, onChangeTimeFrom, onChangeTimeTo }: { timeFrom: string, timeTo: string, onChangeTimeFrom: (value: string) => void, onChangeTimeTo: (value: string) => void }) {
    return (
        <div>
            <input className={styles.timeRangeInput} type="time" id="timeFrom" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" value={timeFrom} onChange={(e) => onChangeTimeFrom(e.target.value)} />
            <span> - </span>
            <input className={styles.timeRangeInput} type="time" id="timeTo" value={timeTo} onChange={(e) => onChangeTimeTo(e.target.value)} />
        </div>
    );
}