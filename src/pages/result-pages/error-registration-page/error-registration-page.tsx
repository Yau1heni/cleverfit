import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { retryRegistration } from '@redux/slices';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorRegistrationPage = () => {
    const dispatch = useAppDispatch();

    const retryRegistrationHandler = () => {
        dispatch(retryRegistration());
    };

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        onClick={retryRegistrationHandler}
                        block={true}
                        key='registration-retry-button'
                        data-test-id='registration-retry-button'
                    >
                        Повторить
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
