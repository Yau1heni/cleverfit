import { User, UserRequest } from '@common-types/profile';

import { instance } from '../config/axios-config.ts';

export const profileServices = {
    me() {
        return instance.get<UserRequest>('user/me');
    },
    user(data: User) {
        return instance.put<UserRequest>('user', data);
    },
};
