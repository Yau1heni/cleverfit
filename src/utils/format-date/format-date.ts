import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const formatDate = ({ date, format }: Args) => dayjs(date).format(format);

type Args = {
    date: Dayjs | string | Date;
    format: string;
};
