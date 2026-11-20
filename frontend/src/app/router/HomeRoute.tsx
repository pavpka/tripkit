import { useSession } from '@/entities/session';
import { DashboardPage } from '@/pages/dashboard';
import { WelcomePage } from '@/pages/welcome';

export default function HomeRoute() {
    const { isAuthenticated, isLoading } = useSession();

    if (isLoading) return null;

    return isAuthenticated ? <DashboardPage /> : <WelcomePage />;
}