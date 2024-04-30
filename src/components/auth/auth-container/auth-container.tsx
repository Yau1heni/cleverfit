import { FC, PropsWithChildren } from 'react';
import { Loader } from '@components/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { appSelectors } from '@redux/slices';
import { Row } from 'antd';

import styles from './auth-container.module.css';

export const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
    const isLoading = useAppSelector(appSelectors.isLoading);

    return (
        <div className={styles.backgroundImageContainer}>
            <Row align='middle' justify='center' className={styles.blur}>
                {isLoading && <Loader />}
                {children}
            </Row>
        </div>
    );
};
