import { FC, Fragment } from 'react';
import { DateFormat, TrainingDetails } from '@common-types/training';
import { TrainingBadge } from '@components/training-badge';
import { periodTraining } from '@constants/period-training';
import { formatDate } from '@utils/format-date';
import { Col, List, Row, Typography } from 'antd';

type InviteModalContentProps = { trainingDetails: TrainingDetails };

export const InviteModalContent: FC<InviteModalContentProps> = ({ trainingDetails }) => (
    <Fragment>
        <TrainingBadge text={trainingDetails?.name} />

        <Row
            justify='space-between'
            style={{ marginBottom: 'var(--gap-xs)', marginTop: 'var(--gap-xl)' }}
        >
            {trainingDetails?.parameters ? (
                <Typography.Title level={5}>одиночная</Typography.Title>
            ) : (
                <div>{periodTraining[trainingDetails?.parameters?.period]}</div>
            )}
            {formatDate({
                date: trainingDetails?.date,
                format: DateFormat.EURO_DATE,
            })}
        </Row>

        <div>{periodTraining[trainingDetails?.parameters?.period]}</div>
        <List
            grid={{ column: 1, gutter: 8 }}
            dataSource={trainingDetails?.exercises}
            renderItem={({ name, replays, weight }) => (
                <Row justify='space-between'>
                    <Col>
                        <Typography.Text type='secondary'>{name}</Typography.Text>
                    </Col>
                    <Col>
                        <Typography.Text style={{ color: 'var(--primary-light-6)' }}>
                            {replays} x ({weight}) кг
                        </Typography.Text>
                    </Col>
                </Row>
            )}
        />
    </Fragment>
);
