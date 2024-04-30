export type WorkoutDataItem<T, K extends string> = {
    date: string;
} & Record<K, T>;

export type WorkoutDataExercises = Array<WorkoutDataItem<string, 'exercise'>>;
export type WorkoutDataAverageWeight = Array<WorkoutDataItem<number, 'averageWeight'>>;

export enum PeriodType {
    WEEK = 7,
    MONTH = 28,
}
