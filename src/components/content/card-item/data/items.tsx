import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';

export const itemsCards = [
    {
        id: 'items-card-1',
        title: 'Расписать тренировки',
        icon: <HeartFilled style={{ color: 'var(--blue-light-9)' }} />,

        text: 'Тренировка',
        dataTestId: '',
    },
    {
        id: 'items-card-2',
        title: 'Назначить календарь',
        icon: <CalendarOutlined style={{ color: 'var(--blue-light-9)' }} />,
        text: 'Календарь',
        dataTestId: DATA_TEST_ID.menuButtonCalendar,
    },
    {
        id: 'items-card-3',
        title: 'Заполнить профиль',
        icon: <IdcardOutlined style={{ color: 'var(--blue-light-9)' }} />,
        text: 'Профиль',
        dataTestId: DATA_TEST_ID.menuButtonProfile,
    },
];
