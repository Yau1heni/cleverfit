import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Paths } from '@common-types/routes';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { navigateTo } from '@utils/navigate-to';
import { Button, Card, Col, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './footer.module.css';

export const Footer = () => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();

    const styleButtonFeedback = xs
        ? { letterSpacing: 'var(--letter-spacing-m)', paddingTop: 'var(--gap-2xl)' }
        : { letterSpacing: 'var(--letter-spacing-m)' };

    const navigateToFeedbackHandler = () => {
        navigateTo({ dispatch, toPath: Paths.FEEDBACKS });
    };

    return (
        <Row
            justify={{
                md: 'space-between',
                sm: 'center',
            }}
        >
            <Col
                lg={7}
                md={{
                    order: 1,
                    span: 10,
                }}
                sm={{ order: 0 }}
                xs={22}
            >
                <Card
                    actions={[
                        <Button icon={<AndroidFilled />} type='text'>
                            Android OS
                        </Button>,
                        <Button icon={<AppleFilled />} type='text'>
                            Apple iOS
                        </Button>,
                    ]}
                >
                    <Col>
                        <Button type='link' className={styles.button}>
                            Скачать на телефон
                        </Button>
                    </Col>
                    <Col>
                        <Typography.Text>Доступно в PRO-тарифе</Typography.Text>
                    </Col>
                </Card>
            </Col>
            <Row align='bottom'>
                <Button
                    onClick={navigateToFeedbackHandler}
                    style={styleButtonFeedback}
                    type='link'
                    data-test-id='see-reviews'
                >
                    Смотреть отзывы
                </Button>
            </Row>
        </Row>
    );
};
