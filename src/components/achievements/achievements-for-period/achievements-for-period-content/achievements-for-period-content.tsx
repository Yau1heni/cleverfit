import { FC, Fragment } from 'react';
import { Column, Pie } from '@ant-design/charts';
import { PeriodType, WorkoutDataExercises } from '@common-types/achievements';
import { Training } from '@common-types/training';
import { useFavoriteWorkout } from '@hooks/use-favorite-workout.ts';
import {
    getAverageLoadsByDay,
    getConfigColumns,
    getConfigPie,
    getPopularExercisesForMonth,
    getPopularsExercises,
    getPreviousDaysSorted,
    getTotalWeightForPeriod,
} from '@utils/achievements';
import { Col } from 'antd';
import classNames from 'classnames/bind';

import { AverageDailyLoad } from '../average-daily-load/average-daily-load.tsx';
import { AverageDailyLoadPerMonth } from '../average-daily-load-per-month/average-daily-load-per-month.tsx';
import { FavoriteExercisesForPeriod } from '../favorite-exercises-for-period/favorite-exercises-for-period.tsx';
import { PopularWorkout } from '../popular-workout/popular-workout.tsx';

import { WorkoutStatistic } from './workout-statistic/workout-statistic.tsx';

import styles from './achievements-for-period-content.module.css';

const cx = classNames.bind(styles);

type AchievementsForPeriodContentProps = {
    trainingsForPeriod: Training[];
    period: PeriodType;
    filter: string | number;
};

export const AchievementsForPeriodContent: FC<AchievementsForPeriodContentProps> = (props) => {
    const { trainingsForPeriod, period, filter } = props;

    const { popularTraining, popularExercise, totalApproaches, totalReplays, exercisesSumWeight } =
        useFavoriteWorkout(trainingsForPeriod);

    const averageLoadsByDay = getAverageLoadsByDay(trainingsForPeriod, period);

    const popularsExercisesForPeriod: WorkoutDataExercises = getPopularsExercises(
        trainingsForPeriod,
        period,
    );

    const popularExercises =
        period === PeriodType.WEEK
            ? getPreviousDaysSorted<string, 'exercise'>(popularsExercisesForPeriod, period)
            : getPopularExercisesForMonth(popularsExercisesForPeriod);

    const totalWeight = getTotalWeightForPeriod(averageLoadsByDay);
    const sortedData = getPreviousDaysSorted<number, 'averageWeight'>(averageLoadsByDay, period);

    const configColumns = getConfigColumns(averageLoadsByDay, period);
    const configPie = getConfigPie(exercisesSumWeight);

    const container = cx(styles.achievementsForPeriodContent, {
        [styles.achievementsForMonth]: period === PeriodType.MONTH,
    });

    return (
        <Fragment>
            <div className={container}>
                <Column {...configColumns} />

                <Col>
                    {period === PeriodType.WEEK ? (
                        <AverageDailyLoad
                            dataSource={sortedData}
                            title='Средняя нагрузка по дням недели'
                        />
                    ) : (
                        <AverageDailyLoadPerMonth dataSource={sortedData} />
                    )}
                </Col>
            </div>

            <WorkoutStatistic
                totalReplays={totalReplays}
                period={period}
                totalWeight={totalWeight}
                totalApproaches={totalApproaches}
            />

            <PopularWorkout
                filter={filter}
                popularExercise={popularExercise}
                popularTraining={popularTraining}
            />

            <div className={styles.exercisesInfoContainer}>
                <div className={styles.pieContainer}>
                    <Pie width={156} height={156} {...configPie} />
                </div>
                <Col>
                    <FavoriteExercisesForPeriod
                        period={period}
                        popularExercises={popularExercises}
                    />
                </Col>
            </div>
        </Fragment>
    );
};
