import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@assets/icons/logo.svg?react';
import { AuthContainer } from '@components/auth';
import { Tabs } from 'antd';

import { items } from './items/items.tsx';

import styles from './auth-page.module.css';

const AuthPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <AuthContainer>
            <div className={styles.auth}>
                <Logo className={styles.logo} />
                <Tabs
                    onTabClick={(key) => navigate(key)}
                    size='large'
                    items={items}
                    defaultActiveKey={pathname}
                    centered={true}
                />
            </div>
        </AuthContainer>
    );
};

export default AuthPage;
