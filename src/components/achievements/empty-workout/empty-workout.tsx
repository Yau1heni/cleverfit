import emptyWorkout from '@assets/image/empty-workout.png';
import { Image } from 'antd';

import styles from './empty-workout.module.css';

export const EmptyWorkout = () => (
    <div className={styles.emptyWorkout}>
        <Image width={200} preview={false} src={emptyWorkout} alt='empty workout' />
        Ой, такой тренировки на этой неделе не было.
    </div>
);
