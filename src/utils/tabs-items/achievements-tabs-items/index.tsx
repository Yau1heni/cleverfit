import { PeriodType } from '@common-types/achievements';
import { AchievementsForPeriod } from '@components/achievements';

import styles from '../styles.module.css';

export const itemsAchievementsTabsBuilder = [
    {
        label: <div className={styles.tabText}>За неделю</div>,
        key: 'achievements-item-1',
        children: <AchievementsForPeriod period={PeriodType.WEEK} />,
    },
    {
        label: <div className={styles.tabText}>За месяц</div>,
        key: 'achievements-item-2',
        children: <AchievementsForPeriod period={PeriodType.MONTH} />,
    },
    {
        label: <div className={styles.tabText}>За все время (PRO)</div>,
        key: 'achievements-item-3',
        children: <div>in develop</div>,
        disabled: true,
    },
];
