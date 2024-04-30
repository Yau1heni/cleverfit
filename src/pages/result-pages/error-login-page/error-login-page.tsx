import { useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { navigateTo } from '@utils/navigate-to';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorLoginPage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='warning'
                title='Вход не выполнен'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        onClick={navigateToLoginHandler}
                        block={true}
                        key='login-retry-button'
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
