import { FC } from 'react';
import { DateFormat, Invite, Training } from '@common-types/training';
import { UserInfo } from '@components/user-info';
import { formatDate } from '@utils/format-date';
import { Button, Col, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './invite-item.module.css';

type InviteItemProps = {
    inviteList: Invite[];
    onAccept: () => void;
    onDecline: () => void;
    setTrainingDetails: (trainingDetails: Training) => void;
    setIsOpenModal: (isOpen: boolean) => void;
    inviteItem: Invite;
};

export const InviteItem: FC<InviteItemProps> = (props) => {
    const { inviteList, onAccept, onDecline, setTrainingDetails, setIsOpenModal, inviteItem } =
        props;
    const { _id: inviteItemId, from, training, createdAt } = inviteItem;

    const { lg } = useBreakpoint();

    const viewTrainingDetailsHandler = (inviteId: string) => {
        const item = inviteList.find(({ _id: id }) => id === inviteId);
        const inviteTraining = item?.training;

        if (inviteTraining) setTrainingDetails(inviteTraining);
        setIsOpenModal(true);
    };

    return (
        <Row align='middle' justify='start' gutter={[0, 24]}>
            <Col span={lg ? 3 : 24}>
                <UserInfo
                    imageSrc={from.imageSrc}
                    firstName={from.firstName}
                    lastName={from.lastName}
                />
            </Col>
            <Col span={lg ? 14 : 24}>
                <Typography.Text className={styles.date} type='secondary'>
                    {formatDate({ date: createdAt, format: DateFormat.EURO_DATE })}
                </Typography.Text>
                <Col span={24}>
                    <div className={styles.inviteText}>
                        Привет, я ищу партнёра для совместных [{training.name}]. Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </div>
                </Col>
                <Button onClick={() => viewTrainingDetailsHandler(inviteItemId)} type='link'>
                    Посмотреть детали тренировки
                </Button>
            </Col>
            <Col span={lg ? 7 : 24}>
                <Button style={{ zIndex: 11 }} onClick={onAccept} type='primary' block={!lg}>
                    Тренироваться вместе
                </Button>
                <Button block={!lg} onClick={onDecline}>
                    Отклонить запрос
                </Button>
            </Col>
        </Row>
    );
};
