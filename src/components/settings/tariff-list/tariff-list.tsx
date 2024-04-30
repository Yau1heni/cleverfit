import { FC, Fragment } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileSelectors } from '@redux/slices';
import { List, Radio, Typography } from 'antd';

import { TariffListItem } from './tariff-list-item/tariff-list-item.tsx';

export const TariffList: FC<Props> = ({ setDisabledPay }) => {
    const tariffList = useAppSelector(profileSelectors.tariffList);

    const onChange = () => {
        setDisabledPay(false);
    };

    return (
        <Fragment>
            <Typography.Text strong={true}>Сравнить тарифы</Typography.Text>
            <List
                itemLayout='horizontal'
                dataSource={tariffList}
                renderItem={({ periods, _id: id }) => (
                    <List.Item>
                        <Radio.Group onChange={onChange}>
                            <TariffListItem periods={periods} id={id} />
                        </Radio.Group>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

type Props = {
    setDisabledPay: (disabledPay: boolean) => void;
};
