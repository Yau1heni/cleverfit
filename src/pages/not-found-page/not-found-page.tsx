import { FC } from 'react';
import { Paths } from '@common-types/routes';
import { BasicLayout } from '@components/layout';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { navigateTo } from '@utils/navigate-to';
import { Button, Card, Result } from 'antd';

export const NotFoundPage: FC = () => {
    const dispatch = useAppDispatch();
    const goToMainHandler = () => {
        navigateTo({ dispatch, toPath: Paths.MAIN });
    };

    return (
        <BasicLayout>
            <Card>
                <Result
                    extra={
                        <Button onClick={goToMainHandler} type='primary'>
                            На главную
                        </Button>
                    }
                    status='404'
                    style={{ padding: 0 }}
                    subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                    title='Такой страницы нет'
                />
            </Card>
        </BasicLayout>
    );
};
