import { FC } from 'react';
import { WorkoutDataAverageWeight } from '@common-types/achievements';
import { getWeekdayName, getWeekdayNumber } from '@utils/achievements';
import { Badge, List, Row, Typography } from 'antd';

import styles from './average-daily-load.module.css';

type AverageDailyLoadContentProps = {
    dataSource: WorkoutDataAverageWeight;
};

export const AverageDailyLoadContent: FC<AverageDailyLoadContentProps> = ({ dataSource }) => (
    <List
        grid={{ column: 1 }}
        itemLayout='horizontal'
        dataSource={dataSource}
        renderItem={({ date, averageWeight }, index) => (
            <Row className={styles.renderItemContainer}>
                {averageWeight === 0 ? (
                    <Badge
                        className={styles.renderItem}
                        count={getWeekdayNumber(date)}
                        status='default'
                    />
                ) : (
                    <Badge showZero={true} count={getWeekdayNumber(date)} color='blue' />
                )}
                <Typography.Text className={styles.renderItem}>
                    {getWeekdayName(index)}
                </Typography.Text>
                {averageWeight !== 0 && (
                    <Typography.Text className={styles.renderItem}>
                        {averageWeight} кг
                    </Typography.Text>
                )}
            </Row>
        )}
    />
);
