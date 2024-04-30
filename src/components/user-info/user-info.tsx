import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';

import styles from './user-info.module.css';

export const UserInfo: FC<Props> = ({ imageSrc, firstName, lastName }) => {
    const avatar = imageSrc ? (
        <Avatar src={imageSrc} alt='avatar' />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    return (
        <div className={styles.userInfo}>
            {avatar}
            <div>
                <Typography.Text>{firstName ?? 'Пользователь'}</Typography.Text>
                <br />
                <Typography.Text>{lastName}</Typography.Text>
            </div>
        </div>
    );
};

type Props = {
    imageSrc?: string;
    firstName?: string;
    lastName?: string;
};
