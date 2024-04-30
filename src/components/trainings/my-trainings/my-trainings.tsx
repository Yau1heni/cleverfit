import { Key } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerType } from '@common-types/training';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { getColumns } from '@utils/columns';
import { Alert, Button, Col, Row, Table, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './my-trainings.module.css';

export const MyTrainings = () => {
    const dispatch = useAppDispatch();
    const { xs, md } = useBreakpoint();

    const trainings = useAppSelector(trainingSelectors.trainings);
    const isCreateTrainingSuccess = useAppSelector(trainingSelectors.isCreateTrainingSuccess);
    const drawerType = useAppSelector(trainingSelectors.drawerType);

    const onCloseAlertHandler = () => {
        dispatch(trainingActions.setIsCreateTrainingSuccess({ isCreate: false }));
    };

    const onOpenSidebarHandler = () => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
    };

    const onAddTrainingHandler = () => {
        dispatch(trainingActions.setDrawerType({ drawerType: DrawerType.ADD }));
        onOpenSidebarHandler();
    };

    const onEditTrainingHandler = (key: Key) => {
        const editableTraining = trainings.find(({ _id: id }) => id === key);

        if (editableTraining) {
            dispatch(trainingActions.setEditableTraining({ training: editableTraining }));
        }
        dispatch(trainingActions.setDrawerType({ drawerType: DrawerType.EDIT }));

        onOpenSidebarHandler();
    };

    const columns = getColumns(onEditTrainingHandler);

    const dataSource: DataType[] = trainings.map(({ name, parameters, _id: id }) => ({
        key: id,
        type: name,
        period: parameters.period,
    }));

    if (trainings.length === 0) {
        return (
            <div className={styles.withoutTraining}>
                <Typography.Title level={4}>У вас еще нет созданных тренировок</Typography.Title>
                <Button
                    onClick={onAddTrainingHandler}
                    data-test-id={DATA_TEST_ID.createNewTrainingButton}
                    type='primary'
                >
                    Создать тренировку
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Col className={styles.tableContainer} span={md ? 14 : 24}>
                <Table
                    columns={columns}
                    pagination={{ position: ['bottomLeft'], hideOnSinglePage: true, size: 'small' }}
                    dataSource={dataSource}
                    data-test-id={DATA_TEST_ID.myTrainingsTable}
                />
            </Col>
            <Button
                block={xs}
                onClick={onAddTrainingHandler}
                type='primary'
                icon={<PlusOutlined />}
                data-test-id={DATA_TEST_ID.createNewTrainingButton}
            >
                Новая тренировка
            </Button>
            {isCreateTrainingSuccess && (
                <Row justify='center'>
                    <Alert
                        message={
                            <Typography.Title level={5}>
                                {drawerType === DrawerType.EDIT
                                    ? 'Тренировка успешно обновлена'
                                    : 'Новая тренировка успешно добавлена'}
                            </Typography.Title>
                        }
                        type='success'
                        closable={true}
                        onClose={onCloseAlertHandler}
                        showIcon={true}
                        data-test-id={DATA_TEST_ID.createTrainingSuccessAlert}
                    />
                </Row>
            )}
        </div>
    );
};

type DataType = {
    key: Key;
    type: string;
    period: number;
};
