import { FC } from 'react';
import { PeriodType, WorkoutDataAverageWeight } from '@common-types/achievements';
import { List } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { AverageDailyLoad } from '../average-daily-load/average-daily-load.tsx';

type AverageDailyLoadPerMonthProps = { dataSource: WorkoutDataAverageWeight };

export const AverageDailyLoadPerMonth: FC<AverageDailyLoadPerMonthProps> = ({ dataSource }) => {
    const { lg } = useBreakpoint();

    const subArrays = [];
    const chunkSize = PeriodType.WEEK;

    let index = 0;

    while (index < dataSource.length) {
        subArrays.push(dataSource.slice(index, index + chunkSize));
        index += chunkSize;
    }

    return (
        <List
            grid={{ column: lg ? 4 : 1, gutter: 16 }}
            itemLayout='horizontal'
            dataSource={subArrays}
            renderItem={(data) => (
                <AverageDailyLoad
                    dataSource={data}
                    title={`Неделя ${data[0].date} - ${data[data.length - 1].date}`}
                />
            )}
        />
    );
};
