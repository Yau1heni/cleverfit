import { FC } from 'react';
import { Paths } from '@common-types/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { authActions } from '@redux/slices';
import { navigateTo } from '@utils/navigate-to';
import { onPageTurn } from '@utils/on-page-turn';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { SidebarDesktop } from './sidebar-desktop/sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile/sidebar-mobile';

export const Sidebar: FC<Props> = ({ collapsed, toggleCollapsed }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const onPageTurnHandler = (key: string) => {
        onPageTurn(key, dispatch);
    };

    const logoutHandler = () => {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        dispatch(authActions.setAccessToken({ accessToken: null }));
        navigateTo({ dispatch, toPath: Paths.AUTH });
    };

    return xs ? (
        <SidebarMobile
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            logout={logoutHandler}
            onClick={onPageTurnHandler}
        />
    ) : (
        <SidebarDesktop
            onClick={onPageTurnHandler}
            isCollapsed={collapsed}
            logout={logoutHandler}
        />
    );
};

type Props = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};
