import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducerBuilder } from '@utils/root-reducer-builder';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: rootReducerBuilder({ router: routerReducer }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
