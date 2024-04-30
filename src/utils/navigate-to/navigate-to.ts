import { replace } from 'redux-first-history';
import { Paths } from '@common-types/routes';
import { AppDispatch } from '@redux/configure-store.ts';

export const navigateTo = (args: NavigationArgs): void => {
    const { dispatch, currentPath, toPath } = args;

    dispatch(replace(toPath, { from: currentPath }));
};

type NavigationArgs = {
    dispatch: AppDispatch;
    toPath: Paths;
    currentPath?: string;
};
