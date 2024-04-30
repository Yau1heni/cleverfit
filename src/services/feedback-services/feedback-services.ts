import { FeedbackPayload, FeedbacksResponse } from '@common-types/feedback';

import { instance } from '../config/axios-config.ts';

export const feedbackServices = {
    getFeedbacks() {
        return instance.get<FeedbacksResponse>('feedback');
    },
    createFeedback(data: FeedbackPayload) {
        return instance.post<void>('feedback', data);
    },
};
