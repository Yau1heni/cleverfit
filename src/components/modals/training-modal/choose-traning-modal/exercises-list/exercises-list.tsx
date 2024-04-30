import { FC, useId } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Exercise } from '@common-types/training';
import { TrainingListEmpty } from '@components/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { Button, Row, Typography } from 'antd';

export const ExercisesList: FC<Props> = ({ exercises }) => {
    const dispatch = useAppDispatch();
    const id = useId();

    const selectedTraining = useAppSelector(trainingSelectors.selectedTraining);

    const editExerciseHandler = () => {
        if (exercises.length > 0) {
            dispatch(
                trainingActions.setExercises({
                    trainingType: selectedTraining,
                    exercises,
                }),
            );
        }
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
        dispatch(trainingActions.setIsEditedExercises({ isEdited: true }));
    };

    return exercises.length > 0 ? (
        exercises.map((exercise, index) => (
            <Row justify='space-between' key={`exercises-${id}`}>
                <Typography.Text type='secondary'>{exercise.name}</Typography.Text>

                <Button
                    data-test-id={`modal-update-training-edit-button${index}`}
                    onClick={editExerciseHandler}
                    icon={<EditOutlined style={{ color: 'var(--primary-light-6)' }} />}
                />
            </Row>
        ))
    ) : (
        <TrainingListEmpty />
    );
};

type Props = {
    exercises: Exercise[];
};
