import { useEffect } from 'react';
import { BasicLayout } from '@components/layout';
import { ErrorTrainingModal } from '@components/modals';
import { AddTrainingFormList, TrainingDrawer } from '@components/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useRetryHandler } from '@hooks/use-retry-handler.ts';
import { getTrainingList, trainingActions, trainingSelectors } from '@redux/slices';
import { itemsTabsBuilder, itemsTrainingTabs, tabBarGutterBuilder } from '@utils/tabs-items';
import { Tabs } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const TrainingsPage = () => {
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();

    const inviteList = useAppSelector(trainingSelectors.inviteList);
    const isErrorOpened = useAppSelector(trainingSelectors.isErrorOpened);
    const isErrorSaving = useAppSelector(trainingSelectors.isErrorSave);

    const [onRetryHandler] = useRetryHandler();

    const tabBarGutter = tabBarGutterBuilder(breakpoint);

    const clearError = () => {
        dispatch(trainingActions.setIsErrorSaveTraining({ isError: false }));
        dispatch(trainingActions.setIsErrorOpened({ isError: false }));
    };

    const items = itemsTabsBuilder(itemsTrainingTabs, inviteList.length);

    useEffect(() => {
        dispatch(getTrainingList());
    }, [dispatch]);

    return (
        <BasicLayout typeTitle='breadcrumb'>
            <Tabs centered={breakpoint.xs} tabBarGutter={tabBarGutter} items={items} />
            <TrainingDrawer>
                <AddTrainingFormList />
            </TrainingDrawer>
            <ErrorTrainingModal
                clearError={clearError}
                isErrorOpened={isErrorOpened}
                isErrorSaving={isErrorSaving}
                onRetry={onRetryHandler}
            />
        </BasicLayout>
    );
};
