import { FC } from 'react';
import Exit from '@assets/icons/exit.svg?react';
import Logo from '@assets/icons/logo.svg?react';
import ShortLogo from '@assets/icons/short-logo.svg?react';
import { itemsSideBarBuilder } from '@components/sidebar/data/items.tsx';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelectors } from '@redux/slices';
import { Button, Layout, Menu } from 'antd';

import { PropsSidebarDesktop } from '../types/types.ts';

import styles from './sidebar-desktop.module.css';

export const SidebarDesktop: FC<PropsSidebarDesktop> = ({ isCollapsed, logout, onClick }) => {
    const inviteList = useAppSelector(trainingSelectors.inviteList);
    const count = inviteList.length;

    const itemsSideBar = itemsSideBarBuilder(count);

    return (
        <Layout.Sider
            width={208}
            collapsedWidth={64}
            trigger={null}
            theme='light'
            collapsible={true}
            collapsed={isCollapsed}
        >
            <div className={styles.logo}>
                {isCollapsed ? (
                    <ShortLogo height={32} width={32} />
                ) : (
                    <Logo height={32} width={132} />
                )}
            </div>

            <Menu onClick={({ key }) => onClick(key)} items={itemsSideBar} />

            <Button
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}
                type='text'
                onClick={logout}
                icon={<Exit style={{ marginRight: 'var(--gap-xl)' }} />}
            >
                {!isCollapsed && 'Выход'}
            </Button>
        </Layout.Sider>
    );
};
