import { FC, Fragment, useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { TrainingPals } from '@common-types/training';
import { maskStyleBlur } from '@components/modals/common-styles.ts';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { declineInvite, trainingActions } from '@redux/slices';
import { Button, Col, List, Modal, Row, Typography } from 'antd';

import { TrainingPal } from '../training-pal';

export const TrainingPalsList: FC<Props> = ({ trainingPalsList }) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [trainingPalDetails, setTrainingPalDetails] = useState<
        TrainingPals | Record<string, never>
    >({});

    const onOpenModalHandler = (palId: string) => {
        const item = trainingPalsList.find(({ id }) => id === palId);

        if (item) setTrainingPalDetails(item);
        setIsOpen(true);
    };

    const onCloseModalHandler = () => {
        setIsOpen(false);
    };

    const onCancelTraining = () => {
        if (trainingPalDetails?.inviteId) {
            dispatch(declineInvite({ invitedId: trainingPalDetails.inviteId }));
            dispatch(trainingActions.updateTrainingsPals({ id: trainingPalDetails.inviteId }));
        }
        setIsOpen(false);
    };

    return (
        <Fragment>
            <Typography.Title level={5}>Мои партнеры по тренировкам</Typography.Title>
            {trainingPalsList?.length > 0 ? (
                <List
                    grid={{
                        gutter: 8,
                        column: 4,
                        md: 2,
                        sm: 2,
                        xs: 1,
                    }}
                    dataSource={trainingPalsList}
                    renderItem={({ name, id, imageSrc, trainingType, avgWeightInWeek }, index) => (
                        <List.Item
                            data-test-id={`joint-training-cards${index}`}
                            key={`TrainingPalsList${id}`}
                        >
                            <TrainingPal
                                imageSrc={imageSrc}
                                avgWeightInWeek={avgWeightInWeek}
                                name={name}
                                trainingType={trainingType}
                                onClick={() => onOpenModalHandler(id)}
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Typography.Text>
                    У вас пока нет партнёров для совместных тренировок
                </Typography.Text>
            )}
            <Modal
                data-test-id={DATA_TEST_ID.partnerModal}
                open={isOpen}
                centered={true}
                footer={null}
                onCancel={onCloseModalHandler}
                destroyOnClose={true}
                mask={true}
                maskStyle={maskStyleBlur}
            >
                <Fragment>
                    <TrainingPal
                        imageSrc={trainingPalDetails?.imageSrc}
                        name={trainingPalDetails?.name}
                        trainingType={trainingPalDetails?.trainingType}
                        avgWeightInWeek={trainingPalDetails?.avgWeightInWeek}
                        direction='horizontal'
                    />
                    <Row align='middle' justify='space-evenly'>
                        <Col>
                            <Typography.Text>тренировка одобрена</Typography.Text>
                            <CheckCircleFilled
                                style={{
                                    color: 'var(--character-light-success)',
                                    marginLeft: 'var(--gap-xs)',
                                }}
                            />
                        </Col>
                        <Col>
                            <Button onClick={onCancelTraining}>Отменить тренировку</Button>
                        </Col>
                    </Row>
                </Fragment>
            </Modal>
        </Fragment>
    );
};

type Props = { trainingPalsList: TrainingPals[] };
