import {
    PayTariffPayload,
    ProfileInitialState,
    TariffList,
    User,
    UserRequest,
} from '@common-types/profile';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileServices } from '@services/profile-services';
import { tariffServices } from '@services/tariff-services';

const initialState: ProfileInitialState = {
    user: null,
    tariffList: [],
    payTariffData: null,
    imgSrc: null,
    isError: false,
    isErrorFileSize: false,
    isSuccessUpdate: false,
    isSuccessPay: false,
    isDrawerOpen: false,
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPayTariffData(state, action: PayloadAction<{ tariffData: PayTariffPayload }>) {
            state.payTariffData = action.payload.tariffData;
        },
        setImageUrl(state, action: PayloadAction<{ url: string }>) {
            state.imgSrc = `https://training-api.clevertec.ru${action.payload.url}`;
        },
        setIsReadyForJointTraining(state, action: PayloadAction<{ isReady: boolean }>) {
            if (state.user !== null) {
                state.user.readyForJointTraining = action.payload.isReady;
            }
        },
        setIsSendNotification(state, action: PayloadAction<{ isSend: boolean }>) {
            if (state.user !== null) {
                state.user.sendNotification = action.payload.isSend;
            }
        },
        setIsError(state, action: PayloadAction<{ isError: boolean }>) {
            state.isError = action.payload.isError;
        },
        setIsErrorFileSize(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorFileSize = action.payload.isError;
        },
        setIsSuccessUpdate(state, action: PayloadAction<{ isSuccess: boolean }>) {
            state.isSuccessUpdate = action.payload.isSuccess;
        },
        setIsSuccessPay(state, action: PayloadAction<{ isSuccess: boolean }>) {
            state.isSuccessPay = action.payload.isSuccess;
        },
        setIsDrawerOpen(state, action: PayloadAction<{ isOpen: boolean }>) {
            state.isDrawerOpen = action.payload.isOpen;
        },
    },

    selectors: {
        user: (state) => state.user,
        tariffList: (state) => state.tariffList,
        payTariffData: (state) => state.payTariffData,
        imgSrc: (state) => state.imgSrc,
        isError: (state) => state.isError,
        isErrorFileSize: (state) => state.isErrorFileSize,
        isSuccessUpdate: (state) => state.isSuccessUpdate,
        isSuccessPay: (state) => state.isSuccessPay,
        isDrawerOpen: (state) => state.isDrawerOpen,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isError = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isError = false;
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(getUser.rejected, (state) => {
                state.isError = true;
            })
            .addCase(updateUser.pending, (state) => {
                state.isError = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccessUpdate = true;
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state) => {
                state.isError = true;
            })
            .addCase(getTariffList.pending, (state) => {
                state.isError = false;
            })
            .addCase(getTariffList.fulfilled, (state, action) => {
                state.isError = false;
                if (action.payload) {
                    state.tariffList = action.payload;
                }
            })
            .addCase(getTariffList.rejected, (state) => {
                state.isError = true;
            })
            .addCase(payTariff.pending, (state) => {
                state.isError = false;
            })
            .addCase(payTariff.fulfilled, (state) => {
                state.isError = false;
                state.isSuccessPay = true;
            })
            .addCase(payTariff.rejected, (state) => {
                state.isError = true;
            });
    },
});

export const {
    reducer: profileReducer,
    actions: profileActions,
    selectors: profileSelectors,
} = slice;

export const getUser = createAppAsyncThunk<UserRequest, void>(
    'profile/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await profileServices.me();

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const updateUser = createAppAsyncThunk<UserRequest, User>(
    'profile/updateUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const res = await profileServices.user(data);

            dispatch(getUser());

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const getTariffList = createAppAsyncThunk<TariffList, void>(
    'profile/getTariffList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await tariffServices.getTariffList();

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const payTariff = createAppAsyncThunk<void, PayTariffPayload>(
    'profile/payTariff',
    async (data, { rejectWithValue }) => {
        try {
            await tariffServices.payTariff(data);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
