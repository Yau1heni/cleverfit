import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { AuthContainer } from '@components/auth';
import { navigateTo } from '@utils/navigate-to';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const SuccessPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='success'
                title='Регистрация успешна'
                subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                extra={[
                    <Button
                        type='primary'
                        onClick={navigateToLoginHandler}
                        block={true}
                        key='registration-enter-button'
                        data-test-id='registration-enter-button'
                    >
                        Войти
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
