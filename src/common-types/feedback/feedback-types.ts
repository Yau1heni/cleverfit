import { Nullable } from '@common-types/auth';

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type FeedbackPayload = {
    message: string;
    rating: Rating;
};

export type Feedback = {
    id: string;
    fullName: Nullable<string>;
    imageSrc: Nullable<string>;
    message: Nullable<string>;
    rating: Rating;
    createdAt: Date;
};

export type FeedbacksResponse = Feedback[];

export type FeedbacksInitialState = {
    feedbacks: FeedbacksResponse;
    message: string;
    rating: Rating;
    isError: boolean;
    creationStatus: CreationStatus;
};

export enum CreationStatus {
    IDLE = 'idle',
    SUCCESS = 'success',
    ERROR = 'error',
}
