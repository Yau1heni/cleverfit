import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { StatusCode } from '@common-types/auth';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authSelectors, profileActions } from '@redux/slices';
import { Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFileStatus } from 'antd/es/upload/interface';

import styles from './upload-photo.module.css';

export const UploadPhoto = () => {
    const dispatch = useAppDispatch();

    const [fileList, setFileList] = useState<UploadFile[]>();

    const updateHandler = ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
        setFileList(newFileList);
        const [{ uid, name, status, response, error }] = newFileList;

        if (status === 'error') {
            const errorFile = {
                uid,
                name,
                url: '',
                status: 'error' as UploadFileStatus,
            };

            setFileList([errorFile]);
        }
        if (status === 'done') {
            dispatch(profileActions.setImageUrl({ url: response.url }));
        }
        if (error?.status === StatusCode.USER_EXISTS) {
            dispatch(profileActions.setIsErrorFileSize({ isError: true }));
        }
    };

    const uploadButton = (
        <button type='button' className={styles.uploadButton} data-test-id='profile-avatar'>
            <PlusOutlined />
            <div style={{ marginTop: 8, color: '#8C8C8C' }}>Загрузить фото профиля</div>
        </button>
    );

    let accessToken;
    const accessTokenFromState = useAppSelector(authSelectors.accessToken);
    const accessTokenFromLS = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    if (accessTokenFromLS !== null) {
        accessToken = accessTokenFromLS;
    }

    if (accessTokenFromState !== null) {
        accessToken = accessTokenFromState;
    }

    return (
        <Upload
            action='https://marathon-api.clevertec.ru/upload-image'
            accept='image/*'
            maxCount={1}
            headers={{ authorization: `Bearer ${accessToken}` }}
            withCredentials={true}
            fileList={fileList}
            onChange={updateHandler}
            listType='picture-card'
            progress={{ strokeWidth: 4 }}
        >
            {fileList && fileList.length > 0 ? null : uploadButton}
        </Upload>
    );
};
