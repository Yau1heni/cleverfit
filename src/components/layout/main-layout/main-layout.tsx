import { FC, PropsWithChildren, useState } from 'react';
import { Breadcrumbs } from '@components/breadcrumbs';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { ErrorServerModal } from '@components/modals';
import { Sidebar } from '@components/sidebar';
import { TrapezoidButton } from '@components/trapezoid-button';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './main-layout.module.css';

export const MainLayout: FC<Props> = (props) => {
    const { isWithHeader = true, isWithFooter = true, children } = props;

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    const isError = useAppSelector(trainingSelectors.isErrorMain);
    const clearError = () => {
        dispatch(trainingActions.setIsErrorMain({ isError: false }));
    };

    const { xs } = useBreakpoint();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Layout>
                <div className={styles.breadcrumbContainer}>
                    <Breadcrumbs />
                </div>
                {isWithHeader && <Header />}

                <div className={styles.backgroundImageContainer}>
                    <Layout.Content>
                        {!xs && (
                            <TrapezoidButton
                                collapsed={collapsed}
                                toggleCollapsed={toggleCollapsed}
                                dataTestId='sider-switch'
                            />
                        )}
                        {children}
                        <ErrorServerModal clearError={clearError} isError={isError} />
                    </Layout.Content>
                    {isWithFooter && (
                        <Layout.Footer>
                            <Footer />
                        </Layout.Footer>
                    )}
                </div>
            </Layout>
        </Layout>
    );
};

type Props = {
    isWithHeader?: boolean;
    isWithFooter?: boolean;
} & PropsWithChildren;
