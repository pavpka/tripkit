export const formatTime = (time: string | null) => {
    if (!time) return '--:--';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
};