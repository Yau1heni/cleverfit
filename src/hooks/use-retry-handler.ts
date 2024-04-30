import { CurrentRequest } from '@common-types/training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useFavoriteWorkout } from '@hooks/use-favorite-workout.ts';
import { getTrainingPals, getUserJointTrainingList, trainingSelectors } from '@redux/slices';

export const useRetryHandler = () => {
    const dispatch = useAppDispatch();
    const currentRequest = useAppSelector(trainingSelectors.currentRequest);
    const trainings = useAppSelector(trainingSelectors.trainings);
    const { favoriteTrainingType } = useFavoriteWorkout(trainings);

    const onRetryHandler = () => {
        switch (currentRequest) {
            case CurrentRequest.GET_TRAINING_PALS:
                dispatch(getTrainingPals());
                break;
            case CurrentRequest.GET_USER_JOINT_TRAINING_LIST:
                dispatch(getUserJointTrainingList({ trainingType: '' }));
                break;
            case CurrentRequest.GET_PREFERRED_CHOICE_LIST:
                dispatch(getUserJointTrainingList({ trainingType: favoriteTrainingType }));
                break;
        }
    };

    return [onRetryHandler];
};
