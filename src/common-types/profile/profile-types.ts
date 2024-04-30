import { Nullable } from '@common-types/auth';

export type User = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: Nullable<string>;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

export type Tariff = {
    tariffId: string;
    expired: Date;
};

export type UserRequest = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: Nullable<string>;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: Tariff;
};

export type PayTariffPayload = {
    tariffId: string;
    days: number;
};

export type Period = {
    text: string;
    cost: number;
    days: number;
};

export type TariffItem = {
    _id: string;
    name: string;
    periods: Period[];
};
export type TariffList = TariffItem[];

export type ProfileInitialState = {
    user: Nullable<UserRequest>;
    tariffList: TariffList | [];
    payTariffData: Nullable<PayTariffPayload>;
    imgSrc: Nullable<string>;
    isError: boolean;
    isErrorFileSize: boolean;
    isSuccessUpdate: boolean;
    isSuccessPay: boolean;
    isDrawerOpen: boolean;
};
