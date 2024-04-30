import { replace } from 'redux-first-history';
import { Paths } from '@common-types/routes';
import { AppDispatch } from '@redux/configure-store.ts';

export const navigateTo = (args: NavigationArgs): void => {
    const { dispatch, currentPath, toPath } = args;

    const path = `${import.meta.env.BASE_URL}${toPath}`;

    dispatch(replace(path, { from: currentPath }));
};

type NavigationArgs = {
    dispatch: AppDispatch;
    toPath: Paths;
    currentPath?: string;
};
