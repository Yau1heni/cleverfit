import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { retryCheckEmail } from '@redux/slices';
import { Button, Result } from 'antd';

import styles from '../result-pages.module.css';

export const ErrorCheckEmailPage = () => {
    const dispatch = useAppDispatch();

    const retryCheckEmailHandler = () => {
        dispatch(retryCheckEmail());
    };

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        onClick={retryCheckEmailHandler}
                        key='check-back-button'
                        data-test-id='check-back-button'
                    >
                        Назад
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
