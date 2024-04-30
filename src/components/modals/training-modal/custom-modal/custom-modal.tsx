import { CSSProperties, FC, PropsWithChildren } from 'react';

export const CustomModal: FC<Props> = (props) => {
    const { isOpen, top, left, right, bottom, width, height, transform, children } = props;

    if (!isOpen) {
        return null;
    }

    const modalStyle: CSSProperties = {
        position: 'absolute',
        content: '',
        top: top && top,
        left: left && left,
        right: right && right,
        bottom: bottom && bottom,
        width: width && `${width}px`,
        height: height && `${height}px`,
        background: '#fff',
        border: '1px solid #ccc',
        padding: '16px 12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transform: transform && transform,
        zIndex: 10,
    };

    return <div style={modalStyle}>{children}</div>;
};

type Props = PropsWithChildren & {
    isOpen: boolean;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
    width?: number;
    height?: number;
};
