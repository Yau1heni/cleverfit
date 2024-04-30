import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export type PropsSidebarDesktop = {
    isCollapsed: boolean;
    logout: () => void;
    onClick: (key: string) => void;
};
export type PropsSidebarMobile = {
    toggleCollapsed: () => void;
    collapsed: boolean;
    logout: () => void;
    onClick: (key: string) => void;
};
