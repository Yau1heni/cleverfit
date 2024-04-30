import { FC, PropsWithChildren } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DrawerType } from '@common-types/training';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { dataForDrawer } from '@utils/data-for-training-drawer';
import { Button, Drawer } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const TrainingDrawer: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();
    const isOpen = useAppSelector(trainingSelectors.isDrawerAddExercisesOpen);
    const drawerType = useAppSelector(trainingSelectors.drawerType);

    const onClose = () => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: false }));
        dispatch(trainingActions.setDrawerType({ drawerType: DrawerType.SAVE }));
    };

    return (
        <Drawer
            mask={false}
            width={xs ? '100%' : 408}
            bodyStyle={{ paddingTop: 0, scrollbarWidth: 'thin' }}
            headerStyle={{ paddingBottom: 0 }}
            title={dataForDrawer(drawerType).title}
            placement='right'
            destroyOnClose={true}
            closeIcon={dataForDrawer(drawerType).icon}
            open={isOpen}
            extra={
                <Button
                    onClick={onClose}
                    data-test-id='modal-drawer-right-button-close'
                    icon={<CloseOutlined />}
                />
            }
            data-test-id={DATA_TEST_ID.modalDrawerRight}
        >
            <div style={{ marginTop: 'var(--gap-xl)' }}>{children}</div>
        </Drawer>
    );
};
