import { PageName, Paths } from '@common-types/routes';
import { AppDispatch } from '@redux/configure-store.ts';
import { getTrainings } from '@redux/slices';
import { navigateTo } from '@utils/navigate-to';

export const onPageTurn = (key: string, dispatch: AppDispatch) => {
    if (key === PageName.CALENDAR) {
        dispatch(getTrainings({ goToPath: Paths.CALENDAR }));
    }
    if (key === PageName.PROFILE) navigateTo({ dispatch, toPath: Paths.PROFILE });
    if (key === PageName.TRAININGS) {
        dispatch(getTrainings({ goToPath: Paths.TRAININGS }));
    }
    if (key === PageName.ACHIEVEMENTS) {
        dispatch(getTrainings({ goToPath: Paths.ACHIEVEMENTS }));
    }
};
