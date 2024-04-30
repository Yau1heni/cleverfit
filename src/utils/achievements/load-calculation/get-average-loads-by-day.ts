import { WorkoutDataExercises, WorkoutDataItem } from '@common-types/achievements';
import { Exercise, Training } from '@common-types/training';
import { getPreviousDays } from '@utils/achievements';
import { formatDate } from '@utils/format-date';
import dayjs from 'dayjs';

export const getTotalWeightOfExercise = ({ weight, replays, approaches }: Exercise): number =>
    replays * weight * approaches;

export const getTotalWeightOfExercises = (exercises: Exercise[]): number =>
    exercises.reduce((sum, exercise) => sum + getTotalWeightOfExercise(exercise), 0);

export const getTrainingsForPeriod = (trainings: Training[], period: 7 | 28): Training[] => {
    const datesList = getPreviousDays(period);

    return trainings.filter(
        ({ date }) => date >= datesList[0] && date <= datesList[datesList.length - 1],
    );
};

const getTrainingsToday = (date: string, trainings: Training[]) =>
    trainings.filter(
        (el) =>
            formatDate({ date, format: 'DD.MM' }) ===
            formatDate({ date: el.date, format: 'DD.MM' }),
    );

export const getTotalWeightRerDay = (date: string, trainings: Training[]) => {
    const trainingsToday = getTrainingsToday(date, trainings);

    if (trainingsToday.length === 0)
        return {
            date: formatDate({ date, format: 'DD.MM' }),
            averageWeight: 0,
        };

    const amountExercises = trainingsToday.reduce(
        (sum, { exercises }) => sum + exercises.length,
        0,
    );

    const totalWeight = trainingsToday.reduce(
        (sum, { exercises }) => sum + getTotalWeightOfExercises(exercises),
        0,
    );

    return {
        date: formatDate({ date, format: 'DD.MM' }),
        averageWeight: totalWeight / amountExercises,
    };
};

export const getPopularExerciseRerDay = (
    date: string,
    trainings: Training[],
): WorkoutDataItem<string, 'exercise'> => {
    const trainingsToday = getTrainingsToday(date, trainings);

    if (trainingsToday.length === 0)
        return {
            date: formatDate({ date, format: 'DD.MM' }),
            exercise: '',
        };

    const exerciseNameSum: Record<string, number> = {};

    trainingsToday.forEach((training) => {
        const { exercises } = training;

        exercises.forEach(({ name }) => {
            if (exerciseNameSum[name]) {
                exerciseNameSum[name] += 1;
            } else {
                exerciseNameSum[name] = 1;
            }
        });
    });

    let maxCountExercises = 0;
    let popularExercise = '';

    Object.entries(exerciseNameSum).forEach(([exerciseName, count]) => {
        if (count > maxCountExercises) {
            maxCountExercises = count;
            popularExercise = exerciseName;
        }
    });

    return {
        date: formatDate({ date, format: 'DD.MM' }),
        exercise: popularExercise,
    };
};

export const getPopularsExercises = (
    trainings: Training[],
    period: 7 | 28,
): WorkoutDataExercises => {
    const datesList = getPreviousDays(period);

    return datesList.map((date) => getPopularExerciseRerDay(date, trainings));
};

export const getAverageLoadsByDay = (trainings: Training[], period: 7 | 28) => {
    const datesList = getPreviousDays(period);

    return datesList.map((date) => getTotalWeightRerDay(date, trainings));
};

export const getTotalWeightForPeriod = (data: Array<{ averageWeight: number }>) =>
    data.reduce((sum, { averageWeight }) => sum + averageWeight, 0);

export const getAverageWeightPerDay = (data: number, period: number) => data / period;

export const getPopularExercisesForMonth = (exercises: WorkoutDataExercises) => {
    const popularExercises: { [dayOfWeek: number]: { [exerciseName: string]: number } } = {};

    exercises.forEach(({ exercise, date }) => {
        const dayOfWeek = dayjs(date, 'MM.DD').day();

        if (exercise !== '') {
            if (popularExercises[dayOfWeek]) {
                popularExercises[dayOfWeek][exercise] =
                    (popularExercises[dayOfWeek][exercise] || 0) + 1;
            } else {
                popularExercises[dayOfWeek] = { [exercise]: 1 };
            }
        }
    });

    const result = [];

    for (let day = 0; day < 7; day++) {
        let popularExercise = '';
        let maxCount = 0;

        if (popularExercises[day]) {
            Object.entries(popularExercises[day]).forEach(([exerciseName, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    popularExercise = exerciseName;
                }
            });
        }

        result.push({ date: String(day), exercise: popularExercise });
    }

    return result;
};
