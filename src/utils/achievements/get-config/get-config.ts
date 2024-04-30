import { WorkoutDataAverageWeight } from '@common-types/achievements';

export const getConfigColumns = (averageLoadsByDay: WorkoutDataAverageWeight, period: 7 | 28) => {
    const scrollBar = period === 28 ? { x: { ratio: 0.6 } } : false;

    return {
        data: averageLoadsByDay,
        xField: 'date',
        yField: 'averageWeight',
        style: {
            fill: '#85a5ff',
            maxWidth: 30,
        },
        axis: {
            y: {
                labelFormatter: (weight: string) => `${weight} кг`,
                tick: false,
            },
        },
        scrollbar: scrollBar,
        title: {
            title: 'Средняя нагрузка по дням недели',
            spacing: 4,
            titleFontSize: 16,
        },
    };
};

export const getConfigPie = (exercisesSumWeight: Array<{ name: string; value: number }>) => ({
    data: exercisesSumWeight,
    angleField: 'value',
    colorField: 'name',
    innerRadius: 0.8,
    label: {
        text: 'name',
        position: 'outside',
        style: {
            fontWeight: 'bold',
        },
        connector: false,
    },
    legend: false,
});
