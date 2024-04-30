import { FC, Fragment } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Image, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const SettingsTariffCard: FC<Props> = (props) => {
    const { typeCard, imageSrc, onClick, dateActiveTo, isActivityPRO = false, dateTestId } = props;

    const { xs } = useBreakpoint();
    const tariffTitle = typeCard === 'FREE' ? 'FREE tariff' : 'PRO tariff';

    const activeStatusProCard = isActivityPRO ? (
        <Typography.Title
            level={5}
            style={{
                color: 'var(--primary-light-10)',
                margin: 'var(--gap-xl) var(--gap-xs)',
            }}
        >{`активен до ${dateActiveTo}`}</Typography.Title>
    ) : (
        <Button
            type='primary'
            style={{
                margin: 'var(--gap-2xl) 0',
            }}
            onClick={onClick}
            data-test-id='activate-tariff-btn'
        >
            Активировать
        </Button>
    );

    const activeStatus = (
        <Row justify='center' align='middle'>
            {typeCard === 'FREE' ? (
                <Fragment>
                    <Typography.Title
                        onClick={onClick}
                        level={5}
                        style={{
                            color: 'var(--primary-light-10)',
                            margin: 'var(--gap-xl) var(--gap-xs)',
                        }}
                    >
                        активен
                    </Typography.Title>
                    <CheckOutlined />
                </Fragment>
            ) : (
                activeStatusProCard
            )}
        </Row>
    );

    return (
        <Card
            hoverable={true}
            bodyStyle={
                xs
                    ? { padding: 0 }
                    : {
                          padding: 'var(--gap-xs) 0',
                          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
                      }
            }
            bordered={false}
            data-test-id={dateTestId}
        >
            <div>
                <Row justify='space-around' align='middle'>
                    <Typography.Title level={5}>{tariffTitle}</Typography.Title>
                    <Button type='link' style={{ marginBottom: 'var(--gap-xs)' }} onClick={onClick}>
                        Подробнее
                    </Button>
                </Row>
                <Image src={imageSrc} width={xs ? 312 : 240} preview={false} />
                {activeStatus}
            </div>
        </Card>
    );
};

type Props = {
    typeCard?: 'PRO' | 'FREE';
    onClick?: () => void;
    imageSrc: string;
    isActivityPRO?: boolean;
    dateActiveTo?: string;
    dateTestId?: string;
};
