import { push } from 'redux-first-history';
import { PageName, Paths } from '@common-types/routes';
import { AppDispatch } from '@redux/configure-store.ts';
import { getTrainings } from '@redux/slices';

export const onPageTurn = (key: string, dispatch: AppDispatch) => {
    if (key === PageName.CALENDAR) {
        dispatch(getTrainings({ goToPath: Paths.CALENDAR }));
    }
    if (key === PageName.PROFILE) dispatch(push(Paths.PROFILE));
    if (key === PageName.TRAININGS) {
        dispatch(getTrainings({ goToPath: Paths.TRAININGS }));
    }
    if (key === PageName.ACHIEVEMENTS) {
        dispatch(getTrainings({ goToPath: Paths.ACHIEVEMENTS }));
    }
};
