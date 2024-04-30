import { PickerLocale } from 'antd/es/date-picker/generatePicker';
import locale from 'antd/es/date-picker/locale/ru_RU';

import 'dayjs/locale/ru';

export const localeCalendar: PickerLocale = {
    lang: {
        ...locale.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};
