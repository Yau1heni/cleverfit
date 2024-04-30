import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileActions, profileSelectors, updateUser } from '@redux/slices';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { SettingAdditionalItem } from './settings-additional-item/settings-additional-item.tsx';

export const SettingsAdditional = () => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();
    const user = useAppSelector(profileSelectors.user);

    const onChangeReadyForJointTraining = (checked: boolean) => {
        dispatch(profileActions.setIsReadyForJointTraining({ isReady: checked }));
        dispatch(updateUser({ readyForJointTraining: checked }));
    };

    const onChangeSendNotification = (checked: boolean) => {
        dispatch(profileActions.setIsSendNotification({ isSend: checked }));
        dispatch(updateUser({ sendNotification: checked }));
    };

    return (
        <div style={{ marginBottom: xs ? 'var(--gap-xl)' : '110px' }}>
            <SettingAdditionalItem
                title='Открыт для совместных тренировок'
                tooltipTitle='включеная функция позволит участвовать в совместных тренировках'
                onChange={onChangeReadyForJointTraining}
                checked={!!user?.readyForJointTraining}
                dateTestId={{
                    iconId: 'tariff-trainings-icon',
                    switchId: 'tariff-trainings',
                }}
            />
            <SettingAdditionalItem
                title='Уведомления'
                tooltipTitle='включеная функция позволит получать уведомления об активностях'
                onChange={onChangeSendNotification}
                checked={!!user?.sendNotification}
                dateTestId={{
                    iconId: 'tariff-notifications-icon',
                    switchId: 'tariff-notifications',
                }}
            />
            <SettingAdditionalItem
                title='Темная тема'
                tooltipTitle='темная тема доступна для PRO tarif'
                dateTestId={{
                    iconId: 'tariff-theme-icon',
                    switchId: 'tariff-theme',
                }}
                switchDisabled={!user?.tariff}
            />
        </div>
    );
};
