import { FC } from 'react';
import Logo from '@assets/icons/logo.svg?react';
import { PropsSidebarMobile } from '@components/sidebar/types/types.ts';
import { TrapezoidButton } from '@components/trapezoid-button';
import { Button, Layout, Menu } from 'antd';

import { itemsSideBarMobile } from '../data/items.tsx';

import styles from './sidebar-mobile.module.css';

export const SidebarMobile: FC<PropsSidebarMobile> = ({
    toggleCollapsed,
    collapsed,
    logout,
    onClick,
}) => (
    <div>
        <Layout.Sider
            collapsedWidth={0}
            trigger={null}
            width={106}
            style={{
                position: 'fixed',
                height: '100%',
                zIndex: 100,
                left: 0,
                top: 0,
                bottom: 0,
            }}
            theme='light'
            collapsible={true}
            collapsed={collapsed}
        >
            <div className={styles.logo}>
                <Logo height={18} width={72} />
            </div>

            <Menu onClick={({ key }) => onClick(key)} items={itemsSideBarMobile} />

            <TrapezoidButton
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
                dataTestId='sider-switch-mobile'
            />

            {!collapsed && (
                <Button
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '0',
                    }}
                    type='text'
                    onClick={logout}
                >
                    Выход
                </Button>
            )}
        </Layout.Sider>
    </div>
);
