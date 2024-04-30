import {
    ChangeTrainingPayload,
    CreateInvitePayload,
    CreateInviteResponse,
    Invite,
    Training,
    TrainingList,
    TrainingNames,
    TrainingPals,
    TrainingPayload,
} from '@common-types/training';

import { instance } from '../config/axios-config.ts';

export const trainingServices = {
    getTraining(name?: TrainingNames) {
        const params = name ? { name } : {};

        return instance.get<Training[]>('training', { params });
    },
    createTraining(data: TrainingPayload) {
        return instance.post<Training>('training', data);
    },
    editTraining(data: ChangeTrainingPayload) {
        const { trainingId, payload } = data;

        return instance.put<Training>(`training/${trainingId}`, payload);
    },
    getTrainingList() {
        return instance.get<TrainingList[]>('/catalogs/training-list');
    },
    getTrainingPals() {
        return instance.get<TrainingPals[]>('/catalogs/training-pals');
    },
    getUserJointTrainingList(params: { trainingType: string }) {
        return instance.get<TrainingPals[]>('/catalogs/user-joint-training-list', {
            params,
        });
    },
    getInvite() {
        return instance.get<Invite[]>('/invite');
    },
    createInvite(data: CreateInvitePayload) {
        return instance.post<CreateInviteResponse[]>('/invite', data);
    },
    acceptInvite(invitedId: string) {
        const data = { id: invitedId, status: 'accepted' };

        return instance.put<Invite[]>('/invite', data);
    },
    declineInvite(invitedId: string) {
        return instance.delete(`/invite/${invitedId}`);
    },
};
