export const toISODate = (d: string | Date): string => {
    if (typeof d === 'string') return d.slice(0, 10);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toUTCTimestamp = (d: string | Date): number =>
    Date.parse(`${toISODate(d)}T00:00:00Z`);

export const differenceInCalendarDays = (
    from: string | Date,
    to: string | Date,
): number =>
    Math.round((toUTCTimestamp(to) - toUTCTimestamp(from)) / MS_PER_DAY);

export const countDaysInclusive = (
    from: string | Date,
    to: string | Date,
): number => differenceInCalendarDays(from, to) + 1;

const DATE_LOCALE = 'ru-RU';
const OPEN_RANGE_MARK = 'X';

const parseLocalDate = (value: string): Date =>
    new Date(`${toISODate(value)}T00:00:00`);

type DateParts = {
    day: string;
    month: string;
    year: string;
};

const getDateParts = (date: Date): DateParts => ({
    day: date.toLocaleDateString(DATE_LOCALE, { day: 'numeric' }),
    month: date
        .toLocaleDateString(DATE_LOCALE, { month: 'short' })
        .replace('.', ''),
    year: date.toLocaleDateString(DATE_LOCALE, { year: 'numeric' }),
});

const formatFullDate = ({ day, month, year }: DateParts): string =>
    `${day} ${month} ${year}`;

export const formatDateRange = (
    from: string | null,
    to: string | null,
): string => {
    const fromParts = from ? getDateParts(parseLocalDate(from)) : null;
    const toParts = to ? getDateParts(parseLocalDate(to)) : null;

    if (fromParts && toParts) {
        const sameMonth =
            fromParts.month === toParts.month && fromParts.year === toParts.year;
        if (sameMonth) {
            return `${fromParts.day} – ${toParts.day} ${fromParts.month} ${fromParts.year}`;
        }

        if (fromParts.year === toParts.year) {
            return `${fromParts.day} ${fromParts.month} – ${toParts.day} ${toParts.month} ${fromParts.year}`;
        }

        return `${formatFullDate(fromParts)} – ${formatFullDate(toParts)}`;
    }

    if (fromParts) return `${formatFullDate(fromParts)} – ${OPEN_RANGE_MARK}`;
    if (toParts) return `${OPEN_RANGE_MARK} – ${formatFullDate(toParts)}`;
    return 'Даты не выбраны';
};

export const formatDayDate = (date: string): string => {
    const parsed = parseLocalDate(date);
    const weekday = parsed.toLocaleDateString(DATE_LOCALE, { weekday: 'short' });
    const day = parsed.toLocaleDateString(DATE_LOCALE, { day: '2-digit' });
    const month = parsed
        .toLocaleDateString(DATE_LOCALE, { month: 'short' })
        .replace('.', '');
    return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${day} ${month}`;
};