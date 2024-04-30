import { FC } from 'react';
import { StarFilled, StarTwoTone, UserOutlined } from '@ant-design/icons';
import { Feedback } from '@common-types/feedback';
import { DateFormat } from '@common-types/training';
import { formatDate } from '@utils/format-date';
import { Avatar, Col, Rate, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './feedback-item.module.css';

export const FeedbackItem: FC<Props> = ({ feedback }) => {
    const { createdAt, message, rating, imageSrc, fullName } = feedback;

    const { xs } = useBreakpoint();

    const avatar =
        feedback.imageSrc === null ? (
            <Avatar size={64} icon={<UserOutlined />} />
        ) : (
            <Avatar size={64} src={imageSrc} alt='avatar' />
        );

    const characterRateHandler = ({ index, value }: { index?: number; value?: number }) => {
        if (index !== undefined && value !== undefined) {
            if (index < value) {
                return <StarFilled style={{ color: '#faad14' }} />;
            }

            return <StarTwoTone twoToneColor='#faad14' />;
        }

        return null;
    };

    return (
        <Row className={styles.feedbackItem}>
            <Col lg={4} sm={8} xs={24}>
                <div className={styles.userInfo}>
                    {avatar}
                    <Typography.Title level={5} className={styles.fullName}>
                        {fullName ?? 'Пользователь'}
                    </Typography.Title>
                </div>
            </Col>
            <Col lg={20} sm={16} xs={24}>
                <div>
                    <Rate
                        value={rating}
                        disabled={true}
                        character={characterRateHandler}
                        className={styles.rating}
                    />
                    {!xs && (
                        <Typography.Text type='secondary'>
                            {formatDate({
                                date: createdAt,
                                format: DateFormat.EURO_DATE,
                            })}
                        </Typography.Text>
                    )}
                </div>
                <Typography.Paragraph type='secondary'>{message}</Typography.Paragraph>
            </Col>
        </Row>
    );
};

type Props = {
    feedback: Feedback;
};
