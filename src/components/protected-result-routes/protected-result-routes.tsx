import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '@common-types/routes';

export const ProtectedResultRoutes = () => {
    const location = useLocation();

    const isAvailable = () => {
        if (location.state !== null) {
            return (
                location.state.from.startsWith(Paths.AUTH) ||
                location.state.from.startsWith(Paths.RESULT)
            );
        }

        return false;
    };

    return isAvailable() ? <Outlet /> : <Navigate to={Paths.AUTH} replace={true} />;
};
