import { Suspense } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Loader } from '@components/loader';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { history } from '@redux/configure-store.ts';

import { routes } from './routes.tsx';

import styles from './app.module.css';

export const App = () => {
    const accessTokenFromGoogle = history.location.search?.split('=')[1];

    if (accessTokenFromGoogle) {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessTokenFromGoogle);
    }

    return (
        <Suspense fallback={<Loader />}>
            <div className={styles.app}>
                <HistoryRouter history={history}>{routes}</HistoryRouter>
            </div>
        </Suspense>
    );
};
