import { useEffect } from 'react';
import { BasicLayout } from '@components/layout';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingList } from '@redux/slices';
import {
    itemsAchievementsTabsBuilder,
    itemsTabsBuilder,
    tabBarGutterBuilder,
} from '@utils/tabs-items';
import { Tabs } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();

    const items = itemsTabsBuilder(itemsAchievementsTabsBuilder);
    const tabBarGutter = tabBarGutterBuilder(breakpoint);

    useEffect(() => {
        dispatch(getTrainingList());
    }, [dispatch]);

    return (
        <BasicLayout typeTitle='breadcrumb'>
            <Tabs
                centered={breakpoint.xs}
                style={{ height: '100%' }}
                tabBarGutter={tabBarGutter}
                items={items}
            />
        </BasicLayout>
    );
};

export default AchievementsPage;
