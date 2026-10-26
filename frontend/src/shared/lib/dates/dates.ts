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

export const formatDateRange = (
    from: string | null,
    to: string | null,
): string => (from && to ? `${from} - ${to}` : '—');
