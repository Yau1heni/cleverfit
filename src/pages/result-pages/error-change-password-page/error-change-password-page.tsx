import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { retryChangePassword } from '@redux/slices';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorChangePasswordPage = () => {
    const dispatch = useAppDispatch();

    const retryRegistrationHandler = () => {
        dispatch(retryChangePassword());
    };

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        onClick={retryRegistrationHandler}
                        block={true}
                        key='change-retry-button'
                        data-test-id='change-retry-button'
                    >
                        Повторить
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
