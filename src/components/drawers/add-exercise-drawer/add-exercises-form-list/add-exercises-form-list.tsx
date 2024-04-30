import { Fragment, useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Exercise } from '@common-types/training';
import { emptyExercises } from '@constants/data';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { Button, Form, Row } from 'antd';

import { AddExerciseItem } from './add-exercise-item/add-exercise-item.tsx';

export const AddExercisesFormList = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const [exerciseChecked, setExerciseChecked] = useState<number[]>([]);

    const selectedTraining = useAppSelector(trainingSelectors.selectedTraining);
    const exercises = useAppSelector(trainingSelectors.exercises);
    const isOpen = useAppSelector(trainingSelectors.isDrawerAddExercisesOpen);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const formInitialValues =
        exercises && Object.keys(exercises)[0] === 'empty'
            ? [emptyExercises]
            : exercises[selectedTraining];

    const handleFormValuesChange = (_: void, allValues: FormListFieldData) => {
        const checkedIndexes = allValues.items.flatMap((el, index) => (el.checked ? index : []));

        setExerciseChecked(checkedIndexes);

        const exercisesWithoutCheckedField = allValues.items.map(
            ({ checked, ...exercise }) => exercise,
        );

        dispatch(
            trainingActions.setExercises({
                trainingType: selectedTraining,
                exercises: exercisesWithoutCheckedField as Exercise[],
            }),
        );
    };

    return (
        <Form
            form={form}
            onValuesChange={handleFormValuesChange}
            initialValues={{
                items: formInitialValues?.map((item) => ({
                    ...item,
                    checked: false,
                })),
            }}
        >
            <Form.List name='items'>
                {(fields, { add, remove }) => (
                    <Fragment>
                        {fields?.map((field) => (
                            <AddExerciseItem
                                field={field}
                                key={`AddExercisesFormList${field.key}`}
                            />
                        ))}
                        <Row justify='center' style={{ marginTop: 'var(--gap-xl)' }}>
                            <Form.Item>
                                <Button
                                    onClick={() => add(emptyExercises)}
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
        </Form>
    );
};

type FormListFieldData = {
    items: Exercise & Array<{ checked?: boolean }>;
};
