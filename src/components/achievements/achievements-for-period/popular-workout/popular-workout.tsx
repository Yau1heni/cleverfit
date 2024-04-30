import { FC } from 'react';
import { Typography } from 'antd';

import styles from './popular-workout.module.css';

type PopularWorkoutProps = {
    filter: string | number;
    popularTraining: string;
    popularExercise: string;
};

export const PopularWorkout: FC<PopularWorkoutProps> = (props) => {
    const { popularTraining, popularExercise, filter } = props;

    return (
        <div className={styles.popularWorkoutContainer}>
            {filter === 'Все' && (
                <div>
                    <Typography.Text type='secondary'>Самая частая тренировка:</Typography.Text>
                    <Typography.Text className={styles.popularWorkout}>
                        {popularTraining}
                    </Typography.Text>
                </div>
            )}
            <div>
                <Typography.Text type='secondary'>Самая частое упражнение: </Typography.Text>
                <Typography.Text className={styles.popularWorkout}>
                    {popularExercise}
                </Typography.Text>
            </div>
        </div>
    );
};
