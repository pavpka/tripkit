import { Navigate, Outlet, useLocation } from 'react-router';
import { useSession } from '@/entities/session';

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useSession();
    const location = useLocation();

    if (isLoading) return null;
    if (!isAuthenticated)
        return <Navigate to="/" replace state={{ from: location }} />;

    return <Outlet />;
}