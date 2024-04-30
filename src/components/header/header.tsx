import { SettingsButton } from '@components/settings';
import { Col, Row, Typography } from 'antd';

import styles from './header.module.css';

export const Header = () => (
    <div className={styles.header}>
        <Row justify='space-between' gutter={16}>
            <Col span={20}>
                <Typography.Text className={styles.text}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </Typography.Text>
            </Col>
            <Col span={4}>
                <SettingsButton />
            </Col>
        </Row>
    </div>
);
