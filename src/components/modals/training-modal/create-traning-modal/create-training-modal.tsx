import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DateFormat, Training } from '@common-types/training';
import { TrainingsList } from '@components/calendar';
import { ClickableDiv } from '@components/clickable-div';
import { CustomModal } from '@components/modals';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useModalPosition } from '@hooks/use-modal-position.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { formatDate } from '@utils/format-date';
import { Button, Col, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

export const CreateTrainingModal: FC<Props> = (props) => {
    const { date, idChooseModal, id, trainings } = props;
    const dispatch = useAppDispatch();

    const openPopoverId = useAppSelector(trainingSelectors.openPopoverId);
    const trainingsList = useAppSelector(trainingSelectors.trainingsList);

    const { top, transform, left, right } = useModalPosition(date);

    const isOpen = openPopoverId === id;
    const isPastOrToday = date.isSame(dayjs(), 'day') || date.isBefore(dayjs(), 'day');

    const onOkHandler = () => {
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: idChooseModal }));
        dispatch(trainingActions.setSelectedTraining({ training: '' }));
    };

    const onCloseHandler = () => {
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: '' }));
    };

    const isAllSelectedTrainings = trainings.length === trainingsList.length;

    return (
        <CustomModal
            top={top}
            left={left}
            right={right}
            transform={transform}
            width={312}
            isOpen={isOpen}
        >
            <ClickableDiv dataTestId='modal-create-exercise' onClick={(e) => e.stopPropagation()}>
                <Row
                    data-test-id='modal-create-training'
                    justify='space-between'
                    align='top'
                    onClick={(e) => e.stopPropagation()}
                    style={{ marginBottom: 'var(--gap-xl)' }}
                >
                    <Col>
                        <Col>
                            <Typography.Text strong={true}>
                                {`Тренировка на: ${formatDate({
                                    date,
                                    format: DateFormat.ISO_DATE,
                                })}`}
                            </Typography.Text>
                        </Col>
                        <Col>
                            {trainings.length === 0 && (
                                <Typography.Text type='secondary'>
                                    Нет активных тренировок
                                </Typography.Text>
                            )}
                        </Col>
                    </Col>
                    <Col>
                        <Button
                            icon={<CloseOutlined />}
                            onClick={onCloseHandler}
                            data-test-id='modal-create-training-button-close'
                        />
                    </Col>
                </Row>

                <TrainingsList
                    idChooseModal={idChooseModal}
                    isEditable={true}
                    trainings={trainings}
                />

                <Button
                    style={{ marginTop: 'var(--gap-l)' }}
                    type='primary'
                    block={true}
                    disabled={isPastOrToday || isAllSelectedTrainings}
                    onClick={onOkHandler}
                >
                    {isPastOrToday ||
                    trainings.length === 0 ||
                    isAllSelectedTrainings ||
                    trainings.length === 4
                        ? 'Создать тренировку'
                        : 'Добавить тренировку'}
                </Button>
            </ClickableDiv>
        </CustomModal>
    );
};

type Props = {
    date: Dayjs;
    idChooseModal: string;
    id: string;
    trainings: Training[];
};
