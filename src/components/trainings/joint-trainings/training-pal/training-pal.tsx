import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Typography } from 'antd';

import styles from './training-pal.module.css';

export const TrainingPal: FC<Props> = (props) => {
    const {
        imageSrc,
        trainingType,
        onClick,
        name,
        searchPart,
        avgWeightInWeek,
        direction = 'vertical',
    } = props;

    const avatar = imageSrc ? (
        <Avatar src={imageSrc} alt='avatar' />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    const nameRender = () => {
        if (searchPart && searchPart.trim() === '') {
            return null;
        }

        const regex = new RegExp(`(${searchPart})`, 'gi');
        const parts = name.split(regex);

        return parts.map((part) => {
            if (regex.test(part)) {
                return (
                    <span key={`${part}-active`} style={{ color: 'var(--character-light-red-4)' }}>
                        {part}
                    </span>
                );
            }

            return <span key={part}>{part}</span>;
        });
    };

    return (
        <Row
            onClick={onClick}
            className={direction === 'horizontal' ? styles.container : undefined}
        >
            <Row className={styles.userInfo}>
                {avatar}
                <Typography.Text>{searchPart ? nameRender() : name}</Typography.Text>
            </Row>
            <Col span={direction === 'horizontal' ? 12 : 24}>
                <Col push={direction === 'horizontal' ? 8 : 0}>
                    <Typography.Text type='secondary'>Тип тренировки: </Typography.Text>
                    <Typography.Text style={{ color: 'var(--primary-light-6)' }}>
                        {trainingType}
                    </Typography.Text>
                </Col>
                <Col push={direction === 'horizontal' ? 8 : 0}>
                    <Typography.Text type='secondary'>Средняя нагрузка: </Typography.Text>
                    <Typography.Text style={{ color: 'var(--primary-light-6)' }}>
                        {avgWeightInWeek} кг/нед
                    </Typography.Text>
                </Col>
            </Col>
        </Row>
    );
};

type Props = {
    imageSrc?: string;
    name: string;
    searchPart?: string;
    trainingType: string;
    avgWeightInWeek: number;
    onClick?: () => void;
    direction?: 'vertical' | 'horizontal';
};
