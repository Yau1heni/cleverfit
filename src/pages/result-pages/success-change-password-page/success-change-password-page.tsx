import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { AuthContainer } from '@components/auth';
import { navigateTo } from '@utils/navigate-to';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const SuccessChangePasswordPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='success'
                title='Пароль успешно сохранен'
                subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
                extra={[
                    <Button
                        type='primary'
                        onClick={navigateToLoginHandler}
                        block={true}
                        key='change-entry-button'
                        data-test-id='change-entry-button'
                    >
                        Войти
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
