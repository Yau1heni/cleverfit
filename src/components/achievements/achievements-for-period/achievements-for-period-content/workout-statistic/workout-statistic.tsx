import { FC } from 'react';
import { PeriodType } from '@common-types/achievements';
import { getAverageWeightPerDay, getWorkoutStatistics } from '@utils/achievements';
import { Card, List, Statistic } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

type WorkoutStatisticProps = {
    period: PeriodType;
    totalWeight: number;
    totalApproaches: number;
    totalReplays: number;
};
export const WorkoutStatistic: FC<WorkoutStatisticProps> = (props) => {
    const { period, totalWeight, totalReplays, totalApproaches } = props;

    const { lg } = useBreakpoint();

    const averageWeightPerDay = getAverageWeightPerDay(totalWeight, period);
    const generalInformation = getWorkoutStatistics({
        totalWeight,
        totalReplays,
        totalApproaches,
        averageWeightPerDay,
    });

    return (
        <List
            grid={{ column: lg ? 4 : 1 }}
            itemLayout='horizontal'
            dataSource={generalInformation}
            renderItem={({ title, value, id }) => (
                <Card key={id}>
                    <Statistic precision={0} title={title} value={value} />
                </Card>
            )}
        />
    );
};
