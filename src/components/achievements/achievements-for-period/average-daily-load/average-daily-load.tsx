import { FC, Fragment } from 'react';
import { WorkoutDataAverageWeight } from '@common-types/achievements';
import { Collapse, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { AverageDailyLoadContent } from './average-daily-load-content.tsx';

const { Panel } = Collapse;

type AverageDailyLoadProps = {
    dataSource: WorkoutDataAverageWeight;
    title: string;
};

export const AverageDailyLoad: FC<AverageDailyLoadProps> = ({ dataSource, title }) => {
    const { lg } = useBreakpoint();

    return lg ? (
        <Fragment>
            <Typography.Text>{title}</Typography.Text>
            <AverageDailyLoadContent dataSource={dataSource} />
        </Fragment>
    ) : (
        <Collapse>
            <Panel header={title} key={title}>
                <AverageDailyLoadContent dataSource={dataSource} />
            </Panel>
        </Collapse>
    );
};
