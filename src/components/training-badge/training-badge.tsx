import { FC } from 'react';
import { ColorBadge } from '@common-types/training';
import { Badge, Typography } from 'antd';

export const TrainingBadge: FC<Props> = ({ text }) => (
    <Badge
        text={<Typography.Text>{text}</Typography.Text>}
        color={ColorBadge[text as keyof typeof ColorBadge]}
    />
);

type Props = {
    text: string;
};
