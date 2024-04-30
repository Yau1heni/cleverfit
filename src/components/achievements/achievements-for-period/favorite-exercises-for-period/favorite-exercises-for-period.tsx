import { FC, Fragment } from 'react';
import { PeriodType, WorkoutDataExercises } from '@common-types/achievements';
import { getWeekdayName, getWeekdayNumber } from '@utils/achievements';
import { Badge, Col, List, Row, Typography } from 'antd';

import styles from './favorite-exercises-for-period.module.css';

type FavoriteExercisesForPeriodProps = {
    period: PeriodType;
    popularExercises: WorkoutDataExercises;
};

export const FavoriteExercisesForPeriod: FC<FavoriteExercisesForPeriodProps> = (props) => {
    const { period, popularExercises } = props;

    return (
        <Fragment>
            <Col span={24}>
                <Typography.Text>Самые частые упражнения</Typography.Text>
            </Col>
            <Typography.Text>по дням недели</Typography.Text>

            <List
                grid={{ column: 1 }}
                dataSource={popularExercises}
                renderItem={({ date, exercise }, index) => (
                    <Row className={styles.renderItemContainer}>
                        <Badge
                            className={styles.renderItem}
                            showZero={true}
                            count={period === PeriodType.WEEK ? getWeekdayNumber(date) : +date + 1}
                            color='red'
                        />
                        <Typography.Text className={styles.renderItem}>
                            {getWeekdayName(index)}
                        </Typography.Text>
                        <Typography.Text className={styles.renderItem}>{exercise}</Typography.Text>
                    </Row>
                )}
            />
        </Fragment>
    );
};
