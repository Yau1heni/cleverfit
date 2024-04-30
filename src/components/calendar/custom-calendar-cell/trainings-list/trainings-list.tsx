import { FC, useId } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { ColorBadge, Training } from '@common-types/training';
import { TrainingListEmpty } from '@components/calendar';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions } from '@redux/slices';
import { Badge, Button, Row, Typography } from 'antd';

export const TrainingsList: FC<Props> = (props) => {
    const { isEditable = false, trainings, idChooseModal } = props;
    const dispatch = useAppDispatch();
    const id = useId();

    const onEditTrainingHandler = (training: Training) => {
        const { name, exercises, _id: trainingId } = training;

        dispatch(trainingActions.setExercises({ trainingType: name, exercises }));
        dispatch(trainingActions.setSelectedTraining({ training: name }));
        dispatch(trainingActions.setTrainingId({ trainingId }));
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: idChooseModal }));
    };

    const trainingsListNotEmpty = (isEditableList: boolean, trainingsList: Training[]) =>
        trainingsList?.map((training, index) =>
            isEditableList ? (
                <Row
                    justify='space-between'
                    key={`editable-${id}`}
                    onClick={() => onEditTrainingHandler(training)}
                >
                    <Badge
                        text={
                            <Typography.Text disabled={training.isImplementation}>
                                {training.name}
                            </Typography.Text>
                        }
                        color={ColorBadge[training.name as keyof typeof ColorBadge]}
                    />
                    <Button
                        data-test-id={`modal-update-training-edit-button${index}`}
                        disabled={training.isImplementation}
                        icon={
                            <EditOutlined
                                style={
                                    training.isImplementation
                                        ? undefined
                                        : { color: 'var(--primary-light-6)' }
                                }
                            />
                        }
                    />
                </Row>
            ) : (
                <Row key={`non-editable-${id}`}>
                    <Badge
                        text={
                            <Typography.Text disabled={training.isImplementation}>
                                {training.name}
                            </Typography.Text>
                        }
                        color={ColorBadge[training.name as keyof typeof ColorBadge]}
                    />
                </Row>
            ),
        );

    return trainings.length === 0 ? (
        <TrainingListEmpty />
    ) : (
        trainingsListNotEmpty(isEditable, trainings)
    );
};

type Props = {
    trainings: Training[];
    isEditable?: boolean;
    idChooseModal: string;
};
