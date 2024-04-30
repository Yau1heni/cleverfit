import { JointTrainings, Marathons, MyTrainings } from '@components/trainings';

import styles from '../styles.module.css';

export const itemsTrainingTabs = [
    {
        label: <div className={styles.tabText}>Мои тренировки</div>,
        key: 'item-1',
        children: <MyTrainings />,
    },
    {
        label: <div className={styles.tabText}>Совместные тренировки</div>,
        key: 'item-2',
        children: <JointTrainings />,
        withNotification: true,
    },
    {
        label: <div className={styles.tabText}>Марафоны</div>,
        key: 'item-3',
        children: <Marathons />,
    },
];
