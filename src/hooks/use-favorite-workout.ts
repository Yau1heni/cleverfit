import { Training } from '@common-types/training';

export enum TrainingType {
    'Ноги' = 'legs',
    'Руки' = 'hands',
    'Силовая' = 'strength',
    'Спина' = 'back',
    'Грудь' = 'chest',
}

type TrainingNames = keyof typeof TrainingType;

export const useFavoriteWorkout = (trainings: Training[]) => {
    const trainingNameSum: Record<string, number> = {};
    const exerciseNameSum: Record<string, number> = {};

    let totalReplays = 0;
    let totalApproaches = 0;

    trainings.forEach((training) => {
        const { name, exercises } = training;

        exercises.forEach((exercise) => {
            const { replays, weight, approaches, name: exerciseName } = exercise;
            const exerciseSum = replays * weight * approaches;

            totalReplays += replays;
            totalApproaches += approaches;

            if (trainingNameSum[name]) {
                trainingNameSum[name] += exerciseSum;
            } else {
                trainingNameSum[name] = exerciseSum;
            }

            if (exerciseNameSum[exerciseName]) {
                exerciseNameSum[exerciseName] += exerciseSum;
            } else {
                exerciseNameSum[exerciseName] = exerciseSum;
            }
        });
    });

    let maxSumTraining = 0;
    let popularTraining = '';

    let maxCountExercises = 0;
    let popularExercise = '';

    Object.entries(trainingNameSum).forEach(([exerciseName, sum]) => {
        if (sum > maxSumTraining) {
            maxSumTraining = sum;
            popularTraining = exerciseName;
        }
    });
    Object.entries(exerciseNameSum).forEach(([exerciseName, count]) => {
        if (count > maxCountExercises) {
            maxCountExercises = count;
            popularExercise = exerciseName;
        }
    });

    const exercisesSumWeight = Object.keys(exerciseNameSum).map((key) => ({
        name: key,
        value: exerciseNameSum[key],
    }));

    const favoriteTrainingType = TrainingType[popularTraining as TrainingNames];

    return {
        favoriteTrainingType,
        popularTraining,
        popularExercise,
        totalApproaches,
        totalReplays,
        exercisesSumWeight,
    };
};
