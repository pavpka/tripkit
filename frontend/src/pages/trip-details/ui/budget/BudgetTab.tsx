import { BudgetSummary } from '@/entities/trip';
import { CategoryFilter, ExpenseTable } from '@/entities/expense';
import { useOutletContext } from 'react-router';
import type { TripDetailsContext } from '../../model/types';
import { getExpenseMeta } from '@/entities/expense';

export default function BudgetTab() {
    const {
        status,
        percent,
        trip,
        spent,
        remaining,
        tripExpenses,
        places,
        expensesByCategory,
    } = useOutletContext<TripDetailsContext>();
    const activityTitles = Object.fromEntries(
        places.map((a) => [a.id, a.title]),
    );
    const expensesByCategoryWithColor = Object.fromEntries(
        Object.entries(expensesByCategory).map(([category, data]) => [
            category,
            { ...data, color: getExpenseMeta(category).bar },
        ]),
    );
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <div style={{ width: '69%' }}>
                <BudgetSummary
                    status={status}
                    percent={percent}
                    budgetTotal={trip.budgetTotal || 0}
                    spent={spent}
                    remaining={remaining || 0}
                    currency={trip.currency}
                />

                <ExpenseTable
                    expenses={tripExpenses}
                    activityTitles={activityTitles}
                />
            </div>
            <div style={{ width: '29.5%' }}>
                <CategoryFilter
                    expensesByCategory={expensesByCategoryWithColor}
                />
                {/*подсказка*/}
            </div>
        </div>
    );
}
