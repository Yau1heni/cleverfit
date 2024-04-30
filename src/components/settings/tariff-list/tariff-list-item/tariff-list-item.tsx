import { FC } from 'react';
import { Period } from '@common-types/profile';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { profileActions } from '@redux/slices';
import { Col, List, Radio, RadioChangeEvent, Row, Typography } from 'antd';

export const TariffListItem: FC<Props> = ({ periods, id }) => {
    const dispatch = useAppDispatch();

    const onChange = (e: RadioChangeEvent) => {
        const payload = { days: e.target.value, tariffId: id };

        dispatch(profileActions.setPayTariffData({ tariffData: payload }));
    };

    const renderCost = (cost: number) => (
        <Typography.Title level={5}>{`${cost.toString().replace('.', ',')} $`}</Typography.Title>
    );

    return (
        <List
            dataSource={periods}
            grid={{
                column: 1,
            }}
            renderItem={({ days, cost, text }) => (
                <List.Item data-test-id='tariff-cost'>
                    <Row justify='space-between'>
                        <Col span={12}>
                            <Typography.Text>{text}</Typography.Text>
                        </Col>
                        <Col span={5} push={1}>
                            {renderCost(cost)}
                        </Col>
                        <Col span={1} pull={1}>
                            <Radio
                                data-test-id={`tariff-${cost}`}
                                onChange={onChange}
                                value={days}
                            />
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );
};

type Props = {
    periods: Period[];
    id: string;
};
