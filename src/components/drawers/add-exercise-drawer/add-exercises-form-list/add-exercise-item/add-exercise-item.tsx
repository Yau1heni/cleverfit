import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Checkbox,
    Col,
    Form,
    FormListFieldData,
    Input,
    InputNumber,
    Row,
    Space,
    Typography,
} from 'antd';
import classNames from 'classnames/bind';

import styles from './add-exercise-item.module.css';

const cx = classNames.bind(styles);

type AddExerciseItemProps = {
    field: FormListFieldData;
    key: string;
};

export const AddExerciseItem: FC<AddExerciseItemProps> = ({ field, key }) => (
    <div key={`AddExerciseItem${key}`}>
        <Row style={{ width: '100%' }}>
            <Col span={21}>
                <Form.Item {...field} name={[field.name, 'name']}>
                    <Input
                        data-test-id={`modal-drawer-right-input-exercise${field.name}`}
                        autoFocus={true}
                        placeholder='Упражнение'
                    />
                </Form.Item>
            </Col>

            <Form.Item
                className={styles.checkboxContainer}
                {...field}
                valuePropName='checked'
                name={[field.name, 'checked']}
            >
                <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${field.name}`} />
            </Form.Item>
        </Row>
        <Space.Compact block={true}>
            <Col>
                <Typography.Text className={cx(styles.quantityText, styles.quantity)}>
                    Подходы, раз
                </Typography.Text>
                <Form.Item
                    {...field}
                    name={[field.name, 'replays']}
                    data-test-id={`modal-drawer-right-input-quantity${field.name}`}
                >
                    <InputNumber
                        className={styles.quantity}
                        controls={false}
                        addonBefore={<PlusOutlined />}
                    />
                </Form.Item>
            </Col>
            <Col>
                <Typography.Text className={cx(styles.quantityText, styles.weight)}>
                    Вес, кг
                </Typography.Text>
                <div className={styles.inputWeightContainer}>
                    <Form.Item
                        {...field}
                        name={[field.name, 'weight']}
                        data-test-id={`modal-drawer-right-input-weight${field.name}`}
                    >
                        <InputNumber controls={false} />
                    </Form.Item>
                    <div className={styles.multiplier}>x</div>
                </div>
            </Col>

            <Col>
                <Typography.Text className={styles.quantityText}>Количество</Typography.Text>
                <Form.Item
                    {...field}
                    name={[field.name, 'approaches']}
                    data-test-id={`modal-drawer-right-input-approach${field.name}`}
                >
                    <InputNumber controls={false} />
                </Form.Item>
            </Col>
        </Space.Compact>
    </div>
);
