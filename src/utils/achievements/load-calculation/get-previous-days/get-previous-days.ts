import { WorkoutDataItem } from '@common-types/achievements';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const getLastMonth = () => {
    const today = dayjs();

    const startOfWeek = today.day(1);
    const endOfWeek = today.day(7);
    const startDate = startOfWeek.subtract(21, 'day');

    const workload = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endOfWeek, 'day')) {
        workload.push(currentDate.toDate().toISOString());
        currentDate = currentDate.add(1, 'day');
    }

    return workload;
};

export const getLastWeek = () => {
    const previousDays = [];

    let startDate = dayjs();

    for (let i = 0; i < 7; i++) {
        previousDays.unshift(startDate.toDate().toISOString());
        startDate = startDate.subtract(1, 'day');
    }

    return previousDays;
};

export const getPreviousDays = (period: 7 | 28) => (period === 7 ? getLastWeek() : getLastMonth());

export const getPreviousDaysSorted = <T, K extends string>(
    dateList: Array<WorkoutDataItem<T, K>>,
    period: 7 | 28 = 7,
) => {
    if (period === 28) return dateList;

    return [...dateList].sort((a, b) => {
        const dayA = dayjs(a.date, 'DD.MM').day();
        const dayB = dayjs(b.date, 'DD.MM').day();

        if (dayA === 0) return 1;
        if (dayB === 0) return -1;

        return dayA - dayB;
    });
};

export const getWeekdayNumber = (date: string) => {
    const day = dayjs(date, 'DD.MM').day();

    return day === 0 ? 7 : day;
};

export const getWeekdayName = (index: number) =>
    dayjs()
        .locale('ru')
        .day(index + 1)
        .format('dddd');
