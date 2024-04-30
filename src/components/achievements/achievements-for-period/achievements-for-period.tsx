import { FC, Fragment, useEffect, useState } from 'react';
import { PeriodType } from '@common-types/achievements';
import { TrainingNames } from '@common-types/training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings, trainingSelectors } from '@redux/slices';
import { getTrainingsForPeriod } from '@utils/achievements';
import { Segmented, Typography } from 'antd';

import { EmptyWorkout } from '../empty-workout/empty-workout.tsx';

import { AchievementsForPeriodContent } from './achievements-for-period-content/achievements-for-period-content.tsx';

type AchievementsPerWeekProps = {
    period: PeriodType;
};

const options = ['Все', 'Силовая', 'Ноги', 'Грудь', 'Спина', 'Руки'];

export const AchievementsForPeriod: FC<AchievementsPerWeekProps> = ({ period }) => {
    const dispatch = useAppDispatch();

    const [filter, setFilter] = useState<string | number>('Все');

    const trainings = useAppSelector(trainingSelectors.trainings);
    const trainingsForPeriod = getTrainingsForPeriod(trainings, period);

    useEffect(() => {
        const payload =
            filter === 'Все'
                ? { goToPath: null }
                : { goToPath: null, name: filter as TrainingNames };

        dispatch(getTrainings(payload));
    }, [dispatch, filter]);

    return (
        <Fragment>
            <Typography.Text>Тип тренировки: </Typography.Text>
            <Segmented options={options} value={filter} onChange={setFilter} />
            {trainingsForPeriod.length === 0 ? (
                <EmptyWorkout />
            ) : (
                <AchievementsForPeriodContent
                    trainingsForPeriod={trainingsForPeriod}
                    period={period}
                    filter={filter}
                />
            )}
        </Fragment>
    );
};
