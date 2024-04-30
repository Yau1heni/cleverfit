import { FC } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { maskStyleBlur } from '@components/modals/common-styles.ts';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authActions, profileActions, profileSelectors } from '@redux/slices';
import { Modal, Result, Typography } from 'antd';

export const TariffSuccessModal: FC<Props> = ({ email }) => {
    const dispatch = useAppDispatch();

    const isOpen = useAppSelector(profileSelectors.isSuccessPay);

    const onCancelHandler = () => {
        dispatch(profileActions.setIsSuccessPay({ isSuccess: false }));
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        dispatch(authActions.setAccessToken({ accessToken: null }));
    };

    return (
        <Modal
            open={isOpen}
            destroyOnClose={true}
            centered={true}
            onCancel={onCancelHandler}
            footer={null}
            maskStyle={maskStyleBlur}
            data-test-id='tariff-modal-success'
        >
            <Result
                title='Чек для оплаты у вас на почте'
                subTitle={`Мы отправили инструкцию для оплаты вам на e-mail ${email}. После подтверждения оплаты войдите в приложение заново.`}
                extra={
                    <Typography.Text type='secondary'>
                        Не пришло письмо? Проверьте папку Спам.
                    </Typography.Text>
                }
                icon={<CheckCircleFilled />}
            />
        </Modal>
    );
};

type Props = {
    email?: string;
};
