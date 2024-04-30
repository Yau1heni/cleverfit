import { FC, Fragment, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DrawerType, JointTrainingsContent, TrainingPals } from '@common-types/training';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { Button, Input, List, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { TrainingPal } from '../training-pal';

import styles from './user-joint-training-list.module.css';

type UserJointTrainingListProps = {
    filteredData: TrainingPals[];
    setFilteredData: (value: TrainingPals[]) => void;
    setContentType: (type: JointTrainingsContent) => void;
};

export const UserJointTrainingList: FC<UserJointTrainingListProps> = (props) => {
    const { setContentType, setFilteredData, filteredData } = props;
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();

    const userJointTrainingList = useAppSelector(trainingSelectors.userJointTrainingList);
    const isOpen = useAppSelector(trainingSelectors.isDrawerAddExercisesOpen);

    const [searchValue, setSearchValue] = useState('');

    const onSearch = (value: string) => {
        const newFilteredList = userJointTrainingList.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()),
        );

        setSearchValue(value);
        setFilteredData(newFilteredList);
    };

    useEffect(() => {
        if (!isOpen) {
            onSearch(searchValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const onOpenSidebarHandler = (userJointTraining: TrainingPals) => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
        dispatch(trainingActions.setUserJointTraining({ userJointTraining }));
        dispatch(trainingActions.setDrawerType({ drawerType: DrawerType.INVITE }));
    };

    const goBackHandler = () => {
        setContentType(JointTrainingsContent.MAIN);
    };

    return (
        <Fragment>
            <Row style={{ marginBottom: 'var(--gap-xl)' }}>
                <Button icon={<ArrowLeftOutlined />} onClick={goBackHandler}>
                    Назад
                </Button>

                <Input.Search
                    style={
                        xs
                            ? { marginTop: 'var(--gap-3xs)' }
                            : {
                                  width: '50%',
                                  marginLeft: '160px',
                              }
                    }
                    data-test-id='search-input'
                    onSearch={onSearch}
                />
            </Row>
            <List
                grid={{
                    column: 4,
                    md: 2,
                    sm: 2,
                    xs: 1,
                }}
                pagination={{ defaultPageSize: 16 }}
                dataSource={
                    filteredData.length === 0 && searchValue.length === 0
                        ? userJointTrainingList
                        : filteredData
                }
                renderItem={(item, index) => {
                    const { name, trainingType, imageSrc, id, avgWeightInWeek, status } = item;

                    return (
                        <List.Item
                            data-test-id={`${DATA_TEST_ID.jointTrainingCards}${index}`}
                            key={id}
                        >
                            <Row justify='center' className={styles.listItemContainer}>
                                <TrainingPal
                                    imageSrc={imageSrc}
                                    avgWeightInWeek={avgWeightInWeek}
                                    name={name}
                                    trainingType={trainingType}
                                    searchPart={searchValue}
                                />
                                <Button
                                    disabled={status === 'pending'}
                                    onClick={() => onOpenSidebarHandler(item)}
                                    type='primary'
                                    block={true}
                                >
                                    Создать тренировку
                                </Button>
                                {status === 'pending' && (
                                    <Typography.Text>ожидает подтверждения</Typography.Text>
                                )}
                            </Row>
                        </List.Item>
                    );
                }}
            />
        </Fragment>
    );
};
