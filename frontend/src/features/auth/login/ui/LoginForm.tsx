import styles from './LoginForm.module.scss';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { useLogin } from '../model/useLogin';

export function LoginForm() {
    const { credentials, errors, setField, submit, isPending, formError } = useLogin();

    return (
        <form
            className={styles.loginForm}
            noValidate
            onSubmit={(event) => {
                event.preventDefault();
                submit();
            }}
        >
            <FormField id="email" label="Email" error={errors.email}>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={credentials.email}
                    onChange={(event) => setField('email', event.target.value)}
                />
            </FormField>

            <FormField id="password" label="Пароль" error={errors.password}>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={(event) => setField('password', event.target.value)}
                />
            </FormField>

            {formError && <div className={styles.formError}>{formError}</div>}

            <Button type="submit" disabled={isPending}>
                {isPending ? 'Входим…' : 'Войти'}
            </Button>
        </form>
    );
}