import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { NotFoundPage as NotFound } from '@/pages/not-found';
import styles from './ErrorBoundaryPage.module.scss';

function getErrorDetails(error: unknown) {
    if (isRouteErrorResponse(error))
        return `${error.status} ${error.statusText}`;
    if (error instanceof Error) return error.stack ?? error.message;
    return String(error);
}

export default function ErrorBoundaryPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFound />;
    }

    return (
        <div className={styles.errorPage}>
            <h1>Что-то пошло не так</h1>
            <p>
                Произошла непредвиденная ошибка. Попробуйте обновить страницу.
            </p>

            {import.meta.env.DEV && (
                <pre className={styles.errorDetails}>
                    {getErrorDetails(error)}
                </pre>
            )}

            <Link to="/" className={styles.homeLink}>
                На главную
            </Link>
        </div>
    );
}
