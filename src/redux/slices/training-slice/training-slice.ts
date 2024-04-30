import { push } from 'redux-first-history';
import { Nullable } from '@common-types/auth';
import { Paths } from '@common-types/routes';
import {
    ChangeTrainingPayload,
    CreateInvitePayload,
    CreateInviteResponse,
    CurrentRequest,
    DateFormat,
    DrawerType,
    Exercise,
    Invite,
    Training,
    TrainingInitialState,
    TrainingList,
    TrainingNames,
    TrainingPals,
    TrainingPayload,
} from '@common-types/training';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { trainingServices } from '@services/training-services';
import { formatDate } from '@utils/format-date';

export const emptyExercise = {
    name: '',
    replays: 1,
    weight: 0,
    isImplementation: false,
    approaches: 1,
};

const initialState: TrainingInitialState = {
    trainings: [],
    trainingsList: [],
    userJointTrainingList: [],
    userJointTraining: null,
    trainingPalsList: [],
    inviteList: [],
    selectedTraining: '',
    editableTraining: null,
    exercises: { empty: [emptyExercise] },
    date: '',
    currentRequest: CurrentRequest.GET_TRAINING_PALS,

    isDrawerAddExercisesOpen: false,
    openPopoverId: '',
    trainingId: '',
    isLoadingSaveTraining: false,

    isErrorOpened: false,
    isErrorMain: false,
    isErrorSaveTraining: false,

    drawerType: DrawerType.SAVE,
    isEditedExercise: false,
    isEditedExercisePast: false,
    isCreateTrainingSuccess: false,
};

const slice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setIsErrorOpened(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorOpened = action.payload.isError;
        },
        setIsErrorMain(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorMain = action.payload.isError;
        },
        setIsErrorSaveTraining(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorSaveTraining = action.payload.isError;
        },
        setIsDrawerAddExercisesOpen(state, action: PayloadAction<{ isOpen: boolean }>) {
            state.isDrawerAddExercisesOpen = action.payload.isOpen;
        },
        setIsEditedExercises(state, action: PayloadAction<{ isEdited: boolean }>) {
            state.isEditedExercise = action.payload.isEdited;
        },
        setDate(state, action: PayloadAction<{ date: string }>) {
            state.date = action.payload.date;
        },
        setOpenPopoverId(state, action: PayloadAction<{ openPopoverId: string }>) {
            state.openPopoverId = action.payload.openPopoverId;
        },
        setTrainingId(state, action: PayloadAction<{ trainingId: string }>) {
            state.trainingId = action.payload.trainingId;
        },
        setSelectedTraining(state, action: PayloadAction<{ training: string }>) {
            state.selectedTraining = action.payload.training;
        },
        setCurrentRequest(state, action: PayloadAction<{ currentRequest: CurrentRequest }>) {
            state.currentRequest = action.payload.currentRequest;
        },
        setExercises(
            state,
            action: PayloadAction<{ trainingType: string; exercises: Exercise[] }>,
        ) {
            state.exercises = { [action.payload.trainingType]: [...action.payload.exercises] };
        },
        clearExercises(state) {
            state.exercises = { empty: [emptyExercise] };
        },
        setIsCreateTrainingSuccess(state, action: PayloadAction<{ isCreate: boolean }>) {
            state.isCreateTrainingSuccess = action.payload.isCreate;
        },
        setEditableTraining(state, action: PayloadAction<{ training: Nullable<Training> }>) {
            state.editableTraining = action.payload.training;
        },
        setDrawerType(state, action: PayloadAction<{ drawerType: DrawerType }>) {
            state.drawerType = action.payload.drawerType;
        },
        setUserJointTraining(
            state,
            action: PayloadAction<{ userJointTraining: Nullable<TrainingPals> }>,
        ) {
            state.userJointTraining = action.payload.userJointTraining;
        },
        updateStatusUserJointTraining(state, action: PayloadAction<{ inviteId: string }>) {
            const itemIndex = state.userJointTrainingList.findIndex(
                ({ id }) => id === action.payload.inviteId,
            );

            if (itemIndex !== -1) {
                state.userJointTrainingList[itemIndex].status = 'pending';
            }
        },
        updateTrainingsPals(state, action: PayloadAction<{ id: string }>) {
            const itemIndex = state.trainingPalsList.findIndex(
                ({ inviteId }) => inviteId === action.payload.id,
            );

            if (itemIndex !== -1) {
                state.trainingPalsList.splice(itemIndex, 1);
            }
        },
    },

    selectors: {
        trainings: (state) => state.trainings,
        trainingsList: (state) => state.trainingsList,
        userJointTrainingList: (state) => state.userJointTrainingList,
        userJointTraining: (state) => state.userJointTraining,
        trainingPalsList: (state) => state.trainingPalsList,
        selectedTraining: (state) => state.selectedTraining,
        inviteList: (state) => state.inviteList,
        editableTraining: (state) => state.editableTraining,
        exercises: (state) => state.exercises,
        date: (state) => state.date,
        currentRequest: (state) => state.currentRequest,
        openPopoverId: (state) => state.openPopoverId,
        trainingId: (state) => state.trainingId,
        isLoadingSave: (state) => state.isLoadingSaveTraining,
        isErrorOpened: (state) => state.isErrorOpened,
        isErrorMain: (state) => state.isErrorMain,
        isErrorSave: (state) => state.isErrorSaveTraining,
        drawerType: (state) => state.drawerType,
        isDrawerAddExercisesOpen: (state) => state.isDrawerAddExercisesOpen,
        isEditedExercise: (state) => state.isEditedExercise,
        isCreateTrainingSuccess: (state) => state.isCreateTrainingSuccess,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getTrainings.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isErrorMain = false;
            })
            .addCase(getTrainings.fulfilled, (state, action) => {
                state.isErrorMain = false;
                if (action.payload) {
                    state.trainings = action.payload;
                }
            })
            .addCase(getTrainings.rejected, (state) => {
                state.isErrorMain = true;
            })

            .addCase(getTrainingList.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isErrorOpened = false;
            })
            .addCase(getTrainingList.fulfilled, (state, action) => {
                state.isErrorOpened = false;
                state.isErrorSaveTraining = false;
                if (action.payload) {
                    state.trainingsList = action.payload;
                }
            })
            .addCase(getTrainingList.rejected, (state) => {
                state.isErrorOpened = true;
            })

            .addCase(createTraining.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = true;
            })
            .addCase(createTraining.fulfilled, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = false;
                state.isDrawerAddExercisesOpen = false;
                state.selectedTraining = '';
                state.isCreateTrainingSuccess = true;
            })
            .addCase(createTraining.rejected, (state) => {
                state.isErrorSaveTraining = true;
                state.isLoadingSaveTraining = false;
                state.openPopoverId = '';
                state.isDrawerAddExercisesOpen = false;
            })
            .addCase(editTraining.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = true;
            })
            .addCase(editTraining.fulfilled, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = false;
                state.isDrawerAddExercisesOpen = false;
                state.selectedTraining = '';
                state.isCreateTrainingSuccess = true;
            })
            .addCase(editTraining.rejected, (state) => {
                state.isErrorSaveTraining = true;
                state.isLoadingSaveTraining = false;
                state.openPopoverId = '';
                state.isDrawerAddExercisesOpen = false;
            })
            .addCase(getUserJointTrainingList.pending, (state) => {
                state.isErrorOpened = false;
            })
            .addCase(getUserJointTrainingList.fulfilled, (state, action) => {
                state.isErrorOpened = false;
                if (action.payload) {
                    state.userJointTrainingList = action.payload;
                }
            })
            .addCase(getUserJointTrainingList.rejected, (state) => {
                state.isErrorOpened = true;
            })
            .addCase(getTrainingPals.pending, (state) => {
                state.isErrorOpened = false;
            })
            .addCase(getTrainingPals.fulfilled, (state, action) => {
                state.isErrorOpened = false;
                if (action.payload) {
                    state.trainingPalsList = action.payload;
                }
            })
            .addCase(getTrainingPals.rejected, (state) => {
                state.isErrorOpened = true;
            })
            .addCase(getInvite.fulfilled, (state, action) => {
                if (action.payload) {
                    state.inviteList = action.payload;
                }
            });
    },
});

export const {
    reducer: trainingReducer,
    actions: trainingActions,
    selectors: trainingSelectors,
} = slice;

export const getTrainings = createAppAsyncThunk<
    Training[],
    { goToPath: Paths | null; name?: TrainingNames }
>('training/getTrainings', async ({ goToPath, name }, { dispatch, rejectWithValue }) => {
    try {
        const res = await trainingServices.getTraining(name);

        if (goToPath !== null) dispatch(push(goToPath));

        return res.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const getTrainingList = createAppAsyncThunk<TrainingList[], void>(
    'training/getTrainingList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await trainingServices.getTrainingList();

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const createTraining = createAppAsyncThunk<Training, TrainingPayload>(
    'training/createTraining',
    async (data, { dispatch, rejectWithValue }) => {
        const formatedDate = formatDate({ date: data.date, format: DateFormat.ISO_DATE });
        const openPopoverId = `create-modal-${formatedDate}`;

        try {
            const res = await trainingServices.createTraining(data);

            dispatch(getTrainings({ goToPath: null }));
            dispatch(trainingActions.setOpenPopoverId({ openPopoverId }));

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const editTraining = createAppAsyncThunk<
    Training,
    ChangeTrainingPayload & { isMobile?: boolean }
>('training/editTraining', async (data, { dispatch, rejectWithValue }) => {
    const formatedDate = formatDate({ date: data.payload.date, format: DateFormat.ISO_DATE });
    const openPopoverId = `create-modal-${formatedDate}`;

    try {
        const res = await trainingServices.editTraining(data);

        dispatch(getTrainings({ goToPath: null }));
        dispatch(
            trainingActions.setOpenPopoverId({
                openPopoverId: data.isMobile ? 'create-modal' : `${openPopoverId}`,
            }),
        );

        return res.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const getUserJointTrainingList = createAppAsyncThunk<
    TrainingPals[],
    { trainingType: string }
>('training/getUserJointTrainingList', async (data, { rejectWithValue }) => {
    try {
        const res = await trainingServices.getUserJointTrainingList(data);

        return res.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const getTrainingPals = createAppAsyncThunk<TrainingPals[], void>(
    'training/getTrainingPals',
    async (_, { rejectWithValue }) => {
        try {
            const res = await trainingServices.getTrainingPals();

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const getInvite = createAppAsyncThunk<Invite[], void>(
    'training/getInvite',
    async (_, { rejectWithValue }) => {
        try {
            const res = await trainingServices.getInvite();

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const createInvite = createAppAsyncThunk<
    CreateInviteResponse[],
    {
        id: string;
        training: TrainingPayload;
    }
>('training/createInvite', async ({ id, training }, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await trainingServices.createTraining(training);
        const { _id: trainingId } = data;

        const dataInvite: CreateInvitePayload = { trainingId, to: id };
        const res = await trainingServices.createInvite(dataInvite);

        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: false }));

        return res.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const acceptInvite = createAppAsyncThunk<Invite[], { invitedId: string }>(
    'training/acceptInvite',
    async ({ invitedId }, { dispatch, rejectWithValue }) => {
        try {
            const res = await trainingServices.acceptInvite(invitedId);

            dispatch(getInvite());
            dispatch(getTrainingPals());

            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const declineInvite = createAppAsyncThunk<void, { invitedId: string }>(
    'training/declineInvite',
    async ({ invitedId }, { dispatch, rejectWithValue }) => {
        try {
            await trainingServices.declineInvite(invitedId);

            dispatch(getInvite());
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
