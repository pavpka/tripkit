import { useEffect, useRef, useState } from 'react';
import styles from './ActivityModal.module.scss';
import ReactDOM from 'react-dom';
import { Button } from '@/shared/ui/Button';
import { ChoiceChips } from '@/shared/ui/ChoiceChips';
import { ACTIVITY_CATEGORY_DETAILS, type ActivityType } from '@/entities/activity';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { dayQueries, type Day } from '@/entities/day';
import { formatDayDate } from '@/shared/lib/dates';
import { SegmentControl } from '@/shared/ui/SegmentControl';
import { tripQueries } from '@/entities/trip';
import { DropDown } from '@/shared/ui/DropDown';
import { TimeRangeInput } from '@/shared/ui/TimeRangeInput';
import { useCreateActivity } from '@/entities/activity/api/activityMutations';

const bookedStatusOptions = [
    { value: null, label: 'Не нужна' },
    { value: 'todo', label: 'Нужно забронировать' },
    { value: 'booked', label: 'Забронировано' }
];

export function ActivityModal({ onClose, thisDay, order }: { onClose: () => void, thisDay: Day, order: number }) {
    const { tripId = '' } = useParams();
    const createActivity = useCreateActivity(tripId);
    
    const modalRef = useRef<HTMLDivElement>(null);

    const [bookedStatus, setBookedStatus] = useState<null | 'todo' | 'booked'>(null);

    
    const { data: trip = null } = useQuery(tripQueries.detail(tripId));
    const { data: tripDays = [] } = useQuery(dayQueries.byTrip(tripId));
    const days = [
        ...tripDays.map(day => ({
            id: day.id,
            label: `${formatDayDate(day.date)} • ${day.title || 'Без названия'}`,
        })), { id: 'other', label: 'Без дня' }
    ];


    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] =
        useState<ActivityType | null>(null);
    const [dayId, setDayId] = useState(thisDay.id);
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const [cost, setCost] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            )
                onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('submit', name, selectedCategory, dayId, timeFrom, timeTo, address, link, cost, note, bookedStatus);
        if (!selectedCategory) return;

        createActivity.mutate({
            title: name,
            type: selectedCategory,
            dayId,
            startTime: timeFrom,
            endTime: timeTo,
            address,
            url: link,
            costEstimate: cost ? parseFloat(cost) : null,
            bookingStatus: bookedStatus,
            note,
            order: order,
        },
            { onSuccess: onClose });
    };

    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContainer} ref={modalRef}>
                    <form onSubmit={onSubmit}>

                        {/* header */}
                        <div className={styles.modalHeader}>
                            <div className={styles.modalHeaderTitle}>
                                <div className={styles.modalHeaderIcon}
                                    style={{ backgroundColor: selectedCategory ? ACTIVITY_CATEGORY_DETAILS[selectedCategory].bgColor : 'transparent' }}>
                                    {selectedCategory ? <img src={ACTIVITY_CATEGORY_DETAILS[selectedCategory].icon} alt={selectedCategory} /> : null}
                                </div>
                                <div>
                                    Новая активность
                                    <div className={styles.modalHeaderTitleSubtitle}>
                                        {trip?.title} • {formatDayDate(thisDay.date)}
                                    </div>
                                </div>
                            </div>
                            <Button onClick={onClose} type="button" variant="secondary">
                                <img
                                    src="/icons/shared/close.svg"
                                    alt="close"
                                />
                            </Button>
                        </div>

                        {/* content */}
                        <div className={styles.modalContent}>
                            <div>
                                <span>Тип</span>
                                <ChoiceChips
                                    categories={ACTIVITY_CATEGORY_DETAILS}
                                    selectedCategory={selectedCategory}
                                    onChange={(category) =>
                                        setSelectedCategory(
                                            category as ActivityType,
                                        )
                                    }
                                    showBackground={false}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">
                                    Название
                                </label>
                                <input
                                    aria-required="true"
                                    type="text"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Например, Крепость Нарикала"
                                />
                            </div>
                            <div>
                                <div className={styles.flexRow}>
                                    <div>
                                        <label htmlFor="day">День</label>
                                        <div>
                                            <DropDown options={days} selectedValue={dayId} onChange={setDayId} id="day" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="timeFrom">Время</label>
                                        <TimeRangeInput timeFrom={timeFrom} timeTo={timeTo} onChangeTimeFrom={setTimeFrom} onChangeTimeTo={setTimeTo} />
                                    </div>
                                </div>

                                <div className={styles.flexRow}>
                                    <div>
                                        <label htmlFor="address">Адрес</label>
                                        <div>
                                            <input type="text" id="address" placeholder="Улица, дом" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>

                                        <label htmlFor="link">Ссылка</label>
                                        <div>
                                            <input type="text" id="link" placeholder="https://" value={link} onChange={(e) => setLink(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cost">Стоимость</label>
                                <input type="number" id="cost" placeholder="0" value={cost} onChange={(e) => setCost(e.target.value)} />

                            </div>
                            <div>
                                Бронь
                                <SegmentControl options={bookedStatusOptions} value={bookedStatus} onChange={(value) => setBookedStatus(value as 'todo' | 'booked' | null)} />
                            </div>
                            <div>
                                <label htmlFor="note">Заметка</label>
                                <textarea id="note" placeholder="Что взять, часы работы, код брони" value={note} onChange={(e) => setNote(e.target.value)} />
                            </div>
                        </div>


                        {/* footer */}
                        <div className={styles.modalFooter}>
                            <Button
                                onClick={onClose}
                                type="button"
                                variant="secondary"
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={() => { }}
                                type="submit"
                                variant="primary"
                            >
                                Добавить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body,
    );
}