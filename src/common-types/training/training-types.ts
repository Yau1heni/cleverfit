import { Key } from 'react';
import { Nullable } from '@common-types/auth';

export type Parameters = {
    period: number;
    jointTraining: boolean;
    repeat?: boolean;
    participants?: string[];
};

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
    _id?: string;
};

export type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: Parameters;
    exercises: Exercise[];
};

export type TrainingPayload = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: Parameters;
    exercises: Exercise[];
};

export type ChangeTrainingPayload = {
    payload: TrainingPayload;
    trainingId: string;
};

export enum DrawerType {
    SAVE = 'save',
    ADD = 'add',
    EDIT = 'edit',
    INVITE = 'invite',
}

export enum CurrentRequest {
    GET_TRAINING_PALS = 'getTrainingPals',
    GET_USER_JOINT_TRAINING_LIST = 'getUserJointTrainingList',
    GET_PREFERRED_CHOICE_LIST = 'getPreferredChoiceList',
}

export type TrainingInitialState = {
    trainings: Training[];
    trainingsList: TrainingList[];
    userJointTrainingList: TrainingPals[];
    userJointTraining: Nullable<TrainingPals>;
    trainingPalsList: TrainingPals[];
    inviteList: Invite[];
    editableTraining: Nullable<Training>;
    selectedTraining: string;
    exercises: Record<string, Exercise[]>;
    date: string;
    currentRequest: CurrentRequest;

    trainingId: string;
    openPopoverId: string;
    isErrorOpened: boolean;
    isErrorMain: boolean;
    isErrorSaveTraining: boolean;
    isLoadingSaveTraining: boolean;
    isDrawerAddExercisesOpen: boolean;
    isEditedExercise: boolean;
    drawerType: DrawerType;
    isEditedExercisePast: boolean;
    isCreateTrainingSuccess: boolean;
};

export type TrainingNames = 'Ноги' | 'Руки' | 'Силовая' | 'Спина' | 'Грудь';

export type TrainingList = {
    name: TrainingNames;
    key: string;
};

export enum ColorBadge {
    Ноги = 'red',
    Руки = 'yellow',
    Силовая = 'green',
    Спина = 'orange',
    Грудь = 'pink',
}

export enum DateFormat {
    ISO_DATE = 'YYYY-MM-DD',
    EURO_DATE = 'DD.MM.YYYY',
}

export type OptionsList = {
    key: string;
    value: string;
    label: string;
};

export type TrainingPals = {
    id: string;
    name: string;
    trainingType: string;
    avgWeightInWeek: number;
    imageSrc?: string;
    status?: string;
    inviteId?: string;
};

export type InviteUserInfo = {
    _id: string;
    firstName?: string;
    lastName?: string;
    imageSrc?: string;
};

export type Invite = {
    _id: string;
    from: InviteUserInfo;
    training: Training;
    status: string;
    createdAt: string;
};

export type CreateInvitePayload = { to: string; trainingId: string };

export type CreateInviteResponse = {
    _id: string;
    from: InviteUserInfo;
    training: Training;
    status: string;
    createdAt: string;
    to: InviteUserInfo;
};

export enum JointTrainingsContent {
    MAIN = 'main',
    USER_JOINT_LIST = 'userJointList',
}

export type ColumnsDataType = {
    key: Key;
    type: string;
    period: number;
};

export type TrainingDetails = Training | Record<string, never>;
