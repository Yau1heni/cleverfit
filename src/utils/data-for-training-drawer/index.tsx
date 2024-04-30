import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerType } from '@common-types/training';

export const dataForDrawer = (type: DrawerType) => {
    if (type === DrawerType.ADD) return { title: 'Добавление упражнений', icon: <PlusOutlined /> };
    if (type === DrawerType.EDIT) return { title: 'Редактирование', icon: <EditOutlined /> };
    if (type === DrawerType.INVITE)
        return { title: 'Совместная тренировка', icon: <PlusOutlined /> };

    return { title: '', icon: <PlusOutlined /> };
};
