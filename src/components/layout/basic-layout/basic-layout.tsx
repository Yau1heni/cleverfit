import { FC, PropsWithChildren, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TypeTitle } from '@common-types/common-types.ts';
import { Paths } from '@common-types/routes';
import { BasicHeaderTitle } from '@components/header';
import { Loader } from '@components/loader';
import { SettingsButton } from '@components/settings';
import { Sidebar } from '@components/sidebar';
import { TrapezoidButton } from '@components/trapezoid-button';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { appSelectors } from '@redux/slices';
import { Layout, Row } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './basic-layout.module.css';

type BasicLayoutProps = {
    title?: string;
    typeTitle?: TypeTitle;
    onclick?: () => void;
    dataTestId?: string;
} & PropsWithChildren;

export const BasicLayout: FC<BasicLayoutProps> = (props) => {
    const { title, onclick, typeTitle = 'text', children, dataTestId } = props;

    const { pathname } = useLocation();
    const isNotSettingsPage = pathname !== Paths.SETTINGS;

    const [collapsed, setCollapsed] = useState(false);

    const { xs } = useBreakpoint();
    const isLoading = useAppSelector(appSelectors.isLoading);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Layout>
                <div className={styles.header}>
                    <Row justify='space-between' align='middle'>
                        <BasicHeaderTitle
                            typeTitle={typeTitle}
                            title={title}
                            onclick={onclick}
                            dataTestId={dataTestId}
                        />
                        {isNotSettingsPage && <SettingsButton />}
                    </Row>
                </div>

                <div
                    className={
                        isNotSettingsPage
                            ? styles.backgroundImageContainer
                            : styles.backgroundImageContainerSettings
                    }
                >
                    <Layout.Content>
                        {!xs && (
                            <TrapezoidButton
                                collapsed={collapsed}
                                toggleCollapsed={toggleCollapsed}
                                dataTestId='sider-switch'
                            />
                        )}
                        {isLoading && <Loader />}
                        <div className={styles.content}>{children}</div>
                    </Layout.Content>
                </div>
            </Layout>
        </Layout>
    );
};
