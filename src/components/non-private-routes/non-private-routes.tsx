import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authSelectors } from '@redux/slices';

export const NonAuthRoutes = () => {
    const accessTokenFromState = useAppSelector(authSelectors.accessToken);
    const accessTokenFromLS = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    const isAccessTokenFromState = accessTokenFromState !== null;
    const isAccessTokenFromLS = accessTokenFromLS !== null;

    const isAuth = isAccessTokenFromLS || isAccessTokenFromState;

    return isAuth ? <Navigate to={Paths.MAIN} replace={true} /> : <Outlet />;
};
