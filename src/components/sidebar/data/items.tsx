import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';
import { PageName } from '@common-types/routes';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Badge, Typography } from 'antd';

import { MenuItem } from '../types/types.ts';

export const itemsSideBarBuilder = (badgeCount: number): MenuItem[] => [
    {
        key: PageName.CALENDAR,
        icon: <CalendarTwoTone twoToneColor={['var(--blue-light-9)', 'var(--blue-light-9)']} />,
        label: <Typography.Text>Календарь</Typography.Text>,
    },
    {
        key: PageName.TRAININGS,
        icon: (
            <Badge
                data-test-id={DATA_TEST_ID.notificationAboutJointTraining}
                count={badgeCount}
                size='small'
            >
                <HeartFilled
                    style={{ color: 'var(--blue-light-9)' }}
                    data-test-id={DATA_TEST_ID.menuButtonTraining}
                />
            </Badge>
        ),
        label: <Typography.Text>Тренировки</Typography.Text>,
    },
    {
        key: PageName.ACHIEVEMENTS,
        icon: (
            <TrophyFilled
                data-test-id={DATA_TEST_ID.sidebarAchievements}
                style={{ color: 'var(--blue-light-9)' }}
            />
        ),
        label: <Typography.Text>Достижения</Typography.Text>,
    },
    {
        key: PageName.PROFILE,
        icon: <ProfileOutlined style={{ color: 'var(--blue-light-9)' }} />,
        label: <Typography.Text>Профиль</Typography.Text>,
    },
];

export const itemsSideBarMobile: MenuItem[] = [
    {
        key: PageName.CALENDAR,
        label: <Typography.Text>Календарь</Typography.Text>,
    },
    {
        key: PageName.TRAININGS,
        label: (
            <Typography.Text data-test-id={DATA_TEST_ID.menuButtonTraining}>
                Тренировки
            </Typography.Text>
        ),
    },
    {
        key: PageName.ACHIEVEMENTS,
        label: (
            <Typography.Text data-test-id={DATA_TEST_ID.sidebarAchievements}>
                Достижения
            </Typography.Text>
        ),
    },
    {
        key: PageName.PROFILE,
        label: <Typography.Text>Профиль</Typography.Text>,
    },
];
