import { FC } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { maskStyle } from '@components/modals/common-styles.ts';
import { Button, Col, Modal, Row, Typography } from 'antd';

export const ErrorNotificationModal: FC<Props> = (props) => {
    const {
        onClick,
        clearError,
        isError,
        textTitle,
        textSecondary,
        textButton,
        colorIcon,
        dataTestId,
    } = props;

    const onClickHandler = () => {
        if (onClick) onClick();
        clearError();
    };

    return (
        <Modal
            open={isError}
            width={384}
            destroyOnClose={true}
            footer={null}
            closable={false}
            centered={true}
            maskStyle={maskStyle}
        >
            <Row align='top'>
                <Col span={3}>
                    <CloseCircleTwoTone
                        style={{ fontSize: 'var(--font-size-xl)' }}
                        twoToneColor={colorIcon}
                    />
                </Col>
                <Col span={17}>
                    <Typography.Title level={5} data-test-id={dataTestId}>
                        {textTitle}
                    </Typography.Title>
                    <Typography.Text type='secondary'>{textSecondary}</Typography.Text>
                </Col>
            </Row>

            <Row justify='end' style={{ marginTop: 'var(--gap-m)' }}>
                <Button type='primary' onClick={onClickHandler} data-test-id='big-file-error-close'>
                    {textButton}
                </Button>
            </Row>
        </Modal>
    );
};

type Props = {
    isError: boolean;
    textTitle: string;
    textSecondary?: string;
    textButton: string;
    colorIcon?: string;
    clearError: () => void;
    onClick?: () => void;
    dataTestId?: string;
};
