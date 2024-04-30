import { ReactNode } from 'react';
import { Badge } from 'antd';
import type { ScreenMap } from 'antd/es/_util/responsiveObserve';

type TabItem = {
    label: ReactNode;
    key: string;
    children: ReactNode;
    disabled?: boolean;
    withNotification?: boolean;
};

export const itemsTabsBuilder = (items: TabItem[], notificationCount?: number): TabItem[] =>
    items.map(({ key, children, disabled, label, withNotification }) => {
        if (withNotification) {
            return {
                label:
                    notificationCount === 0 ? (
                        label
                    ) : (
                        <Badge count={notificationCount}>{label}</Badge>
                    ),
                key,
                children,
            };
        }

        return {
            key,
            children,
            label,
            disabled,
        };
    });

export const tabBarGutterBuilder = ({ xs, sm, xl, lg, md }: ScreenMap) => {
    if (xl) return 120;
    if (lg) return 100;
    if (md) return 80;
    if (sm) return 60;
    if (xs) return 10;

    return 160;
};
