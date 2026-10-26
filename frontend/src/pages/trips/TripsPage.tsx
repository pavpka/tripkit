import { TripsHeader } from '@/widgets/trips-header';
import TripsMainContent from './TripsMainContent';

export default function Trips() {
    return (
        <div>
            <TripsHeader>
                <h1
                    className="heading"
                    style={{
                        textAlign: 'start',
                        fontSize: '30px',
                        lineHeight: 1.15,
                        letterSpacing: '-1%',
                    }}
                >
                    Поездки
                </h1>
            </TripsHeader>

            <TripsMainContent />
        </div>
    );
}
