type WorkoutStatistic = {
    totalWeight: number;
    totalApproaches: number;
    totalReplays: number;
    averageWeightPerDay: number;
};
export const getWorkoutStatistics = ({
    totalWeight,
    totalReplays,
    totalApproaches,
    averageWeightPerDay,
}: WorkoutStatistic) => [
    {
        id: 'generalInformation-1',
        title: 'Общая нагрузка, кг',
        value: totalWeight,
    },
    { id: 'generalInformation-2', title: 'Нагрузка в день, кг', value: averageWeightPerDay },
    { id: 'generalInformation-3', title: 'Количество повторений, раз', value: totalReplays },
    { id: 'generalInformation-4', title: 'Подходы, раз', value: totalApproaches },
];
