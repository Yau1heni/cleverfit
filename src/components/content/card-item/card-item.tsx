import { FC, ReactNode } from 'react';
import { Button, Card, Typography } from 'antd';

import styles from './card-item.module.css';

export const CardItem: FC<Props> = (props) => {
    const { title, text, Icon, dataTestId, onclick } = props;

    const navigateToHandler = () => {
        onclick();
    };

    return (
        <Card
            actions={[
                <Button
                    icon={Icon}
                    type='link'
                    onClick={navigateToHandler}
                    data-test-id={dataTestId}
                >
                    {text}
                </Button>,
            ]}
            hoverable={true}
        >
            <Typography.Text className={styles.text}>{title}</Typography.Text>
        </Card>
    );
};

type Props = {
    title: string;
    text: string;
    Icon: ReactNode;
    dataTestId: string;
    onclick: () => void;
};
