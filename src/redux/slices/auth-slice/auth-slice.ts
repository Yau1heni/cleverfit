import {
    AuthData,
    AuthInitialState,
    ChangePasswordData,
    CheckEmail,
    EmailResponse,
    Nullable,
    StatusCode,
} from '@common-types/auth';
import { Paths } from '@common-types/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authServices } from '@services/auth-services';
import { navigateTo } from '@utils/navigate-to';
import { isAxiosError } from 'axios';

const initialState: AuthInitialState = {
    isRememberMe: false,
    registrationData: null,
    checkEmail: null,
    confirmCode: '',
    changePasswordData: null,
    isErrorConfirmEmail: false,
    accessToken: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<AuthData>) {
            state.registrationData = action.payload;
        },
        setIsRememberMe(state, action: PayloadAction<{ isRememberMe: boolean }>) {
            state.isRememberMe = action.payload.isRememberMe;
        },
        setCHeckEmail(state, action: PayloadAction<CheckEmail>) {
            state.checkEmail = action.payload;
        },
        setConfirmEmail(state, action: PayloadAction<{ code: string }>) {
            state.confirmCode = action.payload.code;
        },
        setChangePasswordData(state, action: PayloadAction<ChangePasswordData>) {
            state.changePasswordData = action.payload;
        },
        setAccessToken(state, action: PayloadAction<{ accessToken: Nullable<string> }>) {
            state.accessToken = action.payload.accessToken;
        },
    },

    selectors: {
        isRememberMe: (state) => state.isRememberMe,
        registrationData: (state) => state.registrationData,
        checkEmail: (state) => state.checkEmail,
        confirmCode: (state) => state.confirmCode,
        changePasswordData: (state) => state.changePasswordData,
        isErrorConfirmEmail: (state) => state.isErrorConfirmEmail,
        accessToken: (state) => state.accessToken,
    },

    extraReducers: (builder) => {
        builder
            .addCase(confirmEmail.fulfilled, (state) => {
                state.isErrorConfirmEmail = false;
            })
            .addCase(confirmEmail.pending, (state) => {
                state.isErrorConfirmEmail = false;
            })
            .addCase(confirmEmail.rejected, (state) => {
                state.isErrorConfirmEmail = true;
                state.confirmCode = '';
            });
    },
});

export const { reducer: authReducer, actions: authActions, selectors: authSelectors } = slice;

export const registration = createAppAsyncThunk<void, AuthData>(
    'auth/registration',
    async (data, { dispatch }) => {
        dispatch(authActions.setFormData(data));

        try {
            if (data !== null) {
                await authServices.registration({ email: data.email, password: data.password });
                // dispatch(push(Paths.SUCCESS, { from: data.pathname }));
                navigateTo({ dispatch, toPath: Paths.SUCCESS, currentPath: data.pathname });
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status === StatusCode.USER_EXISTS) {
                    // dispatch(push(Paths.ERROR_USER_EXIST, { from: data?.pathname }));
                    navigateTo({
                        dispatch,
                        toPath: Paths.ERROR_USER_EXIST,
                        currentPath: data?.pathname,
                    });
                } else {
                    // dispatch(push(Paths.ERROR_REGISTRATION, { from: data?.pathname }));
                    navigateTo({
                        dispatch,
                        toPath: Paths.ERROR_REGISTRATION,
                        currentPath: data?.pathname,
                    });
                }
            } else
                navigateTo({
                    dispatch,
                    toPath: Paths.ERROR_REGISTRATION,
                    currentPath: data?.pathname,
                });
        }
    },
);

export const retryRegistration = createAppAsyncThunk<void, void>(
    'auth/retryRegistration',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI;
        const data = getState().auth?.registrationData;

        try {
            navigateTo({ dispatch, toPath: Paths.REGISTRATION });
            if (data !== null) dispatch(registration(data));
        } catch (e) {
            if (isAxiosError(e)) {
                rejectWithValue(e);
            }
        }
    },
);

export const login = createAppAsyncThunk<void, AuthData>(
    'auth/login',
    async (data, { dispatch, getState }) => {
        const isRememberMe = getState().auth?.isRememberMe;

        try {
            if (data !== null) {
                const res = await authServices.login({
                    email: data.email,
                    password: data.password,
                });

                if (isRememberMe) {
                    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, res.data.accessToken);
                } else {
                    dispatch(authActions.setAccessToken({ accessToken: res.data.accessToken }));
                }
                navigateTo({ dispatch, toPath: Paths.MAIN });
            }
        } catch (e) {
            if (isAxiosError(e)) {
                // dispatch(push(Paths.ERROR_LOGIN, { from: data?.pathname }));
                navigateTo({ dispatch, toPath: Paths.ERROR_LOGIN, currentPath: data?.pathname });
            }
        }
    },
);

export const checkEmail = createAppAsyncThunk<void, CheckEmail>(
    'auth/checkEmail',
    async (data, { dispatch }) => {
        dispatch(authActions.setCHeckEmail(data));

        try {
            if (data !== null) {
                await authServices.checkEmail({ email: data.email });
                navigateTo({ dispatch, toPath: Paths.CONFIRM_EMAIL, currentPath: data.pathname });
                // dispatch(push(Paths.CONFIRM_EMAIL, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (
                    e.response?.status === StatusCode.NOT_FOUND_404 ||
                    e.response?.data.message === 'Email не найден'
                ) {
                    navigateTo({
                        dispatch,
                        toPath: Paths.ERROR_CHECK_EMAIL_NO_EXIST,
                        currentPath: data?.pathname,
                    });
                    // dispatch(push(Paths.ERROR_CHECK_EMAIL_NO_EXIST, { from: data?.pathname }));
                } else {
                    navigateTo({
                        dispatch,
                        toPath: Paths.ERROR_CHECK_EMAIL,
                        currentPath: data?.pathname,
                    });
                    // dispatch(push(Paths.ERROR_CHECK_EMAIL, { from: data?.pathname }));
                }
            } else {
                navigateTo({
                    dispatch,
                    toPath: Paths.ERROR_CHECK_EMAIL,
                    currentPath: data?.pathname,
                });
            }
        }
    },
);

export const retryCheckEmail = createAppAsyncThunk<void, void>(
    'auth/retryRegistration',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI;
        const data = getState().auth.checkEmail;

        try {
            if (data !== null) {
                dispatch(checkEmail(data));
                navigateTo({ dispatch, toPath: Paths.REGISTRATION, currentPath: data.pathname });

                // dispatch(push(Paths.REGISTRATION, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                rejectWithValue(e);
            }
        }
    },
);

export const confirmEmail = createAppAsyncThunk<EmailResponse, string>(
    'auth/confirmEmail',
    async (code, { dispatch, getState, rejectWithValue }) => {
        const data = getState().auth.checkEmail;

        try {
            if (data !== null) {
                const res = await authServices.confirmEmail({ email: data.email, code });

                // dispatch(push(Paths.CHANGE_PASSWORD, { from: data?.pathname }));
                navigateTo({ dispatch, toPath: Paths.CHANGE_PASSWORD, currentPath: data.pathname });

                return res.data;
            }

            return rejectWithValue('error confirm email');
        } catch (e) {
            return rejectWithValue('error confirm email');
        }
    },
);

export const changePassword = createAppAsyncThunk<void, ChangePasswordData>(
    'auth/changePasswordData',
    async (data, { dispatch }) => {
        dispatch(authActions.setChangePasswordData(data));

        try {
            if (data) {
                await authServices.changePassword({
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                });
                navigateTo({
                    dispatch,
                    toPath: Paths.SUCCESS_CHANGE_PASSWORD,
                    currentPath: data.pathname,
                });
                // dispatch(replace(Paths.SUCCESS_CHANGE_PASSWORD, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status) {
                    navigateTo({
                        dispatch,
                        toPath: Paths.ERROR_CHANGE_PASSWORD,
                        currentPath: data?.pathname,
                    });
                    // dispatch(push(Paths.ERROR_CHANGE_PASSWORD, { from: data?.pathname }));
                }
            }
        }
    },
);

export const retryChangePassword = createAppAsyncThunk<void, void>(
    'auth/retryChangePassword',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI;
        const data = getState().auth.changePasswordData;

        try {
            navigateTo({ dispatch, toPath: Paths.CHANGE_PASSWORD, currentPath: data?.pathname });
            // dispatch(push(Paths.CHANGE_PASSWORD, { from: data?.pathname }));
            if (data !== null) dispatch(changePassword(data));
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
