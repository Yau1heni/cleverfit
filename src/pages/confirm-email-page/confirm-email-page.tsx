import VerificationInput from 'react-verification-input';
import { AuthContainer } from '@components/auth';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authActions, authSelectors, confirmEmail } from '@redux/slices';
import { Result, Typography } from 'antd';

import styles from './confirm-email-page.module.css';

export const ConfirmEmailPage = () => {
    const dispatch = useAppDispatch();

    const code = useAppSelector(authSelectors.confirmCode);
    const isError = useAppSelector(authSelectors.isErrorConfirmEmail);
    const email = useAppSelector(authSelectors.checkEmail);

    const onCompleteHandler = (newCode: string) => {
        dispatch(confirmEmail(newCode));
    };
    const onChangeHandler = (newCode: string) => {
        dispatch(authActions.setConfirmEmail({ code: newCode }));
    };

    const status = isError ? 'error' : 'info';

    const textTitle = isError
        ? 'Неверный код. Введите код для восстановления аккауанта'
        : 'Введите код для восстановления аккауанта';

    const textSubTitle = `Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`;

    return (
        <AuthContainer>
            <Result
                className={styles.confirmEmailPage}
                status={status}
                title={textTitle}
                subTitle={textSubTitle}
                extra={[
                    <VerificationInput
                        value={code}
                        placeholder=''
                        onChange={onChangeHandler}
                        onComplete={onCompleteHandler}
                        classNames={{
                            container: styles.verificationInputContainer,
                            character: isError ? styles.characterError : styles.character,
                            characterInactive: styles.characterInactive,
                        }}
                        key='verification-input'
                        inputProps={{ 'data-test-id': 'verification-input' }}
                    />,
                    <Typography.Text key='text' type='secondary'>
                        Не пришло письмо? Проверьте папку Спам
                    </Typography.Text>,
                ]}
            />
        </AuthContainer>
    );
};
