import {
    appReducer,
    authReducer,
    feedbackReducer,
    profileReducer,
    trainingReducer,
} from '@redux/slices';
import { ReducersMapObject } from '@reduxjs/toolkit';

const reducers = {
    app: appReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    training: trainingReducer,
    profile: profileReducer,
};

export const rootReducerBuilder = (additionalReducers: ReducersMapObject) => ({
    ...reducers,
    ...additionalReducers,
});
