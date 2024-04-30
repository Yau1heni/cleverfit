import { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ClickableDiv } from '@components/clickable-div';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './trapezoid-button.module.css';

export const TrapezoidButton: FC<Props> = ({ collapsed, toggleCollapsed, dataTestId }) => {
    const { xs } = useBreakpoint();

    const leftPositionValue = collapsed ? { left: '0' } : { left: '106px' };
    const buttonPositionStyle = xs ? leftPositionValue : {};

    return (
        <ClickableDiv
            dataTestId={dataTestId}
            className={styles.trapezoid}
            style={buttonPositionStyle}
            onClick={toggleCollapsed}
        >
            <span>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </ClickableDiv>
    );
};

type Props = {
    collapsed: boolean;
    toggleCollapsed: () => void;
    dataTestId: string;
};
