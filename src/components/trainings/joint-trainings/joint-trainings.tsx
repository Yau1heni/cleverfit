import { FC, Fragment, useEffect, useState } from 'react';
import { CurrentRequest, JointTrainingsContent, TrainingPals } from '@common-types/training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useFavoriteWorkout } from '@hooks/use-favorite-workout.ts';
import {
    getTrainingPals,
    getUserJointTrainingList,
    trainingActions,
    trainingSelectors,
} from '@redux/slices';
import { Button, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { InviteList } from './invite-list';
import { TrainingPalsList } from './training-pals-list';
import { UserJointTrainingList } from './user-joint-training-list';

import styles from './joint-trainings.module.css';

export const JointTrainings: FC = () => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const trainings = useAppSelector(trainingSelectors.trainings);

    const { favoriteTrainingType } = useFavoriteWorkout(trainings);

    const inviteList = useAppSelector(trainingSelectors.inviteList);
    const trainingPalsList = useAppSelector(trainingSelectors.trainingPalsList);

    const [filteredData, setFilteredData] = useState<TrainingPals[]>([]);
    const [contentType, setContentType] = useState<JointTrainingsContent>(
        JointTrainingsContent.MAIN,
    );

    const isVisibleTextContent =
        contentType === JointTrainingsContent.MAIN ||
        trainingPalsList.length === 0 ||
        filteredData.length === 0;

    const getRandomListHandler = () => {
        dispatch(getUserJointTrainingList({ trainingType: '' }));
        dispatch(
            trainingActions.setCurrentRequest({
                currentRequest: CurrentRequest.GET_USER_JOINT_TRAINING_LIST,
            }),
        );
        setContentType(JointTrainingsContent.USER_JOINT_LIST);
    };

    const getPreferredChoiceListHandler = () => {
        dispatch(getUserJointTrainingList({ trainingType: favoriteTrainingType }));
        dispatch(
            trainingActions.setCurrentRequest({
                currentRequest: CurrentRequest.GET_PREFERRED_CHOICE_LIST,
            }),
        );
        setContentType(JointTrainingsContent.USER_JOINT_LIST);
    };

    useEffect(() => {
        dispatch(getTrainingPals());
    }, [dispatch]);

    return (
        <div style={{ marginTop: '36px' }}>
            {inviteList.length > 0 && (
                <div>
                    <Typography.Text type='secondary'>
                        Новое сообщение ({inviteList.length})
                    </Typography.Text>
                    <InviteList inviteList={inviteList} />
                </div>
            )}

            {isVisibleTextContent && (
                <Fragment>
                    <div className={styles.textContainer}>
                        <Typography.Text
                            style={{ color: 'var(--primary-light-9)' }}
                            className={styles.textMain}
                        >
                            Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                        </Typography.Text>
                        <Typography.Text
                            style={{ color: 'var(--primary-light-9)' }}
                            className={styles.textMain}
                        >
                            Можешь найти друга для совместных тренировок среди других пользователей.
                        </Typography.Text>

                        <Typography.Text className={styles.textSecondary} type='secondary'>
                            Можешь воспользоваться случайным выбором или выбрать друга с похожим на
                            твой уровень и вид тренировки, и мы найдем тебе идеального спортивного
                            друга.
                        </Typography.Text>
                    </div>
                    <Row justify='center' className={styles.buttonContainer}>
                        <Button onClick={getRandomListHandler} type='link'>
                            Случайный выбор
                        </Button>
                        {!xs && (
                            <Button onClick={getPreferredChoiceListHandler} type='text'>
                                Выбор друга по моим тренировкам
                            </Button>
                        )}
                    </Row>
                </Fragment>
            )}

            {contentType === JointTrainingsContent.MAIN && (
                <TrainingPalsList trainingPalsList={trainingPalsList} />
            )}

            {contentType === JointTrainingsContent.USER_JOINT_LIST && (
                <UserJointTrainingList
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                    setContentType={setContentType}
                />
            )}
        </div>
    );
};
