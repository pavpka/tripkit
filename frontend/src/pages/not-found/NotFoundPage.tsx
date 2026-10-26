import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Go Home
            </Link>
        </div>
    );
}
