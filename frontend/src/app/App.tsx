import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { queryClient } from '@/shared/api';
import { router } from './router';
import { useSessionExpiry } from './model/useSessionExpiry';

export default function App() {
    useSessionExpiry();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
