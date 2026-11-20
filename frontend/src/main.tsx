import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import './app/styles/fonts.css';
import { queryClient } from './shared/api/queryClient.ts';
import { sessionQueries } from './entities/session/api/sessionQueries.ts';

await queryClient.prefetchQuery(sessionQueries.me());

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
