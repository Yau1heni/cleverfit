import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { AuthPayload } from '@common-types/auth';
import { VALIDATE_PASSWORD_SCHEMA, validationMessages } from '@constants/validation.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authActions, authSelectors, checkEmail, login } from '@redux/slices';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './login.module.css';

export const Login = () => {
    const dispatch = useAppDispatch();
    const [disabledConfirm, setDisabledConfirm] = useState(false);
    const { pathname } = useLocation();
    const isRememberMe = useAppSelector(authSelectors.isRememberMe);
    const [form] = Form.useForm();
    const { sm } = useBreakpoint();

    const onCheckEmailHandler = () => {
        if (form.getFieldValue('email')) {
            const formValues = form.getFieldsValue(['email']);

            dispatch(checkEmail({ email: formValues.email, pathname }));
        } else {
            setDisabledConfirm(true);
        }
    };

    const rememberMeHandler = (e: CheckboxChangeEvent) =>
        dispatch(authActions.setIsRememberMe({ isRememberMe: e.target.checked }));

    const onFinishHandler = ({ email, password }: AuthPayload) => {
        dispatch(login({ email, password, pathname }));
    };

    const formChangeHandler = () => {
        const hasErrors = form.getFieldsError(['email']).some(({ errors }) => errors.length);

        setDisabledConfirm(hasErrors);
    };

    const authGoogleHandler = () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    const renderPasswordIcon = (visible: boolean) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

    return (
        <Form
            form={form}
            onFinish={onFinishHandler}
            onFieldsChange={formChangeHandler}
            initialValues={{ remember: isRememberMe }}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: '',
                    },
                ]}
            >
                <Input
                    addonBefore='e-mail: '
                    size='large'
                    autoComplete='on'
                    data-test-id='login-email'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: VALIDATE_PASSWORD_SCHEMA,
                        message: validationMessages.PASSWORD_HELP,
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    iconRender={renderPasswordIcon}
                    autoComplete='off'
                    size='large'
                    data-test-id='login-password'
                />
            </Form.Item>

            <Row justify='space-between' className={styles.remember}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox
                        data-test-id='login-remember'
                        value={isRememberMe}
                        onChange={rememberMeHandler}
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    onClick={onCheckEmailHandler}
                    disabled={disabledConfirm}
                    type='link'
                    style={{ textAlign: 'center' }}
                    data-test-id='login-forgot-button'
                >
                    Забыли пароль?
                </Button>
            </Row>

            <Form.Item>
                <div className={styles.buttonsContainer}>
                    <Button type='primary' htmlType='submit' data-test-id='login-submit-button'>
                        Войти
                    </Button>
                    <Button
                        onClick={authGoogleHandler}
                        icon={sm && <GooglePlusOutlined />}
                        type='text'
                    >
                        Войти через Google
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};
