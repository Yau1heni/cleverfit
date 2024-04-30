import { ChangeEvent, FC } from 'react';
import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { Rating } from '@common-types/feedback';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { createFeedback, feedbackActions, feedbackSelectors } from '@redux/slices';
import { Button, Input, Modal, Rate } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { maskStyle } from '../../common-styles.ts';

import styles from './feedback-create-modal.module.css';

export const FeedbackCreateModal: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const rating = useAppSelector(feedbackSelectors.rating);
    const message = useAppSelector(feedbackSelectors.message);

    const okHandler = () => {
        setIsModalOpen(false);
        dispatch(createFeedback({ rating, message }));
    };

    const cancelHandler = () => {
        setIsModalOpen(false);
    };

    const setRatingHandler = (newRating: number) => {
        dispatch(feedbackActions.setRating({ rating: newRating as Rating }));
    };

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(feedbackActions.setMessage({ message: e.target.value }));
    };

    const characterRateHandler = ({ index, value }: { index?: number; value?: number }) => {
        if (index !== undefined && value !== undefined) {
            if (index < value) {
                return <StarFilled style={{ color: 'var(--character-light-warning)' }} />;
            }

            return <StarTwoTone twoToneColor='#faad14' />;
        }

        return null;
    };

    return (
        <Modal
            title='Ваш отзыв'
            open={isModalOpen}
            onOk={okHandler}
            onCancel={cancelHandler}
            centered={true}
            maskStyle={maskStyle}
            bodyStyle={xs ? { padding: 'var(--gap-m)' } : {}}
            footer={[
                <Button
                    onClick={okHandler}
                    type='primary'
                    disabled={rating === 0}
                    block={xs}
                    key='new-review-submit-button'
                    data-test-id='new-review-submit-button'
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Rate
                value={rating}
                onChange={setRatingHandler}
                className={styles.rating}
                character={characterRateHandler}
            />
            <Input.TextArea
                autoSize={true}
                className={styles.textarea}
                bordered={false}
                value={message}
                onChange={onChangeMessageHandler}
                placeholder='Расскажите, почему Вам понравилось наше приложение.'
            />
        </Modal>
    );
};

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
};
