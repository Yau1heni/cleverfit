import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import free from '@assets/image/free.png';
import pro from '@assets/image/pro.png';
import proNoActive from '@assets/image/pro-no-active.png';
import { Paths } from '@common-types/routes';
import { ChooseTariffDrawer } from '@components/drawers';
import { BasicLayout } from '@components/layout';
import { FeedbackCreateModal, TariffSuccessModal } from '@components/modals';
import { SettingsAdditional, SettingsTariffCard } from '@components/settings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { payTariff, profileActions, profileSelectors } from '@redux/slices';
import { formatDate } from '@utils/format-date';
import { navigateTo } from '@utils/navigate-to';
import { Button, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './settings-page.module.css';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { state } = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { xs } = useBreakpoint();
    const user = useAppSelector(profileSelectors.user);
    const isDrawerOpen = useAppSelector(profileSelectors.isDrawerOpen);
    const payData = useAppSelector(profileSelectors.payTariffData);

    const dateActiveTo =
        user?.tariff &&
        user.tariff?.tariffId &&
        formatDate({
            date: user.tariff.expired,
            format: 'DD.MM',
        });

    const moreDetailsHandler = () => {
        dispatch(profileActions.setIsDrawerOpen({ isOpen: true }));
    };

    const payTariffHandler = () => {
        if (payData !== null) {
            dispatch(payTariff(payData));
            dispatch(profileActions.setIsDrawerOpen({ isOpen: false }));
        }
    };

    const goToFeedbackHandler = () => {
        navigateTo({ dispatch, toPath: Paths.FEEDBACKS });
    };

    const goBackHandler = () => {
        navigateTo({ dispatch, toPath: state.from });
    };

    return (
        <BasicLayout
            onclick={goBackHandler}
            typeTitle='button'
            dataTestId='settings-back'
            title='Настройки'
        >
            <Typography.Title
                level={4}
                style={{
                    marginBottom: xs ? '0' : 'var(--gap-m)',
                    fontWeight: 'var(--font-weight-xl)',
                }}
            >
                Мой тариф
            </Typography.Title>
            <div className={styles.cardWrapper}>
                <SettingsTariffCard typeCard='FREE' imageSrc={free} onClick={moreDetailsHandler} />
                <SettingsTariffCard
                    typeCard='PRO'
                    dateActiveTo={dateActiveTo}
                    isActivityPRO={!!user?.tariff}
                    imageSrc={user?.tariff ? pro : proNoActive}
                    onClick={moreDetailsHandler}
                    dateTestId='pro-tariff-card'
                />
            </div>

            <SettingsAdditional />
            <Row>
                <Button block={xs} type='primary' size='large' onClick={() => setIsModalOpen(true)}>
                    Написать отзыв
                </Button>
                <Button block={xs} type='link' size='large' onClick={goToFeedbackHandler}>
                    Смотреть все отзывы
                </Button>
            </Row>

            <ChooseTariffDrawer
                onClick={payTariffHandler}
                isOpen={isDrawerOpen}
                dateActiveTo={dateActiveTo}
                isActive={!!user?.tariff}
                dataTestId='tariff-sider'
            />
            <TariffSuccessModal email={user?.email} />
            <FeedbackCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </BasicLayout>
    );
};
