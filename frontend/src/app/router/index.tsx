import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from '@/app/layouts/RootLayout';
import { DashboardPage as Dashboard } from '@/pages/dashboard';
import { TripsPage as Trips } from '@/pages/trips';
import {
    BudgetTab as Budget,
    ItineraryTab as Itinerary,
    OverviewTab as Overview,
    PackingTab as Packing,
    TripDetailsLayout as TripDetailLayout,
} from '@/pages/trip-details';
import { SettingsPage as Settings } from '@/pages/settings';
import { NotFoundPage as NotFound } from '@/pages/not-found';
import ErrorBoundaryPage from '@/app/ui/ErrorBoundaryPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorBoundaryPage />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'trips', element: <Trips /> },
            {
                path: 'trips/:tripId',
                element: <TripDetailLayout />,
                children: [
                    // При переходе на /trips/123 автоматически редиректим на вкладку Overview
                    {
                        index: true,
                        element: <Navigate to="overview" replace />,
                    },
                    { path: 'overview', element: <Overview /> },
                    { path: 'itinerary', element: <Itinerary /> },
                    { path: 'budget', element: <Budget /> },
                    { path: 'packing', element: <Packing /> },
                ],
            },
            { path: 'settings', element: <Settings /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);
