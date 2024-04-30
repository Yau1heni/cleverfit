import {
    AuthPayload,
    ChangePasswordPayload,
    ChangePasswordResponse,
    CheckEmailPayload,
    ConfirmEmailPayload,
    EmailResponse,
    LoginResponse,
} from '@common-types/auth';

import { instance } from '../config/axios-config.ts';

export const authServices = {
    login(data: AuthPayload) {
        return instance.post<LoginResponse>('auth/login', data);
    },
    registration(data: AuthPayload) {
        return instance.post<void>('auth/registration', data);
    },
    checkEmail(data: CheckEmailPayload) {
        return instance.post<EmailResponse>('auth/check-email', data);
    },
    confirmEmail(data: ConfirmEmailPayload) {
        return instance.post<EmailResponse>('auth/confirm-email', data);
    },
    changePassword(data: ChangePasswordPayload) {
        return instance.post<ChangePasswordResponse>('auth/change-password', data);
    },
};
