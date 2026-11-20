import { Link } from 'react-router';
import { Button } from '@/shared/ui/Button';

export default function NotFound() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <img src='/icons/shared/not-found.svg' alt="not-found" />
            <h1>Такой страницы нет</h1>
            <p>Кажется, мы свернули не туда. Вернёмся к маршруту?</p>
            <Button variant="primary" type="button">
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    На главную
                </Link>
            </Button>
        </div>
    );
}
