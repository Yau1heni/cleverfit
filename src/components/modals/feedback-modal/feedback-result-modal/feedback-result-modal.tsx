import { FC } from 'react';
import { CreationStatus } from '@common-types/feedback';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { feedbackActions, feedbackSelectors } from '@redux/slices';
import { Button, Modal, Result } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { maskStyle } from '../../common-styles.ts';

export const FeedbackResultModal: FC<Props> = ({ setIsModalOpen }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const status = useAppSelector(feedbackSelectors.creationStatus);

    const isSuccess = status === CreationStatus.SUCCESS;
    const isError = status === CreationStatus.ERROR;
    const isIdle = status === CreationStatus.IDLE;

    const cancelHandler = () => {
        dispatch(feedbackActions.setCreationStatus({ status: CreationStatus.IDLE }));
    };

    const okHandler = () => {
        setIsModalOpen(true);
        dispatch(feedbackActions.setCreationStatus({ status: CreationStatus.IDLE }));
    };

    const widthModal = xs ? 360 : 571;
    const widthButton = xs ? { width: '140px' } : { width: '180px' };

    if (isIdle) {
        return null;
    }

    if (isError) {
        return (
            <Modal
                open={isError}
                closable={false}
                centered={true}
                bodyStyle={{ padding: 0 }}
                maskStyle={maskStyle}
                width={widthModal}
                footer={null}
            >
                <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте еще раз.'
                    extra={
                        <div>
                            <Button
                                onClick={okHandler}
                                type='primary'
                                style={widthButton}
                                key='write-review-not-saved-modal'
                                data-test-id='write-review-not-saved-modal'
                            >
                                Написать отзыв
                            </Button>
                            <Button
                                onClick={cancelHandler}
                                style={widthButton}
                                key='write-review-cancel-saved-modal'
                            >
                                Закрыть
                            </Button>
                        </div>
                    }
                />
            </Modal>
        );
    }
    if (isSuccess) {
        return (
            <Modal
                open={isSuccess}
                closable={false}
                centered={true}
                maskStyle={maskStyle}
                footer={null}
                width={widthModal}
            >
                <Result
                    status='success'
                    title='Отзыв успешно опубликован'
                    extra={
                        <Button onClick={cancelHandler} block={true} type='primary'>
                            Отлично
                        </Button>
                    }
                />
            </Modal>
        );
    }

    return null;
};

type Props = {
    setIsModalOpen: (isModalOpen: boolean) => void;
};
