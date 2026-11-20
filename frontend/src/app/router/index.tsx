import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from '@/app/layouts/RootLayout';
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
import ProtectedRoute from './ProtectedRoute';
import HomeRoute from './HomeRoute';
import GuestOnlyRoute from './GuestOnlyRoute';
import { LoginPage as Login } from '@/pages/login';
import { RegisterPage as Register } from '@/pages/register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorBoundaryPage />,
        children: [
            { index: true, element: <HomeRoute /> },
            {
                element: <GuestOnlyRoute />,
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: 'trips', element: <Trips /> },
                    {
                        path: 'trips/:tripId',
                        element: <TripDetailLayout />,
                        children: [
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
        ],
    },
    { path: '*', element: <NotFound /> },
]);
