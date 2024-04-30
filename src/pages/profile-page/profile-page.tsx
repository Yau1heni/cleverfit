import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DateFormat } from '@common-types/training';
import { BasicLayout } from '@components/layout';
import { ErrorNotificationModal } from '@components/modals';
import { VALIDATE_PASSWORD_SCHEMA, validationMessages } from '@constants/validation.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getUser, profileActions, profileSelectors, updateUser } from '@redux/slices';
import { Alert, Button, DatePicker, Form, Image, Input, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { UploadPhoto } from './upload-foto/upload-photo.tsx';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const [disabled, setDisabled] = useState(true);
    const { xs } = useBreakpoint();
    const [form] = Form.useForm();
    const user = useAppSelector(profileSelectors.user);
    const imgSrc = useAppSelector(profileSelectors.imgSrc);
    const isErrorFileSize = useAppSelector(profileSelectors.isErrorFileSize);
    const isProfileUpdate = useAppSelector(profileSelectors.isSuccessUpdate);

    const onFinishHandler = (value: FormProfileData) => {
        const newImgSrc = user?.imgSrc ? user.imgSrc : imgSrc;

        dispatch(
            updateUser({
                ...value,
                imgSrc: newImgSrc,
            }),
        );
    };

    const clearError = () => {
        dispatch(profileActions.setIsErrorFileSize({ isError: false }));
        setDisabled(true);
    };

    const renderPasswordIcon = (visible: boolean) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

    const onChange = () => {
        if (disabled) setDisabled(false);
    };

    const onCloseAlertHandler = () => {
        dispatch(profileActions.setIsSuccessUpdate({ isSuccess: false }));
    };

    useEffect(() => {
        if (!user) {
            dispatch(getUser());
        }

        return () => form.resetFields();
    }, [dispatch, form, user]);

    useEffect(() => {
        form.resetFields(['password', 'confirmPassword']);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProfileUpdate]);

    return (
        <BasicLayout title='Профиль'>
            <Typography.Title
                level={5}
                style={{
                    marginBottom: 'var(--gap-xl)',
                    fontWeight: 'var(--font-weight-xl)',
                }}
            >
                Личная информация
            </Typography.Title>
            <div className={styles.profileContent}>
                <Form form={form} onChange={onChange} onFinish={onFinishHandler}>
                    <div className={styles.personalInfo}>
                        <Row justify='space-between'>
                            {user?.imgSrc ? (
                                <div data-test-id='profile-avatar'>
                                    <Image
                                        src={user.imgSrc}
                                        width={xs ? 48 : 86}
                                        height={xs ? 48 : 86}
                                        alt='avatar'
                                    />
                                </div>
                            ) : (
                                <UploadPhoto />
                            )}
                            {xs && (
                                <DeleteOutlined
                                    style={{
                                        color: '#8c8c8c',
                                        padding: '0 var(--gap-xl)',
                                    }}
                                />
                            )}
                        </Row>
                        <div style={{ width: '80%' }}>
                            <Form.Item name='firstName' initialValue={user?.firstName || ''}>
                                <Input size='large' placeholder='Имя' data-test-id='profile-name' />
                            </Form.Item>
                            <Form.Item name='lastName' initialValue={user?.lastName || ''}>
                                <Input
                                    placeholder='Фамилия'
                                    size='large'
                                    data-test-id='profile-surname'
                                />
                            </Form.Item>
                            <Form.Item name='birthday'>
                                <DatePicker
                                    format={DateFormat.EURO_DATE}
                                    placeholder='Дата рождения'
                                    style={{ width: '100%' }}
                                    size='large'
                                    data-test-id='profile-birthday'
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={styles.authInfo}>
                        <Typography.Title
                            level={5}
                            style={{
                                fontWeight: 'var(--font-weight-xl)',
                            }}
                        >
                            Приватность и авторизация
                        </Typography.Title>
                        <Form.Item
                            name='email'
                            style={{ margin: 0 }}
                            initialValue={user?.email}
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
                                data-test-id='profile-email'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            help={validationMessages.PASSWORD_HELP}
                            rules={[
                                {
                                    pattern: VALIDATE_PASSWORD_SCHEMA,
                                    message: validationMessages.PASSWORD_HELP,
                                },
                            ]}
                        >
                            <Input.Password
                                autoComplete='off'
                                iconRender={renderPasswordIcon}
                                placeholder='Пароль'
                                size='large'
                                data-test-id='profile-password'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            dependencies={['password']}
                            validateTrigger={['onChange']}
                            rules={[
                                {
                                    message: '',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(
                                            new Error(validationMessages.CONFIRM_PASSWORD_ERROR),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder='Повторите пароль'
                                autoComplete='off'
                                size='large'
                                iconRender={renderPasswordIcon}
                                data-test-id='profile-repeat-password'
                            />
                        </Form.Item>
                    </div>

                    <Button
                        disabled={disabled || isProfileUpdate}
                        block={xs}
                        type='primary'
                        htmlType='submit'
                        data-test-id='profile-submit'
                        className={styles.button}
                    >
                        Сохранить изменения
                    </Button>
                </Form>
            </div>

            <ErrorNotificationModal
                clearError={clearError}
                colorIcon='#ff4d4f'
                isError={isErrorFileSize}
                textTitle='Файл слишком большой'
                textSecondary='Выберите файл размером 5 МБ.'
                textButton='Закрыть'
                dataTestId='alert'
            />
            {isProfileUpdate && (
                <Row justify='center'>
                    <Alert
                        message={
                            <Typography.Title level={5}>
                                Данные профиля успешно обновлены
                            </Typography.Title>
                        }
                        type='success'
                        closable={true}
                        onClose={onCloseAlertHandler}
                        showIcon={true}
                        data-test-id='alert'
                    />
                </Row>
            )}
        </BasicLayout>
    );
};

type FormProfileData = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
};
