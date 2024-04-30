import { useLocation } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { Paths } from '@common-types/routes';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTariffList } from '@redux/slices';
import { navigateTo } from '@utils/navigate-to';
import { Button } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const SettingsButton = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const { xs } = useBreakpoint();

    const goToSettingsHandler = () => {
        navigateTo({ dispatch, toPath: Paths.SETTINGS, currentPath: pathname });
        dispatch(getTariffList());
    };

    return xs ? (
        <SettingOutlined onClick={goToSettingsHandler} />
    ) : (
        <Button
            type='text'
            data-test-id='header-settings'
            onClick={goToSettingsHandler}
            icon={<SettingOutlined />}
        >
            Настройки
        </Button>
    );
};
