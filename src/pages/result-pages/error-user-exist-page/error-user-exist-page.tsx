import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { AuthContainer } from '@components/auth';
import { navigateTo } from '@utils/navigate-to';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorUserExistPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToRegistrationHandler = () =>
        navigateTo({ dispatch, toPath: Paths.REGISTRATION, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={[
                    <Button
                        type='primary'
                        onClick={navigateToRegistrationHandler}
                        block={true}
                        key='registration-back-button'
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
