import { Key } from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsDataType } from '@common-types/training';
import { TrainingBadge } from '@components/training-badge';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { periodTraining } from '@constants/period-training';
import { Row, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const getColumns = (onClick: Arg): ColumnsType<ColumnsDataType> => [
    {
        title: 'Тип тренировки',
        dataIndex: 'type',
        key: 'type',
        render: (text) => (
            <Row justify='space-between'>
                <TrainingBadge text={text} />
                <DownOutlined
                    style={{ color: 'var(--neutral-gray-10)', fontSize: 'var(--font-size-xs)' }}
                />
            </Row>
        ),
    },
    {
        title: 'Периодичность',
        dataIndex: 'period',
        key: 'period',
        sorter: (a, b) => a.period - b.period,

        render: (text, { key }, index) => (
            <Row justify='space-between'>
                <Typography.Text>{periodTraining[text]}</Typography.Text>
                <EditOutlined
                    onClick={() => onClick(key)}
                    data-test-id={`${DATA_TEST_ID.updateMyTrainingTableIcon}${index}`}
                    style={{ color: 'var(--primary-light-6)', fontSize: 'var(--font-size-xl)' }}
                />
            </Row>
        ),
    },
];

type Arg = (key: Key) => void;
