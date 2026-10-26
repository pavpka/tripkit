import { getActivityIcon, type Activity } from '@/entities/activity';
export function NoDayCard({ activities }: { activities: Activity[] }) {
    const noDay = activities.filter((activity) => activity.dayId === null);
    return noDay.length > 0 ? (
        <div>
            <h3>Без дня</h3>
            {noDay.map((activity) => (
                <div key={activity.id}>
                    <img
                        src={`/icons/activities/${getActivityIcon(activity.type)}`}
                        alt={activity.type}
                        style={{ width: '20px' }}
                    />
                    <h4>{activity.title}</h4>
                </div>
            ))}
        </div>
    ) : null;
}
