import { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Training } from '@common-types/training';
import { ClickableDiv } from '@components/clickable-div';
import { CustomModal } from '@components/modals';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useModalPosition } from '@hooks/use-modal-position.ts';
import { createTraining, editTraining, trainingActions, trainingSelectors } from '@redux/slices';
import { optionsListBuilder } from '@utils/options-list-builder';
import { Button, Row, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { ExercisesList } from './exercises-list/exercises-list.tsx';

import styles from './choose-training-modal.module.css';

export const ChooseTrainingModal: FC<Props> = (props) => {
    const { date, idChooseModal, prevModalId, trainings, isMobile = false } = props;
    const dispatch = useAppDispatch();

    const { top, transform, left, right } = useModalPosition(date);

    const trainingsList = useAppSelector(trainingSelectors.trainingsList);
    const selectedTraining = useAppSelector(trainingSelectors.selectedTraining);
    const exercises = useAppSelector(trainingSelectors.exercises);

    const openPopoverId = useAppSelector(trainingSelectors.openPopoverId);
    const isLoading = useAppSelector(trainingSelectors.isLoadingSave);
    const isEditedExercise = useAppSelector(trainingSelectors.isEditedExercise);
    const trainingId = useAppSelector(trainingSelectors.trainingId);

    const isOpen = openPopoverId === idChooseModal;
    const isPastOrToday = date.isSame(dayjs(), 'day') || date.isBefore(dayjs(), 'day');

    const defaultSelectValue =
        selectedTraining.length > 0 ? selectedTraining : 'Выбор типа тренировки';

    const optionsList = optionsListBuilder(trainingsList, trainings);

    const changeSelectedTrainingHandler = (value: string) => {
        dispatch(trainingActions.setSelectedTraining({ training: value }));
    };

    const goBackHandler = () => {
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: prevModalId }));
    };

    const addExerciseHandler = () => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
    };

    const saveExerciseHandler = () => {
        const payload = {
            name: selectedTraining,
            date: date.toISOString(),
            isImplementation: isPastOrToday,
            exercises: exercises[selectedTraining],
        };

        if (isEditedExercise) {
            dispatch(editTraining({ trainingId, payload, isMobile }));
        } else {
            dispatch(createTraining(payload));
        }
        dispatch(trainingActions.clearExercises());
    };

    const exercisesList = exercises[selectedTraining]
        ? exercises[selectedTraining].filter(
              (exercise) => exercise?.name && exercise.name.length > 0,
          )
        : [];

    return (
        <CustomModal
            top={top}
            left={left}
            right={right}
            transform={transform}
            width={264}
            isOpen={isOpen}
        >
            <ClickableDiv
                data-test-id={DATA_TEST_ID.modalCreateExercise}
                onClick={(e) => e.stopPropagation()}
            >
                <Row>
                    <Button
                        data-test-id={DATA_TEST_ID.modalExerciseTrainingButtonClose}
                        icon={<ArrowLeftOutlined />}
                        onClick={goBackHandler}
                    />
                    <Select
                        defaultValue={defaultSelectValue}
                        dropdownMatchSelectWidth={false}
                        bordered={false}
                        style={{ width: '85%', textAlign: 'start' }}
                        onChange={changeSelectedTrainingHandler}
                        options={optionsList}
                        data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
                    />
                </Row>

                <div className={styles.exercisesListContainer}>
                    <ExercisesList exercises={exercisesList} />
                </div>

                <Row justify='center' gutter={[0, 8]}>
                    <Button
                        type='text'
                        className={styles.addExercisesButton}
                        onClick={addExerciseHandler}
                        disabled={!selectedTraining}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        type='link'
                        disabled={exercisesList?.length === 0}
                        onClick={saveExerciseHandler}
                        loading={isLoading}
                    >
                        {isPastOrToday ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </Row>
            </ClickableDiv>
        </CustomModal>
    );
};

type Props = {
    date: Dayjs;
    idChooseModal: string;
    prevModalId: string;
    trainings: Training[];
    isMobile?: boolean;
};
