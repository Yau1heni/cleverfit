import EmptyLogo from '@assets/icons/empty-image.svg?react';
import { Empty } from 'antd';

export const TrainingListEmpty = () => (
    <Empty description={null} image={<EmptyLogo width={32} height={32} />} />
);
