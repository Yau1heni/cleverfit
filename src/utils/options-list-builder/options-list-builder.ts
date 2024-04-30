import { OptionsList, Training, TrainingList } from '@common-types/training';

export const optionsListBuilder = (
    trainingsList: TrainingList[],
    usedTrainings: Training[],
): OptionsList[] => {
    const possibleTrainings = trainingsList.filter(
        (training) => !usedTrainings.some((usedTraining) => usedTraining.name === training.name),
    );

    return possibleTrainings.map((el) => ({
        key: el.key,
        value: el.name,
        label: el.name,
    }));
};
