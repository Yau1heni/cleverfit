import { Fragment, useEffect, useState } from 'react';
import { FeedbackItem, NoFeedback } from '@components/feedback';
import { MainLayout } from '@components/layout';
import { Loader } from '@components/loader';
import { ErrorServerModal, FeedbackCreateModal, FeedbackResultModal } from '@components/modals';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { appSelectors, feedbackActions, feedbackSelectors, getFeedbacks } from '@redux/slices';
import { Button } from 'antd';

import styles from './feedbacks-page.module.css';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();

    const feedbacks = useAppSelector(feedbackSelectors.feedbacks);
    const isLoading = useAppSelector(appSelectors.isLoading);
    const isError = useAppSelector(feedbackSelectors.isError);

    const [collapsed, setCollapsed] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getFeedbacks());
    }, [dispatch]);

    const clearError = () => {
        dispatch(feedbackActions.setIsError({ isError: false }));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const collapsedHandler = () => {
        setCollapsed(!collapsed);
    };

    const isEmptyFeedbackList = feedbacks.length === 0;

    const feedbackList = collapsed
        ? feedbacks?.slice(0, 4).map((item) => <FeedbackItem feedback={item} key={item.id} />)
        : feedbacks?.map((item) => <FeedbackItem feedback={item} key={item.id} />);

    const textButton = collapsed ? 'Развернуть все отзывы' : 'Свернуть все отзывы';

    if (isLoading) {
        return <Loader />;
    }

    return (
        <MainLayout isWithHeader={false} isWithFooter={false}>
            {isEmptyFeedbackList ? (
                <NoFeedback onClick={setIsModalOpen} />
            ) : (
                <Fragment>
                    <div className={collapsed ? '' : styles.feedbacksContainer}>{feedbackList}</div>
                    <div className={styles.buttonsContainer}>
                        <Button type='primary' onClick={showModal} data-test-id='write-review'>
                            Написать отзывы
                        </Button>
                        <Button
                            type='text'
                            onClick={collapsedHandler}
                            data-test-id='all-reviews-button'
                        >
                            {textButton}
                        </Button>
                    </div>
                </Fragment>
            )}

            <FeedbackCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <ErrorServerModal clearError={clearError} isError={isError} />
            <FeedbackResultModal setIsModalOpen={setIsModalOpen} />
        </MainLayout>
    );
};
