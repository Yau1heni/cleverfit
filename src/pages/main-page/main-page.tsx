import { useEffect } from 'react';
import { MainContent } from '@components/content';
import { MainLayout } from '@components/layout';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getInvite, getUser } from '@redux/slices';

const MainPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getInvite());
    }, [dispatch]);

    return (
        <MainLayout>
            <MainContent />
        </MainLayout>
    );
};

export default MainPage;
