import { Fragment, useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerType, Exercise, Parameters, TrainingPayload } from '@common-types/training';
import { DatePicker } from '@components/date-picker';
import { AddExerciseItem } from '@components/drawers';
import { TrainingBadge } from '@components/training-badge';
import { UserInfo } from '@components/user-info';
import { emptyExercisePlan, emptyTraining } from '@constants/data';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { optionsPeriod } from '@constants/period-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    createInvite,
    createTraining,
    editTraining,
    trainingActions,
    trainingSelectors,
} from '@redux/slices';
import { optionsListBuilder } from '@utils/options-list-builder';
import { Button, Checkbox, Form, Row, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import styles from './add-training-form-list.module.css';

export const AddTrainingFormList = () => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const exercises = Form.useWatch('exercises', form);
    const periodChecked = Form.useWatch(['parameters', 'repeat'], form);

    const [exerciseChecked, setExerciseChecked] = useState<number[]>([]);

    const userJointTraining = useAppSelector(trainingSelectors.userJointTraining);
    const trainingsList = useAppSelector(trainingSelectors.trainingsList);
    const editableTraining = useAppSelector(trainingSelectors.editableTraining);
    const isOpen = useAppSelector(trainingSelectors.isDrawerAddExercisesOpen);
    const drawerType = useAppSelector(trainingSelectors.drawerType);

    useEffect(() => {
        if (!isOpen) {
            form.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const optionsList = optionsListBuilder(trainingsList, []);

    const disabledDate = (current: Dayjs): boolean => {
        const today = dayjs().startOf('day');

        return current.isBefore(today) || current.isSame(today, 'day');
    };

    const changeSelectedTrainingHandler = (value: string) => {
        dispatch(trainingActions.setSelectedTraining({ training: value }));
    };

    const onFinishHandler = (allValues: FormListFieldData) => {
        const payload: TrainingPayload = {
            ...allValues,
            exercises: allValues.exercises as unknown as Exercise[],
            date: allValues.date.toISOString(),
        };

        if (drawerType === DrawerType.EDIT && editableTraining !== null) {
            const { _id: trainingId } = editableTraining;

            dispatch(editTraining({ trainingId, payload }));
        }
        if (drawerType === DrawerType.ADD) {
            dispatch(createTraining(payload));
        }
        if (drawerType === DrawerType.INVITE && userJointTraining?.id) {
            dispatch(createInvite({ training: payload, id: userJointTraining?.id }));
            dispatch(
                trainingActions.updateStatusUserJointTraining({ inviteId: userJointTraining?.id }),
            );
        }
    };

    const handleFormValuesChange = (_: void, allValues: FormListFieldData) => {
        const checkedIndexes = allValues.exercises.flatMap((el, index) =>
            el.checked ? index : [],
        );

        setExerciseChecked(checkedIndexes);
    };

    const edit = {
        name: editableTraining?.name,
        date: dayjs(editableTraining?.date),
        parameters: {
            repeat: editableTraining?.parameters.repeat,
            period: editableTraining?.parameters.period,
        },
        exercises: editableTraining?.exercises.map(({ name, approaches, replays, weight }) => ({
            name,
            replays,
            weight,
            approaches,
        })),
    };

    return (
        <Fragment>
            {drawerType === DrawerType.INVITE && (
                <Row className={styles.userInfoContainer} justify='space-between' align='middle'>
                    <UserInfo
                        firstName={userJointTraining?.name}
                        imageSrc={userJointTraining?.imageSrc}
                    />
                    <TrainingBadge text={userJointTraining?.trainingType || ''} />
                </Row>
            )}

            <Form
                form={form}
                onValuesChange={handleFormValuesChange}
                onFinish={onFinishHandler}
                initialValues={drawerType === DrawerType.EDIT ? edit : emptyTraining}
            >
                <Form.Item
                    initialValue={
                        drawerType === DrawerType.INVITE && userJointTraining?.trainingType
                    }
                    name='name'
                >
                    <Select
                        disabled={drawerType === DrawerType.INVITE}
                        placeholder='Выбор типа тренировки'
                        dropdownMatchSelectWidth={false}
                        style={{
                            width: '100%',
                            textAlign: 'start',
                        }}
                        onChange={changeSelectedTrainingHandler}
                        options={optionsList}
                        data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
                    />
                </Form.Item>
                <Row justify='space-between'>
                    <Form.Item name='date'>
                        <DatePicker
                            disabledDate={disabledDate}
                            data-test-id={DATA_TEST_ID.modalDrawerRightDatePicker}
                        />
                    </Form.Item>

                    <Form.Item valuePropName='checked' name={['parameters', 'repeat']}>
                        <Checkbox data-test-id={DATA_TEST_ID.modalDrawerRightCheckboxPeriod}>
                            С периодичностью
                        </Checkbox>
                    </Form.Item>
                </Row>
                <Form.Item name={['parameters', 'period']}>
                    <Select
                        options={optionsPeriod}
                        disabled={!periodChecked}
                        data-test-id={DATA_TEST_ID.modalDrawerRightSelectPeriod}
                    />
                </Form.Item>

                <Form.List name='exercises'>
                    {(fields, { add, remove }) => (
                        <Fragment>
                            {fields?.map((field) => (
                                <AddExerciseItem
                                    field={field}
                                    key={`AddTrainingFormList${field.key}`}
                                />
                            ))}
                            <Row justify='space-around' style={{ marginTop: 'var(--gap-xl)' }}>
                                <Form.Item>
                                    <Button
                                        onClick={() => add(emptyExercisePlan)}
                                        icon={<PlusOutlined />}
                                        type='link'
                                    >
                                        Добавить ещё
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        onClick={() => remove(exerciseChecked)}
                                        icon={<CloseOutlined />}
                                        disabled={exerciseChecked?.length === 0}
                                        type='text'
                                    >
                                        Удалить
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Fragment>
                    )}
                </Form.List>
                <Form.Item>
                    <Button
                        block={true}
                        type='primary'
                        disabled={!exercises?.[0].name}
                        htmlType='submit'
                    >
                        {drawerType === DrawerType.INVITE ? 'Отправить приглашение' : 'Сохранить'}
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

type FormListFieldData = {
    name: string;
    date: Dayjs;
    parameters: Parameters;
    exercises: Exercise & Array<{ checked: boolean }>;
};
