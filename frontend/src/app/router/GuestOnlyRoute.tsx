import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/entities/session';

export default function GuestOnlyRoute() {
    const { isAuthenticated, isLoading } = useSession();

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/" replace />;

    return <Outlet />;
}