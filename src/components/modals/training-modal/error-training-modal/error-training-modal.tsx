import { FC } from 'react';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { maskStyle } from '@components/modals/common-styles.ts';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings, trainingActions } from '@redux/slices';
import { Button, Col, Modal, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const ErrorTrainingModal: FC<Props> = (props) => {
    const { isErrorOpened = false, isErrorSaving = false, clearError, onRetry } = props;
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();

    const isError = isErrorSaving || isErrorOpened;

    const textTitle = isErrorOpened
        ? 'При открытии данных произошла ошибка'
        : 'При сохранении данных произошла ошибка';
    const text = isErrorOpened ? 'Попробуйте еще раз' : 'Придётся попробовать ещё раз';
    const textButton = isErrorOpened ? 'Обновить' : 'Закрыть';
    const colorIcon = isErrorOpened ? '#1890ff' : '#ff4d4f';

    const backToCalendarHandler = () => {
        clearError();
    };

    const retryRequestHandler = () => {
        if (isErrorSaving) {
            dispatch(getTrainings({ goToPath: null }));
            dispatch(trainingActions.clearExercises());
            dispatch(trainingActions.setSelectedTraining({ training: '' }));
        }

        if (isErrorOpened) {
            onRetry();
        }

        clearError();
    };

    return (
        <Modal
            open={isError}
            width={xs ? 340 : 384}
            footer={null}
            closable={false}
            centered={true}
            maskStyle={maskStyle}
        >
            <Row align='top'>
                <Col span={3}>
                    <CloseCircleTwoTone
                        style={{ fontSize: 'var(--font-size-xl)' }}
                        twoToneColor={colorIcon}
                    />
                </Col>
                <Col span={17}>
                    <Typography.Title
                        level={5}
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle}
                    >
                        {textTitle}
                    </Typography.Title>
                    <Typography.Text
                        type='secondary'
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}
                    >
                        {text}
                    </Typography.Text>
                </Col>

                <Button
                    icon={<CloseOutlined />}
                    onClick={backToCalendarHandler}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose}
                />
            </Row>

            <Row justify='end' style={{ marginTop: 'var(--gap-m)' }}>
                <Button
                    type='primary'
                    onClick={retryRequestHandler}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    {textButton}
                </Button>
            </Row>
        </Modal>
    );
};

type Props = {
    isErrorOpened?: boolean;
    isErrorSaving?: boolean;
    clearError: () => void;
    onRetry: () => void;
};
