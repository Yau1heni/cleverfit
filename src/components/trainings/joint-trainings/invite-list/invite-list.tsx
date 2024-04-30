import { FC, Fragment, useState } from 'react';
import { Invite, TrainingDetails } from '@common-types/training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { acceptInvite, declineInvite } from '@redux/slices';
import { List, Modal } from 'antd';

import { InviteItem } from './invite-item/invite-item.tsx';
import { InviteModalContent } from './invite-modal-content/invite-modal-content.tsx';

export const InviteList: FC<Props> = ({ inviteList }) => {
    const dispatch = useAppDispatch();

    const [trainingDetails, setTrainingDetails] = useState<TrainingDetails>({});
    const [isOpen, setIsOpen] = useState(false);

    const acceptInviteHandler = (id: string) => {
        dispatch(acceptInvite({ invitedId: id }));

        setIsOpen(false);
    };

    const declineInviteHandler = (id: string) => {
        dispatch(declineInvite({ invitedId: id }));
    };

    const onCloseModalHandler = () => {
        setIsOpen(false);
    };

    return (
        <Fragment>
            <List
                grid={{
                    gutter: 16,
                    column: 1,
                }}
                itemLayout='horizontal'
                pagination={{
                    defaultPageSize: 16,
                    hideOnSinglePage: true,
                }}
                dataSource={inviteList}
                renderItem={(item) => {
                    const { _id: id } = item;

                    return (
                        <List.Item key={`InviteList${id}`}>
                            <InviteItem
                                inviteList={inviteList}
                                inviteItem={item}
                                setTrainingDetails={setTrainingDetails}
                                onAccept={() => acceptInviteHandler(id)}
                                onDecline={() => declineInviteHandler(id)}
                                setIsOpenModal={setIsOpen}
                            />
                        </List.Item>
                    );
                }}
            />
            <Modal
                data-test-id='joint-training-review-card'
                open={isOpen}
                centered={true}
                footer={null}
                width={312}
                onCancel={onCloseModalHandler}
                destroyOnClose={true}
                mask={true}
                zIndex={10}
            >
                <InviteModalContent trainingDetails={trainingDetails} />
            </Modal>
        </Fragment>
    );
};

type Props = {
    inviteList: Invite[];
};
