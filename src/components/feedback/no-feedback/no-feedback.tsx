import { FC } from 'react';
import { Button, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './no-feedback.module.css';

export const NoFeedback: FC<Props> = ({ onClick }) => {
    const { sm } = useBreakpoint();

    const onClickHandler = () => {
        onClick(true);
    };

    return (
        <div className={styles.noFeedback}>
            <div className={styles.description}>
                <Typography.Title level={3} style={{ color: 'var(--blue-light-9)' }}>
                    Оставьте первый отзыв
                </Typography.Title>
                <Typography.Text type='secondary'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                    {sm && <br />}
                    Поделитесь своим мнением и опытом с другими пользователями,
                    {sm && <br />}и помогите им сделать правильный выбор.
                </Typography.Text>
            </div>
            <Button type='primary' onClick={onClickHandler} data-test-id='write-review'>
                Написать отзыв
            </Button>
        </div>
    );
};

type Props = {
    onClick: (value: boolean) => void;
};
