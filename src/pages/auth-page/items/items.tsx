import { Paths } from '@common-types/routes';
import { Login, Registration } from '@components/auth';

export const items = [
    {
        label: 'Вход',
        key: Paths.AUTH,
        children: <Login />,
    },
    {
        label: 'Регистрация',
        key: Paths.REGISTRATION,
        children: <Registration />,
    },
];
