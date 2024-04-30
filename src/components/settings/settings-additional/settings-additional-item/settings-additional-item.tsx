import { FC } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Switch, Tooltip, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './settings-additional-item.module.css';

export const SettingAdditionalItem: FC<Props> = (props) => {
    const { tooltipTitle, title, onChange, checked, dateTestId, switchDisabled = false } = props;
    const { xs } = useBreakpoint();

    return (
        <Row justify='space-between' className={styles.container}>
            <Col span={20}>
                <Typography.Text strong={true} disabled={switchDisabled} className={styles.text}>
                    {title}
                </Typography.Text>
                <Tooltip placement={xs ? 'top' : 'bottom'} title={tooltipTitle}>
                    <InfoCircleOutlined data-test-id={dateTestId?.iconId} className={styles.icon} />
                </Tooltip>
            </Col>
            <Col span={2}>
                <Switch
                    size={xs ? 'small' : 'default'}
                    disabled={switchDisabled}
                    data-test-id={dateTestId?.switchId}
                    defaultChecked={checked}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

type Props = {
    title: string;
    tooltipTitle: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    dateTestId?: { iconId: string; switchId: string };
    switchDisabled?: boolean;
};
