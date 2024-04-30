import { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TypeTitle } from '@common-types/common-types.ts';
import { Breadcrumbs } from '@components/breadcrumbs';
import { Button, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const BasicHeaderTitle: FC<Props> = ({ typeTitle, title, onclick, dataTestId }) => {
    const { xs } = useBreakpoint();

    const buttonStyle = xs
        ? {}
        : { fontSize: 'var(--font-size-l)', fontWeight: 'var(--font-weight-xl)' };

    switch (typeTitle) {
        case 'button':
            return (
                <Button
                    style={buttonStyle}
                    type='text'
                    onClick={onclick}
                    icon={<ArrowLeftOutlined style={{ fontSize: 'var(--font-size-s)' }} />}
                    data-test-id={dataTestId}
                >
                    {title}
                </Button>
            );
        case 'text':
            return <Typography.Title level={xs ? 5 : 4}>{title}</Typography.Title>;
        case 'breadcrumb':
            return <Breadcrumbs />;
        default:
            return <div>header</div>;
    }
};

type Props = {
    title?: string;
    onclick?: () => void;
    dataTestId?: string;
    typeTitle: TypeTitle;
};
