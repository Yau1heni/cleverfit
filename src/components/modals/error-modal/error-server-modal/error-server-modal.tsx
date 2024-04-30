import { FC } from 'react';
import { replace } from 'redux-first-history';
import { Paths } from '@common-types/routes';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Modal, Result } from 'antd';

import { maskStyle } from '../../common-styles.ts';

export const ErrorServerModal: FC<Props> = ({ isError, clearError }) => {
    const dispatch = useAppDispatch();

    const okHandler = () => {
        clearError();
    };
    const cancelHandler = () => {
        clearError();
    };

    const backToMainHandler = () => {
        dispatch(replace(Paths.MAIN));
        clearError();
    };

    return (
        <Modal
            open={isError}
            onOk={okHandler}
            onCancel={cancelHandler}
            centered={true}
            maskStyle={maskStyle}
            destroyOnClose={true}
            footer={null}
            data-test-id='modal-no-review'
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={
                    <Button type='primary' onClick={backToMainHandler}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};

type Props = {
    isError: boolean;
    clearError: () => void;
};
