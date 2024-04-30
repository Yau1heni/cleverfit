import { useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { navigateTo } from '@utils/navigate-to';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorCheckEmailNoExistPage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Такой e-mail не зарегистрирован'
                subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
                extra={[
                    <Button
                        type='primary'
                        onClick={navigateToLoginHandler}
                        block={true}
                        key='check-retry-button'
                        data-test-id='check-retry-button'
                    >
                        Попробовать снова
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
